import type { Metadata } from "next";
import { caller } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";
import { NewHeroSection } from "@/modules/hero/ui/components/new-hero-section";
import { NewToolsGrid } from "@/modules/hero/ui/components/new-tools-grid";
import { HowItWorks } from "@/modules/hero/ui/components/how-it-works";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const homepage = await caller.pages.getHomepage();

    return {
      title: homepage.seoTitle,
      description: homepage.seoDescription,
      keywords: homepage.seoKeywords,
      openGraph: {
        title: homepage.seoTitle,
        description: homepage.seoDescription,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: homepage.seoTitle,
        description: homepage.seoDescription,
      },
    };
  } catch {
    // Fallback metadata if page not found
    return {
      title: "pdfs.com.br - Ferramentas Online Grátis para Todos",
      description:
        "Oferecemos ferramentas online de PDF, texto, imagem e muito mais para facilitar sua vida. Rápido, seguro e sem cadastro. Converta, comprima e mescle arquivos em segundos.",
      keywords:
        "ferramentas online, ferramentas grátis, ferramentas pdf, ferramentas de imagem, ferramentas de texto, conversor, compressor",
    };
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
    <ErrorBoundary fallback={<div>Algo deu errado.</div>}>
      <NewHeroSection heroSection={homepage.heroSection} />
      <NewToolsGrid toolsByCategory={toolsByCategory} />
      <HowItWorks howItWorksSection={homepage.howItWorksSection} />
    </ErrorBoundary>
  );
}
