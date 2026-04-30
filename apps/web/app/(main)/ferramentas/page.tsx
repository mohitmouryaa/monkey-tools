import type { Metadata } from "next";
import { caller } from "@/trpc/server";
import { AllToolsView } from "@/modules/tools/ui/views/all-tools-view";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const allToolsPage = await caller.pages.getAllToolsPage();
    return buildMetadata({
      title: allToolsPage.seoTitle,
      description: allToolsPage.seoDescription,
      keywords: allToolsPage.seoKeywords,
      path: "/ferramentas",
    });
  } catch {
    return buildMetadata({
      title: "Todas as Ferramentas Online Grátis - pdfs.com.br",
      description:
        "Veja todas as ferramentas online gratuitas do pdfs.com.br: PDF, imagens, texto, conversões. Sem cadastro, sem instalação, direto no navegador.",
      keywords: "ferramentas online, ferramentas grátis, pdf online, conversor online, ferramentas web",
      path: "/ferramentas",
    });
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
