"use client";

import Link from "next/link";
import { Activity, AlertTriangle, ArrowUpRight, CheckCircle2, Clock, FileText, Newspaper, Wrench } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@workspace/ui/components/chart";
import { useSuspenseOverview } from "@/modules/dashboard/hooks/use-suspense-overview";

const STATUS_LABELS: Record<string, string> = {
  COMPLETED: "Concluídos",
  FAILED: "Falhas",
  IN_PROGRESS: "Em andamento",
};

const POST_STATUS_LABELS: Record<string, string> = {
  draft: "Rascunho",
  scheduled: "Agendado",
  published: "Publicado",
};

const POST_STATUS_VARIANT: Record<string, "default" | "secondary" | "outline"> = {
  draft: "outline",
  scheduled: "secondary",
  published: "default",
};

const jobsChartConfig = {
  completed: { label: "Concluídos", color: "var(--chart-1)" },
  failed: { label: "Falhas", color: "var(--chart-5)" },
  inProgress: { label: "Em andamento", color: "var(--chart-3)" },
} satisfies ChartConfig;

const statusChartConfig = {
  count: { label: "Jobs" },
  COMPLETED: { label: "Concluídos", color: "var(--chart-1)" },
  FAILED: { label: "Falhas", color: "var(--chart-5)" },
  IN_PROGRESS: { label: "Em andamento", color: "var(--chart-3)" },
} satisfies ChartConfig;

const topToolsChartConfig = {
  count: { label: "Jobs (7d)", color: "var(--chart-2)" },
} satisfies ChartConfig;

function formatNumber(n: number) {
  return n.toLocaleString("pt-BR");
}

function formatPercent(v: number | null) {
  if (v == null) return "—";
  return `${(v * 100).toFixed(1)}%`;
}

