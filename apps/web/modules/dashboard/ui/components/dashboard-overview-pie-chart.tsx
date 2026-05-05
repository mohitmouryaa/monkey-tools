"use client";

import { FileText } from "lucide-react";
import { Cell, Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@workspace/ui/components/chart";

const STATUS_LABELS: Record<string, string> = {
  COMPLETED: "Concluídos",
  FAILED: "Falhas",
  IN_PROGRESS: "Em andamento",
};

const chartConfig = {
  count: { label: "Jobs" },
  COMPLETED: { label: "Concluídos", color: "var(--chart-1)" },
  FAILED: { label: "Falhas", color: "var(--chart-5)" },
  IN_PROGRESS: { label: "Em andamento", color: "var(--chart-3)" },
} satisfies ChartConfig;

export type DashboardJobsByStatus = { status: string; count: number };

export const DashboardOverviewPieChart = ({ data }: { data: DashboardJobsByStatus[] }) => {
  const total = data.reduce((acc, d) => acc + d.count, 0);

  if (total === 0) {
    return (
      <div className="text-muted-foreground py-12 text-center text-sm">
        <FileText className="mx-auto mb-2 size-6" />
        Nenhum job nos últimos 7 dias
      </div>
    );
  }

  return (
    <ChartContainer config={chartConfig} className="mx-auto aspect-square h-[240px]">
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent nameKey="status" hideLabel />} />
        <Pie data={data} dataKey="count" nameKey="status" innerRadius={56} outerRadius={88} strokeWidth={2}>
          {data.map((entry) => (
            <Cell key={entry.status} fill={`var(--color-${entry.status})`} />
          ))}
        </Pie>
        <ChartLegend
          verticalAlign="bottom"
          content={<ChartLegendContent nameKey="status" />}
          formatter={(value) => STATUS_LABELS[String(value)] ?? value}
        />
      </PieChart>
    </ChartContainer>
  );
};
