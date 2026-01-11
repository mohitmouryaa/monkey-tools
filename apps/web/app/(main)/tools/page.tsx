import type { Metadata } from "next";
import { caller } from "@/trpc/server";
import { AllToolsClient } from "@/modules/tools/ui/views/all-tools-client";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const allToolsPage = await caller.pages.getAllToolsPage();

    return {
      title: allToolsPage.seoTitle,
      description: allToolsPage.seoDescription,
      keywords: allToolsPage.seoKeywords,
      openGraph: {
        title: allToolsPage.seoTitle,
        description: allToolsPage.seoDescription,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: allToolsPage.seoTitle,
        description: allToolsPage.seoDescription,
      },
    };
  } catch {
    // Fallback metadata if page not found
    return {
      title: "All Tools - Monkey Tools",
      description: "Explore our complete collection of free online tools",
      keywords: "tools, online tools, free tools",
    };
  }
}

export default async function AllToolsPage() {
  // Fetch all tools page data
  const allToolsPage = await caller.pages.getAllToolsPage();

  // Fetch all tools and categories on the server
  const [toolsData, categoriesData] = await Promise.all([
    caller.tools.getMany({ pageSize: 100, page: 1 }),
    caller.categories.getMany({}),
  ]);

  const tools = toolsData.items;
  const categories = categoriesData.items;

  return (
    <AllToolsClient
      tools={tools}
      categories={categories}
      h1Heading={allToolsPage.h1Heading || "All Tools"}
      description={allToolsPage.shortDescription || "Explore our complete collection of free online tools"}
    />
  );
}
