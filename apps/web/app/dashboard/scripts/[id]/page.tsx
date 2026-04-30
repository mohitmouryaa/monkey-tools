import type { Metadata } from "next";
import { Suspense } from "react";
import { HydrateClient } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";
import { requireAuth } from "@/lib/auth-utils";
import { prefetchScript } from "@/modules/common/prefetch";
import { ScriptView } from "@/modules/dashboard/ui/views/script-view";
import { SuspenseLoader } from "@/modules/common/ui/components/suspense-loader";

export const metadata: Metadata = {
  title: "Editar script",
  description: "Editar script global.",
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ScriptDetailPage({ params }: Props) {
  await requireAuth();
  const { id } = await params;
  prefetchScript(id);
  return (
    <HydrateClient>
      <ErrorBoundary fallback={<div>Algo deu errado.</div>}>
        <Suspense fallback={<SuspenseLoader />}>
          <main className="flex-1">
            <ScriptView id={id} />
          </main>
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
}