function formatRelative(iso: string | null) {
  if (!iso) return "—";
  const d = new Date(iso);
  const diff = Date.now() - d.getTime();
  const m = Math.floor(diff / 60_000);
  if (m < 1) return "agora";
  if (m < 60) return `${m} min atrás`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} h atrás`;
  const days = Math.floor(h / 24);
  if (days < 30) return `${days} d atrás`;
  return d.toLocaleDateString("pt-BR");
}

function shortDay(iso: string) {
  const d = new Date(`${iso}T00:00:00Z`);
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

export const DashboardOverviewView = () => {
  const { data } = useSuspenseOverview();

  return (
    <div className="flex flex-col gap-6 px-6 py-8 mx-auto w-full max-w-7xl">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Visão geral</h1>
        <p className="text-muted-foreground text-sm">
          Resumo dos últimos 7 dias · atualizado{" "}
          <span className="text-foreground/80">{formatRelative(data.generatedAt)}</span>
        </p>
      </header>

      <KpiGrid kpis={data.kpis} />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Jobs nos últimos 14 dias</CardTitle>
            <CardDescription>Distribuição diária por status — concluídos, falhas e em andamento</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={jobsChartConfig} className="aspect-auto h-[280px] w-full">
              <AreaChart data={data.jobsByDay} margin={{ left: 4, right: 4, top: 4 }}>
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
                <Area
                  type="monotone"
                  dataKey="completed"
                  stackId="a"
                  stroke="var(--color-completed)"
                  fill="url(#dash-completed)"
                />
                <Area
                  type="monotone"
                  dataKey="inProgress"
                  stackId="a"
                  stroke="var(--color-inProgress)"
                  fill="url(#dash-inProgress)"
                />
                <Area type="monotone" dataKey="failed" stackId="a" stroke="var(--color-failed)" fill="url(#dash-failed)" />
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribuição por status</CardTitle>
            <CardDescription>Últimos 7 dias</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <StatusPieChart data={data.jobsByStatus} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-start justify-between">
            <div>
              <CardTitle>Top ferramentas</CardTitle>
              <CardDescription>Mais executadas nos últimos 7 dias</CardDescription>
            </div>
            <Button asChild size="sm" variant="ghost">
              <Link href="/dashboard/tools">
                Ver todas <ArrowUpRight className="ml-1 size-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {data.topTools.length === 0 ? (
              <div className="text-muted-foreground py-12 text-center text-sm">Nenhuma execução registrada nos últimos 7 dias.</div>
            ) : (
              <ChartContainer config={topToolsChartConfig} className="aspect-auto h-[260px] w-full">
                <BarChart data={data.topTools} layout="vertical" margin={{ left: 16, right: 16 }}>
                  <CartesianGrid horizontal={false} strokeDasharray="3 3" />
                  <XAxis type="number" hide allowDecimals={false} />
                  <YAxis dataKey="tool" type="category" width={140} tickLine={false} axisLine={false} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
                  <Bar dataKey="count" fill="var(--color-count)" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-start justify-between">
            <div>
              <CardTitle>Falhas recentes</CardTitle>
              <CardDescription>Últimos 5 jobs com erro</CardDescription>
            </div>
            <AlertTriangle className="text-destructive size-4" />
          </CardHeader>
          <CardContent>
            {data.recentFailedJobs.length === 0 ? (
              <div className="text-muted-foreground py-12 text-center text-sm">Sem falhas recentes 🎉</div>
            ) : (
              <ul className="space-y-3">
                {data.recentFailedJobs.map((j) => (
                  <li key={j._id} className="flex flex-col gap-1 border-b last:border-b-0 pb-3 last:pb-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{j.tool}</span>
                      <span className="text-muted-foreground text-xs">{formatRelative(j.createdAt)}</span>
                    </div>
                    {j.error ? <p className="text-muted-foreground text-xs line-clamp-2">{j.error}</p> : null}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle>Posts recentes</CardTitle>
            <CardDescription>Últimas 5 alterações no blog</CardDescription>
          </div>
          <Button asChild size="sm" variant="outline">
            <Link href="/dashboard/posts/new">Novo post</Link>
          </Button>
        </CardHeader>
        <CardContent>
          {data.recentPosts.length === 0 ? (
            <div className="text-muted-foreground py-12 text-center text-sm">Nenhum post ainda.</div>
          ) : (
            <ul className="divide-y">
              {data.recentPosts.map((p) => (
                <li key={p._id} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                  <div className="flex min-w-0 flex-col gap-1">
                    <Link
                      href={`/dashboard/posts/${p._id}`}
                      className="hover:text-primary truncate font-medium text-sm"
                    >
                      {p.title}
                    </Link>
                    <span className="text-muted-foreground truncate text-xs">/{p.slug}</span>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <Badge variant={POST_STATUS_VARIANT[p.status] ?? "outline"} className="capitalize">
                      {POST_STATUS_LABELS[p.status] ?? p.status}
                    </Badge>
                    <span className="text-muted-foreground hidden text-xs sm:inline">
                      {formatRelative(p.publishedAt ?? p.updatedAt)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

interface KpiGridProps {
  kpis: ReturnType<typeof useSuspenseOverview>["data"]["kpis"];
}

const KpiGrid = ({ kpis }: KpiGridProps) => {
  const queueTotal = kpis.queueWaiting + kpis.queueActive + kpis.queueDelayed;
  const items = [
    {
      label: "Jobs (24h)",
      value: formatNumber(kpis.jobs24h),
      hint: `${formatNumber(kpis.jobsCompleted24h)} ok · ${formatNumber(kpis.jobsFailed24h)} falhas`,
      icon: Activity,
    },
    {
      label: "Taxa de sucesso (7d)",
      value: formatPercent(kpis.successRate7d),
      hint: kpis.successRate7d == null ? "Sem dados" : "Concluídos / total",
      icon: CheckCircle2,
    },
    {
      label: "Fila atual",
      value: formatNumber(queueTotal),
      hint: `${formatNumber(kpis.queueActive)} ativos · ${formatNumber(kpis.queueWaiting)} aguardando`,
      icon: Clock,
    },
    {
      label: "Posts publicados",
      value: formatNumber(kpis.postsPublished),
      hint: `${formatNumber(kpis.postsDraft)} rascunhos · ${formatNumber(kpis.postsScheduled)} agendados`,
      icon: Newspaper,
    },
    {
      label: "Ferramentas ativas",
      value: `${formatNumber(kpis.toolsActive)}/${formatNumber(kpis.toolsTotal)}`,
      hint: kpis.toolsTotal === 0 ? "Sem ferramentas" : "ativas / total",
      icon: Wrench,
    },
    {
      label: "Falhas (24h)",
      value: formatNumber(kpis.jobsFailed24h),
      hint: kpis.jobs24h === 0 ? "Sem jobs nas 24h" : `${formatPercent(kpis.jobsFailed24h / kpis.jobs24h)} do total`,
      icon: AlertTriangle,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Card key={item.label} className="overflow-hidden">
            <CardContent className="flex flex-col gap-2 p-5">
              <div className="text-muted-foreground flex items-center justify-between text-xs">
                <span>{item.label}</span>
                <Icon className="size-4" />
              </div>
              <div className="text-2xl font-semibold tabular-nums">{item.value}</div>
              <div className="text-muted-foreground text-xs">{item.hint}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

const StatusPieChart = ({ data }: { data: { status: string; count: number }[] }) => {
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
    <ChartContainer config={statusChartConfig} className="mx-auto aspect-square h-[240px]">
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
