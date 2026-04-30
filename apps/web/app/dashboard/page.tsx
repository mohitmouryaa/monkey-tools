import type { Metadata } from "next";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HydrateClient } from "@/trpc/server";
import { requireAuth } from "@/lib/auth-utils";
import { SuspenseLoader } from "@/modules/common/ui/components/suspense-loader";
import { prefetchDashboardOverview } from "@/modules/dashboard/server/overview-prefetch";
import { DashboardOverviewView } from "@/modules/dashboard/ui/views/dashboard-overview-view";

export const metadata: Metadata = {
  title: "Visão geral",
  description: "Painel administrativo — visão geral.",
};

export default async function Page() {
  await requireAuth();
  prefetchDashboardOverview();
  return (
    <HydrateClient>
      <ErrorBoundary fallback={<div className="p-6 text-sm text-muted-foreground">Falha ao carregar a visão geral.</div>}>
        <Suspense fallback={<SuspenseLoader />}>
          <main className="flex-1">
            <DashboardOverviewView />
          </main>
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
}
