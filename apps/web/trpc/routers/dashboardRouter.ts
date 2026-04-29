import { JobModel, PostModel, ToolModel } from "@workspace/database";
import { PostStatus, Status } from "@workspace/types";
import { myQueue } from "@workspace/queue";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

const DAY_MS = 24 * 60 * 60 * 1000;

function startOfUtcDay(date: Date) {
  const d = new Date(date);
  d.setUTCHours(0, 0, 0, 0);
  return d;
}

export const dashboardRouter = createTRPCRouter({
  overview: protectedProcedure.query(async () => {
    const now = new Date();
    const last24h = new Date(now.getTime() - DAY_MS);
    const last7d = new Date(now.getTime() - 7 * DAY_MS);
    const seriesStart = startOfUtcDay(new Date(now.getTime() - 13 * DAY_MS));

    const [
      jobs24hAgg,
      jobs7dAgg,
      jobsByDayAgg,
      jobsByStatusAgg,
      topToolsAgg,
      postsByStatusAgg,
      toolsActiveCount,
      toolsTotalCount,
      recentFailedJobs,
      recentPosts,
    ] = await Promise.all([
      JobModel.aggregate<{ _id: Status; count: number }>([
        { $match: { createdAt: { $gte: last24h } } },
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]),
      JobModel.aggregate<{ _id: Status; count: number }>([
        { $match: { createdAt: { $gte: last7d } } },
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]),
      JobModel.aggregate<{ _id: { day: string; status: Status }; count: number }>([
        { $match: { createdAt: { $gte: seriesStart } } },
        {
          $group: {
            _id: {
              day: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt", timezone: "UTC" } },
              status: "$status",
            },
            count: { $sum: 1 },
          },
        },
      ]),
      JobModel.aggregate<{ _id: Status; count: number }>([
        { $match: { createdAt: { $gte: last7d } } },
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]),
      JobModel.aggregate<{ _id: string; count: number }>([
        { $match: { createdAt: { $gte: last7d } } },
        { $group: { _id: "$tool", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 },
      ]),
      PostModel.aggregate<{ _id: PostStatus; count: number }>([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
      ToolModel.countDocuments({ isActive: true }),
      ToolModel.countDocuments({}),
      JobModel.find({ status: Status.FAILED })
        .sort({ createdAt: -1 })
        .limit(5)
        .select({ tool: 1, error: 1, createdAt: 1, status: 1 })
        .lean(),
      PostModel.find({})
        .sort({ updatedAt: -1 })
        .limit(5)
        .select({ title: 1, slug: 1, status: 1, publishedAt: 1, updatedAt: 1 })
        .lean(),
    ]);

    const queueCounts = await myQueue.getJobCounts("waiting", "active", "delayed", "failed", "paused").catch(() => ({
      waiting: 0,
      active: 0,
      delayed: 0,
      failed: 0,
      paused: 0,
    }));

    const totalsBy = (rows: { _id: string; count: number }[]) =>
      rows.reduce<Record<string, number>>((acc, r) => {
        acc[r._id] = r.count;
        return acc;
      }, {});

    const jobs24h = totalsBy(jobs24hAgg);
    const jobs7d = totalsBy(jobs7dAgg);
    const postsByStatus = totalsBy(postsByStatusAgg);

    const sumOf = (m: Record<string, number>) => Object.values(m).reduce((a, b) => a + b, 0);
    const total24h = sumOf(jobs24h);
    const total7d = sumOf(jobs7d);
    const success7d = jobs7d[Status.COMPLETED] ?? 0;
    const successRate7d = total7d > 0 ? success7d / total7d : null;

    const days: string[] = [];
    for (let i = 13; i >= 0; i--) {
      const d = startOfUtcDay(new Date(now.getTime() - i * DAY_MS));
      days.push(d.toISOString().slice(0, 10));
    }

    const seriesByDay = days.map((day) => {
      const completed = jobsByDayAgg.find((r) => r._id.day === day && r._id.status === Status.COMPLETED)?.count ?? 0;
      const failed = jobsByDayAgg.find((r) => r._id.day === day && r._id.status === Status.FAILED)?.count ?? 0;
      const inProgress = jobsByDayAgg.find((r) => r._id.day === day && r._id.status === Status.IN_PROGRESS)?.count ?? 0;
      return { day, completed, failed, inProgress };
    });

    return {
      kpis: {
        jobs24h: total24h,
        jobsCompleted24h: jobs24h[Status.COMPLETED] ?? 0,
        jobsFailed24h: jobs24h[Status.FAILED] ?? 0,
        jobsInProgress24h: jobs24h[Status.IN_PROGRESS] ?? 0,
        successRate7d,
        queueWaiting: queueCounts.waiting ?? 0,
        queueActive: queueCounts.active ?? 0,
        queueDelayed: queueCounts.delayed ?? 0,
        queueFailed: queueCounts.failed ?? 0,
        postsPublished: postsByStatus[PostStatus.PUBLISHED] ?? 0,
        postsDraft: postsByStatus[PostStatus.DRAFT] ?? 0,
        postsScheduled: postsByStatus[PostStatus.SCHEDULED] ?? 0,
        toolsActive: toolsActiveCount,
        toolsTotal: toolsTotalCount,
      },
      jobsByDay: seriesByDay,
      jobsByStatus: [
        { status: Status.COMPLETED, count: jobsByStatusAgg.find((r) => r._id === Status.COMPLETED)?.count ?? 0 },
        { status: Status.FAILED, count: jobsByStatusAgg.find((r) => r._id === Status.FAILED)?.count ?? 0 },
        { status: Status.IN_PROGRESS, count: jobsByStatusAgg.find((r) => r._id === Status.IN_PROGRESS)?.count ?? 0 },
      ],
      topTools: topToolsAgg.map((t) => ({ tool: t._id, count: t.count })),
      recentFailedJobs: recentFailedJobs.map((j) => ({
        _id: j._id.toString(),
        tool: j.tool,
        error: j.error ?? null,
        createdAt: j.createdAt instanceof Date ? j.createdAt.toISOString() : null,
      })),
      recentPosts: recentPosts.map((p) => ({
        _id: p._id.toString(),
        title: p.title,
        slug: p.slug,
        status: p.status,
        publishedAt: p.publishedAt instanceof Date ? p.publishedAt.toISOString() : null,
        updatedAt: p.updatedAt instanceof Date ? p.updatedAt.toISOString() : null,
      })),
      generatedAt: now.toISOString(),
    };
  }),
});
