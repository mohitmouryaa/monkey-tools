import type { Metadata } from "next";
import { caller } from "@/trpc/server";
import { ToolView } from "@/modules/tools/ui/views/tool-view";

interface ToolsPageProps {
  params: Promise<{
    toolCategory: string;
    tool: string;
  }>;
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: ToolsPageProps): Promise<Metadata> {
  const { toolCategory, tool } = await params;

  try {
    // Fetch category with all its tools
    const category = await caller.categories.getCategoryWithTools({ slug: toolCategory });

    // Find the specific tool by matching the link
    const toolData = category.tools.find((t) => [`/${tool}`, tool].includes(t.link));

    if (!toolData) {
      return {
        title: "Tool Not Found - Monkey Tools",
        description: "The requested tool could not be found.",
      };
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://monkeytools.com";
    const canonicalUrl = `${baseUrl}/tools/${toolCategory}/${tool}`;

    // Return SEO metadata from the database
    return {
      title: toolData.seoTitle || `${toolData.title} - Monkey Tools`,
      description: toolData.seoDescription || toolData.description,
      keywords: toolData.seoKeywords || "",
      alternates: {
        canonical: canonicalUrl,
      },
      robots: {
        index: true,
        follow: true,
      },
      openGraph: {
        title: toolData.seoTitle || toolData.title,
        description: toolData.seoDescription || toolData.description,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: toolData.seoTitle || toolData.title,
        description: toolData.seoDescription || toolData.description,
      },
    };
  } catch {
    // Fallback metadata if fetch fails
    return {
      title: "Monkey Tools",
      description: "Free online tools to make your life easier",
    };
  }
}

export default async function ToolsPage({ params }: ToolsPageProps) {
  const { toolCategory, tool } = await params;

  return <ToolView toolCategory={toolCategory} tool={tool} />;
}
