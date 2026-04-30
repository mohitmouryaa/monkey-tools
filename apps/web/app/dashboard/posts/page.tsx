import type { Metadata } from "next";
import { Suspense } from "react";
import type { SearchParams } from "nuqs/server";
import { ErrorBoundary } from "react-error-boundary";
import { HydrateClient } from "@/trpc/server";
import { requireAuth } from "@/lib/auth-utils";
import { prefetchPosts } from "@/modules/dashboard/posts/server/prefetch";
import { postsParamsLoader } from "@/modules/dashboard/posts/server/params-loader";
import { SuspenseLoader } from "@/modules/common/ui/components/suspense-loader";
import { PostsContainer } from "@/modules/dashboard/ui/components/posts-container";
import { PostsView } from "@/modules/dashboard/ui/views/posts-view";

export const metadata: Metadata = {
  title: "Posts",
  description: "Gerenciar posts do blog.",
};

type Props = { searchParams: Promise<SearchParams> };

export default async function PostsPage({ searchParams }: Props) {
  await requireAuth();
  const params = await postsParamsLoader(searchParams);
  prefetchPosts({
    page: params.page,
    pageSize: params.pageSize,
    search: params.search,
    status: params.status ?? undefined,
  });
  return (
    <PostsContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<div>Something went wrong.</div>}>
          <Suspense fallback={<SuspenseLoader />}>
            <main className="flex-1">
              <PostsView />
            </main>
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </PostsContainer>
  );
}
