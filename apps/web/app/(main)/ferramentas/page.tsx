import type { Metadata } from "next";
import { caller } from "@/trpc/server";
import { AllToolsView } from "@/modules/tools/ui/views/all-tools-view";

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
    return {
      title: "Todas as Ferramentas Online Grátis - pdfs.com.br",
      description:
        "Explore todas as ferramentas online gratuitas do pdfs.com.br: PDF, imagens, texto, conversões. Sem cadastro, sem instalação, direto no navegador.",
      keywords: "ferramentas online, ferramentas grátis, pdf online, conversor online, ferramentas web",
    };
  }
}

export default async function AllToolsPage() {
  const allToolsPage = await caller.pages.getAllToolsPage();

  // categories.getMany já retorna toolsCount via aggregation
  const [toolsData, categoriesData] = await Promise.all([
    caller.tools.getMany({ pageSize: 100, page: 1 }),
    caller.categories.getMany({ pageSize: 50, page: 1 }),
  ]);

  return (
    <AllToolsView
      tools={toolsData.items}
      categories={categoriesData.items}
      h1Heading={allToolsPage.h1Heading || "Todas as Ferramentas Online Grátis"}
      description={
        allToolsPage.shortDescription ||
        "pdfs.com.br reúne ferramentas online gratuitas para PDF, imagens, texto, conversões e muito mais. Tudo direto no navegador, sem cadastro e sem instalação."
      }
    />
  );
}
