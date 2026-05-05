"use client";

import { CheckCircle2, Clock, PauseCircle, Wrench } from "lucide-react";
import { Card, CardContent } from "@workspace/ui/components/card";
import { useSuspenseToolsStats } from "@/modules/dashboard/hooks/use-suspense-tools";

type StatCardProps = {
  label: string;
  value: number;
  icon: React.ReactNode;
  hint?: string;
};

const StatCard = ({ label, value, icon, hint }: StatCardProps) => (
  <Card className="shadow-none">
    <CardContent className="flex items-center justify-between p-4">
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <span className="text-2xl font-bold tabular-nums">{value.toLocaleString("pt-BR")}</span>
        {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      </div>
      <div className="flex items-center justify-center rounded-md bg-muted size-10 text-muted-foreground">{icon}</div>
    </CardContent>
  </Card>
);

export const ToolsStats = () => {
  const { data } = useSuspenseToolsStats();

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard label="Total" value={data.total} icon={<Wrench className="size-5" />} />
      <StatCard label="Ativas" value={data.active} icon={<CheckCircle2 className="size-5" />} />
      <StatCard label="Inativas" value={data.inactive} icon={<PauseCircle className="size-5" />} />
      <StatCard label="Recentes" value={data.recent} icon={<Clock className="size-5" />} hint="últimos 7 dias" />
    </div>
  );
};
