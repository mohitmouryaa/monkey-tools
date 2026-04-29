import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HydrateClient } from "@/trpc/server";
import { requireAuth } from "@/lib/auth-utils";
import { prefetchPost } from "@/modules/dashboard/posts/server/prefetch";
import { SuspenseLoader } from "@/modules/common/ui/components/suspense-loader";
import { EditPostView } from "@/modules/dashboard/ui/views/edit-post-view";

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  await requireAuth();
  const { id } = await params;
  prefetchPost(id);
  return (
    <HydrateClient>
      <ErrorBoundary fallback={<div>Something went wrong.</div>}>
        <Suspense fallback={<SuspenseLoader />}>
          <main className="flex-1">
            <EditPostView id={id} />
          </main>
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
}
