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

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: ToolsPageProps): Promise<Metadata> {
  const { toolCategory } = await params;

  try {
    // Fetch category with all its tools
    const category = await caller.categories.getCategoryWithTools({ slug: toolCategory });

    return {
      title: `${category.name} - Free Online Tools | Monkey Tools`,
      description:
        category.description ||
        `Explore our collection of ${category.name.toLowerCase()} to make your work easier. Fast, secure, and free to use.`,
      keywords: `${category.name}, online tools, free tools, ${category.slug}`,
      openGraph: {
        title: `${category.name} - Monkey Tools`,
        description: category.description || `Free ${category.name.toLowerCase()}`,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `${category.name} - Monkey Tools`,
        description: category.description || `Free ${category.name.toLowerCase()}`,
      },
    };
  } catch {
    return {
      title: "Tools - Monkey Tools",
      description: "Free online tools to make your life easier",
    };
  }
}

export default async function ToolsPage({ params }: ToolsPageProps) {
  const { toolCategory } = await params;
  prefetchCategoryWithTools(toolCategory);
  return (
    <HydrateClient>
      <ErrorBoundary fallback={<div>Something went wrong.</div>}>
        <Suspense fallback={<SuspenseLoader />}>
          <ToolsView toolCategory={toolCategory} />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
}
