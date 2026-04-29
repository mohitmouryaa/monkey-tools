import type { Metadata } from "next";
import { caller } from "@/trpc/server";
import { CategoryView } from "@/modules/tools/ui/views/category-view";

interface ToolsPageProps {
  params: Promise<{ toolCategory: string }>;
}

export async function generateMetadata({ params }: ToolsPageProps): Promise<Metadata> {
  const { toolCategory } = await params;

  try {
    const category = await caller.categories.getCategoryWithTools({ slug: toolCategory });
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://pdfs.com.br";
    const canonicalUrl = `${baseUrl}/ferramentas/${toolCategory}`;
    const lower = category.name.toLowerCase();

    const title = `${category.name} — Ferramentas Online Grátis | pdfs.com.br`;
    const description =
      category.description ||
      `Conjunto de ferramentas online gratuitas de ${lower}. Use direto no navegador, sem cadastro e sem instalação.`;

    return {
      title,
      description,
      keywords: `${category.name}, ferramentas ${lower}, ${lower} online, ${lower} grátis, ${category.slug}`,
      alternates: {
        canonical: canonicalUrl,
      },
      robots: {
        index: true,
        follow: true,
      },
      openGraph: {
        title,
        description,
        type: "website",
        url: canonicalUrl,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
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
  return <CategoryView toolCategory={toolCategory} />;
}
