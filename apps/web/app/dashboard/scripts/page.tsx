import type { Metadata } from "next";
import { Suspense } from "react";
import type { SearchParams } from "nuqs/server";
import { ErrorBoundary } from "react-error-boundary";
import { HydrateClient } from "@/trpc/server";
import { requireAuth } from "@/lib/auth-utils";
import { prefetchScripts } from "@/modules/common/prefetch";
import { scriptsParamsLoader } from "@/modules/dashboard/server/params-loader";
import { SuspenseLoader } from "@/modules/common/ui/components/suspense-loader";
import { ScriptsContainer } from "@/modules/dashboard/ui/components/scripts-container";
import { ScriptsView } from "@/modules/dashboard/ui/views/scripts-view";

export const metadata: Metadata = {
  title: "Scripts globais",
  description: "Gerenciar scripts globais injetados no site.",
};

type Props = { searchParams: Promise<SearchParams> };

export default async function ScriptsPage({ searchParams }: Props) {
  await requireAuth();
  const params = await scriptsParamsLoader(searchParams);
  prefetchScripts({
    page: params.page,
    pageSize: params.pageSize,
    search: params.search,
    location: params.location ?? undefined,
  });
  return (
    <ScriptsContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<div>Algo deu errado.</div>}>
          <Suspense fallback={<SuspenseLoader />}>
            <main className="flex-1">
              <ScriptsView />
            </main>
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </ScriptsContainer>
  );
}
