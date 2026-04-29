import { prefetch, trpc } from "@/trpc/server";

export const prefetchDashboardOverview = () => {
  return prefetch(trpc.dashboard.overview.queryOptions());
};
