"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@workspace/ui/components/skeleton";
import type { DashboardJobsByDayPoint } from "./dashboard-overview-area-chart";
import type { DashboardJobsByStatus } from "./dashboard-overview-pie-chart";
import type { DashboardTopTool } from "./dashboard-overview-bar-chart";

const AreaChartLazy = dynamic(
  () => import("./dashboard-overview-area-chart").then((m) => ({ default: m.DashboardOverviewAreaChart })),
  { ssr: false, loading: () => <Skeleton className="h-[280px] w-full" /> },
);

const PieChartLazy = dynamic(
  () => import("./dashboard-overview-pie-chart").then((m) => ({ default: m.DashboardOverviewPieChart })),
  { ssr: false, loading: () => <Skeleton className="mx-auto aspect-square h-[240px]" /> },
);

const BarChartLazy = dynamic(
  () => import("./dashboard-overview-bar-chart").then((m) => ({ default: m.DashboardOverviewBarChart })),
  { ssr: false, loading: () => <Skeleton className="h-[260px] w-full" /> },
);

export const DashboardOverviewAreaChartLazy = ({ data }: { data: DashboardJobsByDayPoint[] }) => <AreaChartLazy data={data} />;
export const DashboardOverviewPieChartLazy = ({ data }: { data: DashboardJobsByStatus[] }) => <PieChartLazy data={data} />;
export const DashboardOverviewBarChartLazy = ({ data }: { data: DashboardTopTool[] }) => <BarChartLazy data={data} />;
