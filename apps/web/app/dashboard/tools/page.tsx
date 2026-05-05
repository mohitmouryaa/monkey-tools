import type { Metadata } from "next";
import { Suspense } from "react";
import { HydrateClient } from "@/trpc/server";
import type { SearchParams } from "nuqs/server";
import { ErrorBoundary } from "react-error-boundary";
import { prefetchTools, prefetchToolsStats, prefetchCategories } from "@/modules/common/prefetch";
import { toolsParamsLoader } from "@/modules/dashboard/server/params-loader";
import { ToolsContainer } from "@/modules/dashboard/ui/components/tools-container";
import { ToolsBoard } from "@/modules/dashboard/ui/components/tools-board";
import { ToolsSkeleton } from "@/modules/dashboard/ui/components/tools-skeleton";
import { requireAuth } from "@/lib/auth-utils";

export const metadata: Metadata = {
  title: "Ferramentas",
  description: "Gerenciar ferramentas do site.",
};

type Props = {
  searchParams: Promise<SearchParams>;
};

export default async function ToolsPage({ searchParams }: Props) {
  await requireAuth();
  const params = await toolsParamsLoader(searchParams);
  const { view: _view, categoryId, ...rest } = params;
  prefetchTools({ ...rest, categoryId: categoryId || undefined });
  prefetchToolsStats();
  prefetchCategories({ page: 1, pageSize: 100, search: "" });

  return (
    <ToolsContainer>
      <HydrateClient>
        <ErrorBoundary
          fallback={
            <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-6 text-sm text-destructive">
              Falha ao carregar ferramentas.
            </div>
          }
        >
          <Suspense fallback={<ToolsSkeleton />}>
            <ToolsBoard />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </ToolsContainer>
  );
}
