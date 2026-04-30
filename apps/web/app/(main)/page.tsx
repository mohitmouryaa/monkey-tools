import type { Metadata } from "next";
import { caller } from "@/trpc/server";
import { NewHeroSection } from "@/modules/hero/ui/components/new-hero-section";
import { NewToolsGrid } from "@/modules/hero/ui/components/new-tools-grid";
import { HowItWorks } from "@/modules/hero/ui/components/how-it-works";
import { JsonLd } from "@/modules/common/ui/components/json-ld";
import { SectionErrorBoundary } from "@/modules/common/ui/components/section-error-boundary";
import { buildMetadata, buildOrganizationJsonLd, buildWebsiteJsonLd } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const homepage = await caller.pages.getHomepage();
    return buildMetadata({
      title: homepage.seoTitle,
      description: homepage.seoDescription,
      keywords: homepage.seoKeywords,
      path: "/",
    });
  } catch {
    return buildMetadata({
      title: "pdfs.com.br - Ferramentas Online Grátis para Todos",
      description:
        "Oferecemos ferramentas online de PDF, texto, imagem e muito mais para facilitar sua vida. Rápido, seguro e sem cadastro.",
      keywords: "ferramentas online, ferramentas grátis, pdf online, conversor online, compressor, mesclar pdf",
      path: "/",
    });
  }
}

export default async function Home() {
  // Fetch homepage data
  const homepage = await caller.pages.getHomepage();

  // Fetch categories
  const categories = await caller.categories.getMany({});

  // Fetch 5 tools per category
  const toolsByCategory = await Promise.all(
    categories.items.slice(0, 4).map(async (category) => {
      const tools = await caller.tools.getMany({
        categoryId: category._id,
        pageSize: 5,
        page: 1,
      });
      return {
        category: {
          _id: category._id,
          name: category.name,
          slug: category.slug,
        },
        tools: tools.items
          .filter((tool) => tool._id) // Filter out tools without _id
          .map((tool) => ({
            _id: tool._id as string, // Type assertion since we filtered
            title: tool.title,
            description: tool.description,
            link: tool.link,
            icon: tool.icon,
            iconColor: tool.iconColor,
            bgColor: tool.bgColor,
            category: {
              _id: category._id,
              name: category.name,
              slug: category.slug,
            },
          })),
      };
    }),
  );

  return (
    <>
      <JsonLd id="ld-organization" data={buildOrganizationJsonLd()} />
      <JsonLd id="ld-website" data={buildWebsiteJsonLd()} />
      <NewHeroSection heroSection={homepage.heroSection} />
      <SectionErrorBoundary message="Não foi possível carregar a lista de ferramentas agora.">
        <NewToolsGrid toolsByCategory={toolsByCategory} />
      </SectionErrorBoundary>
      <HowItWorks howItWorksSection={homepage.howItWorksSection} />
    </>
  );
}
