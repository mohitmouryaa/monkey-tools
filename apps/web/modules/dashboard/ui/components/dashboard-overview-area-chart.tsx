"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@workspace/ui/components/chart";

const chartConfig = {
  completed: { label: "Concluídos", color: "var(--chart-1)" },
  failed: { label: "Falhas", color: "var(--chart-5)" },
  inProgress: { label: "Em andamento", color: "var(--chart-3)" },
} satisfies ChartConfig;

const shortDay = (iso: string) => {
  const d = new Date(`${iso}T00:00:00Z`);
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
};

export type DashboardJobsByDayPoint = {
  day: string;
  completed: number;
  failed: number;
  inProgress: number;
};

export const DashboardOverviewAreaChart = ({ data }: { data: DashboardJobsByDayPoint[] }) => (
  <ChartContainer config={chartConfig} className="aspect-auto h-[280px] w-full">
    <AreaChart data={data} margin={{ left: 4, right: 4, top: 4 }}>
      <defs>
        <linearGradient id="dash-completed" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="var(--color-completed)" stopOpacity={0.8} />
          <stop offset="95%" stopColor="var(--color-completed)" stopOpacity={0.05} />
        </linearGradient>
        <linearGradient id="dash-failed" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="var(--color-failed)" stopOpacity={0.7} />
          <stop offset="95%" stopColor="var(--color-failed)" stopOpacity={0.05} />
        </linearGradient>
        <linearGradient id="dash-inProgress" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="var(--color-inProgress)" stopOpacity={0.6} />
          <stop offset="95%" stopColor="var(--color-inProgress)" stopOpacity={0.05} />
        </linearGradient>
      </defs>
      <CartesianGrid vertical={false} strokeDasharray="3 3" />
      <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={shortDay} />
      <YAxis tickLine={false} axisLine={false} tickMargin={8} allowDecimals={false} />
      <ChartTooltip
        cursor={false}
        content={<ChartTooltipContent labelFormatter={(value) => shortDay(String(value))} indicator="dot" />}
      />
      <Area type="monotone" dataKey="completed" stackId="a" stroke="var(--color-completed)" fill="url(#dash-completed)" />
      <Area type="monotone" dataKey="inProgress" stackId="a" stroke="var(--color-inProgress)" fill="url(#dash-inProgress)" />
      <Area type="monotone" dataKey="failed" stackId="a" stroke="var(--color-failed)" fill="url(#dash-failed)" />
      <ChartLegend content={<ChartLegendContent />} />
    </AreaChart>
  </ChartContainer>
);
