import type { Metadata } from "next";
import { Suspense } from "react";
import type { SearchParams } from "nuqs/server";
import { ErrorBoundary } from "react-error-boundary";
import { PageType } from "@workspace/types";
import { HydrateClient } from "@/trpc/server";
import { requireAuth } from "@/lib/auth-utils";
import { prefetchPages, prefetchPagesPaginated } from "@/modules/common/prefetch";
import { pagesParamsLoader } from "@/modules/dashboard/server/params-loader";
import { PagesContainer } from "@/modules/dashboard/ui/components/pages-container";
import { PagesBoard } from "@/modules/dashboard/ui/components/pages-board";
import { PagesListSkeleton } from "@/modules/dashboard/ui/components/pages-list-skeleton";

export const metadata: Metadata = {
  title: "Páginas",
  description: "Gerenciar páginas do site.",
};

type Props = {
  searchParams: Promise<SearchParams>;
};

export default async function PagesPage({ searchParams }: Props) {
  await requireAuth();
  const params = await pagesParamsLoader(searchParams);

  prefetchPages();
  prefetchPagesPaginated({
    page: params.page,
    pageSize: params.pageSize,
    search: params.search,
    pageType: [PageType.CUSTOM, PageType.COMPARISON],
  });

  return (
    <PagesContainer>
      <HydrateClient>
        <ErrorBoundary
          fallback={
            <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-6 text-sm text-destructive">
              Falha ao carregar as páginas.
            </div>
          }
        >
          <Suspense fallback={<PagesListSkeleton />}>
            <PagesBoard />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </PagesContainer>
  );
}
