"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@workspace/ui/components/chart";

const chartConfig = {
  count: { label: "Jobs (7d)", color: "var(--chart-2)" },
} satisfies ChartConfig;

export type DashboardTopTool = { tool: string; count: number };

export const DashboardOverviewBarChart = ({ data }: { data: DashboardTopTool[] }) => (
  <ChartContainer config={chartConfig} className="aspect-auto h-[260px] w-full">
    <BarChart data={data} layout="vertical" margin={{ left: 16, right: 16 }}>
      <CartesianGrid horizontal={false} strokeDasharray="3 3" />
      <XAxis type="number" hide allowDecimals={false} />
      <YAxis dataKey="tool" type="category" width={140} tickLine={false} axisLine={false} />
      <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
      <Bar dataKey="count" fill="var(--color-count)" radius={[0, 6, 6, 0]} />
    </BarChart>
  </ChartContainer>
);
