import type { Metadata } from "next";
import { caller } from "@/trpc/server";
import { CategoryView } from "@/modules/tools/ui/views/category-view";
import { buildMetadata } from "@/lib/seo";

interface ToolsPageProps {
  params: Promise<{ toolCategory: string }>;
}

export async function generateMetadata({ params }: ToolsPageProps): Promise<Metadata> {
  const { toolCategory } = await params;

  try {
    const category = await caller.categories.getCategoryWithTools({ slug: toolCategory });
    const lower = category.name.toLowerCase();
    const title = `${category.name} — Ferramentas Online Grátis | pdfs.com.br`;
    const description =
      category.description ||
      `Conjunto de ferramentas online gratuitas de ${lower}. Use direto no navegador, sem cadastro e sem instalação.`;

    return buildMetadata({
      title,
      description,
      keywords: `${category.name}, ferramentas ${lower}, ${lower} online, ${lower} grátis, ${category.slug}`,
      path: `/ferramentas/${toolCategory}`,
    });
  } catch {
    return buildMetadata({
      title: "Ferramentas - pdfs.com.br",
      description: "Ferramentas online grátis para facilitar seu dia a dia",
      path: `/ferramentas/${toolCategory}`,
      noIndex: true,
    });
  }
}

export default async function ToolsPage({ params }: ToolsPageProps) {
  const { toolCategory } = await params;
  return <CategoryView toolCategory={toolCategory} />;
}
