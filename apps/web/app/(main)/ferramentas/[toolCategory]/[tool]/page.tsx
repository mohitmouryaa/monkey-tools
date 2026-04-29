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
        title: "Ferramenta não encontrada - pdfs.com.br",
        description: "A ferramenta solicitada não foi encontrada.",
      };
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://pdfs.com.br";
    const canonicalUrl = `${baseUrl}/ferramentas/${toolCategory}/${tool}`;

    // Return SEO metadata from the database
    return {
      title: toolData.seoTitle || `${toolData.title} - pdfs.com.br`,
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
    return {
      title: "pdfs.com.br",
      description: "Ferramentas online grátis para facilitar seu dia a dia",
    };
  }
}

export default async function ToolsPage({ params }: ToolsPageProps) {
  const { toolCategory, tool } = await params;

  return <ToolView toolCategory={toolCategory} tool={tool} />;
}
