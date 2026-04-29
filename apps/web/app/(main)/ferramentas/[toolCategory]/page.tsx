import { Suspense } from "react";
import type { Metadata } from "next";
import { caller } from "@/trpc/server";
import { HydrateClient } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";
import { ToolsView } from "@/modules/tools/ui/views/tools-view";
import { prefetchCategoryWithTools } from "@/modules/common/prefetch";
import { SuspenseLoader } from "@/modules/common/ui/components/suspense-loader";

interface ToolsPageProps {
  params: Promise<{ toolCategory: string }>;
}

export async function generateMetadata({ params }: ToolsPageProps): Promise<Metadata> {
  const { toolCategory } = await params;

  try {
    const category = await caller.categories.getCategoryWithTools({ slug: toolCategory });

    return {
      title: `${category.name} - Ferramentas Online Grátis | pdfs.com.br`,
      description:
        category.description ||
        `Explore nossa coleção de ${category.name.toLowerCase()} para facilitar seu dia a dia. Rápido, seguro e gratuito.`,
      keywords: `${category.name}, ferramentas online, ferramentas grátis, ${category.slug}`,
      openGraph: {
        title: `${category.name} - pdfs.com.br`,
        description: category.description || `${category.name} grátis online`,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `${category.name} - pdfs.com.br`,
        description: category.description || `${category.name} grátis online`,
      },
    };
  } catch {
    return {
      title: "Ferramentas - pdfs.com.br",
      description: "Ferramentas online grátis para facilitar seu dia a dia",
    };
  }
}

export default async function ToolsPage({ params }: ToolsPageProps) {
  const { toolCategory } = await params;
  prefetchCategoryWithTools(toolCategory);
  return (
    <HydrateClient>
      <ErrorBoundary fallback={<div>Algo deu errado.</div>}>
        <Suspense fallback={<SuspenseLoader />}>
          <ToolsView toolCategory={toolCategory} />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
}
