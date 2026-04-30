import type { Metadata } from "next";
import { caller } from "@/trpc/server";
import { ToolView } from "@/modules/tools/ui/views/tool-view";
import { buildMetadata } from "@/lib/seo";

interface ToolsPageProps {
  params: Promise<{
    toolCategory: string;
    tool: string;
  }>;
}

export async function generateMetadata({ params }: ToolsPageProps): Promise<Metadata> {
  const { toolCategory, tool } = await params;

  try {
    const category = await caller.categories.getCategoryWithTools({ slug: toolCategory });
    const toolData = category.tools.find((t) => [`/${tool}`, tool].includes(t.link));

    if (!toolData) {
      return buildMetadata({
        title: "Ferramenta não encontrada - pdfs.com.br",
        description: "A ferramenta solicitada não foi encontrada.",
        path: `/ferramentas/${toolCategory}/${tool}`,
        noIndex: true,
      });
    }

    return buildMetadata({
      title: toolData.seoTitle || `${toolData.title} - pdfs.com.br`,
      description: toolData.seoDescription || toolData.description,
      keywords: toolData.seoKeywords || "",
      path: `/ferramentas/${toolCategory}/${tool}`,
    });
  } catch {
    return buildMetadata({
      title: "pdfs.com.br",
      description: "Ferramentas online grátis para facilitar seu dia a dia",
      path: `/ferramentas/${toolCategory}/${tool}`,
      noIndex: true,
    });
  }
}

export default async function ToolsPage({ params }: ToolsPageProps) {
  const { toolCategory, tool } = await params;

  return <ToolView toolCategory={toolCategory} tool={tool} />;
}
