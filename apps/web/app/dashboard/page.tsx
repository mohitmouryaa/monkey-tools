import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import { DashboardOverviewView } from "@/modules/dashboard/ui/views/dashboard-overview-view";

export const metadata: Metadata = {
  title: "Visão geral",
  description: "Painel administrativo — visão geral.",
};

export default async function Page() {
  await requireAuth();
  const data = await caller.dashboard.overview();
  return (
    <main className="flex-1">
      <DashboardOverviewView data={data} />
    </main>
  );
}
