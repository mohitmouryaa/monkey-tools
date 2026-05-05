import Link from "next/link";
import { Activity, AlertTriangle, ArrowUpRight, CheckCircle2, Clock, Newspaper, Wrench } from "lucide-react";
import type { caller } from "@/trpc/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import {
  DashboardOverviewAreaChartLazy,
  DashboardOverviewBarChartLazy,
  DashboardOverviewPieChartLazy,
} from "@/modules/dashboard/ui/components/dashboard-overview-charts";

export type DashboardOverviewData = Awaited<ReturnType<typeof caller.dashboard.overview>>;

type RecentFailedJob = { _id: string; tool: string; error: string | null; createdAt: string | null };
type RecentPost = {
  _id: string;
  title: string;
  slug: string;
  status: string;
  publishedAt: string | null;
  updatedAt: string | null;
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

const formatNumber = (n: number) => n.toLocaleString("pt-BR");

const formatPercent = (v: number | null) => {
  if (v == null) return "—";
  return `${(v * 100).toFixed(1)}%`;
};

const formatRelative = (iso: string | null) => {
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
};

export const DashboardOverviewView = ({ data }: { data: DashboardOverviewData }) => (
  <div className="flex flex-col gap-6 px-6 py-8 mx-auto w-full max-w-7xl">
    <header className="flex flex-col gap-1">
      <h1 className="text-3xl font-bold tracking-tight">Visão geral</h1>
      <p className="text-muted-foreground text-sm">
        Resumo dos últimos 7 dias · atualizado <span className="text-foreground/80">{formatRelative(data.generatedAt)}</span>
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
          <DashboardOverviewAreaChartLazy data={data.jobsByDay} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Distribuição por status</CardTitle>
          <CardDescription>Últimos 7 dias</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <DashboardOverviewPieChartLazy data={data.jobsByStatus} />
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
            <DashboardOverviewBarChartLazy data={data.topTools} />
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
              {(data.recentFailedJobs as RecentFailedJob[]).map((j) => (
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
            {(data.recentPosts as RecentPost[]).map((p) => (
              <li key={p._id} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                <div className="flex min-w-0 flex-col gap-1">
                  <Link href={`/dashboard/posts/${p._id}`} className="hover:text-primary truncate font-medium text-sm">
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

const KpiGrid = ({ kpis }: { kpis: DashboardOverviewData["kpis"] }) => {
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
