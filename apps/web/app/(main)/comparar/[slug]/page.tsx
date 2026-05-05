import type { OutputData } from "@editorjs/editorjs";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageContentRenderer } from "@/modules/pages/ui/components/page-content-renderer";
import { Breadcrumb } from "@/modules/common/ui/components/breadcrumb";
import { JsonLd } from "@/modules/common/ui/components/json-ld";
import { caller } from "@/trpc/server";
import { buildBreadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const legacyHtmlClasses = [
  "text-foreground text-base md:text-lg leading-[1.75]",
  "[&_h1]:mt-12 [&_h1]:mb-6 [&_h1]:text-3xl md:[&_h1]:text-4xl [&_h1]:font-bold [&_h1]:tracking-tight [&_h1]:text-foreground",
  "[&_h2]:mt-10 [&_h2]:mb-5 [&_h2]:text-2xl md:[&_h2]:text-[1.75rem] [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-foreground",
  "[&_h3]:mt-8 [&_h3]:mb-4 [&_h3]:text-xl md:[&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:tracking-tight [&_h3]:text-foreground",
  "[&_p]:my-5 [&_p]:leading-[1.75]",
  "[&_a]:text-primary [&_a]:underline",
  "[&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2",
  "[&_ol]:my-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2",
].join(" ");

interface ComparisonPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ComparisonPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const page = await caller.pages.getComparisonBySlug({ slug });
    const seoTitle = page.seoTitle?.trim();
    const seoDescription = page.seoDescription?.trim();
    const fallbackTitle = page.title?.trim();
    const bothMissing = !seoTitle && !seoDescription;

    return buildMetadata({
      title: seoTitle || fallbackTitle || "Comparação",
      description:
        seoDescription || `Compare ${fallbackTitle || "ferramentas"} com pdfs.com.br e veja qual atende melhor sua necessidade.`,
      keywords: page.seoKeywords,
      path: `/comparar/${slug}`,
      noIndex: bothMissing,
    });
  } catch {
    return buildMetadata({
      title: "Comparação não encontrada",
      description: "A comparação solicitada não foi encontrada.",
      path: "/",
      noIndex: true,
    });
  }
}

export default async function ComparisonPage({ params }: ComparisonPageProps) {
  try {
    const { slug } = await params;
    const page = await caller.pages.getComparisonBySlug({ slug });

    if (!page || !page.isActive) {
      notFound();
    }

    if (!page.content) {
      notFound();
    }

    const isLegacyHtml = typeof page.content === "string";
    const breadcrumbItems = [
      { label: "Início", href: "/" },
      { label: "Comparações", href: "/" },
      { label: page.title || page.competitorName || "Comparação" },
    ];

    const breadcrumbJsonLd = buildBreadcrumbJsonLd([
      { name: "Início", path: "/" },
      { name: "Comparações", path: "/" },
      { name: page.title || page.competitorName || "Comparação", path: `/comparar/${slug}` },
    ]);

    return (
      <div className="flex flex-col min-h-screen bg-background">
        <main className="flex-1">
          <div className="container mx-auto max-w-4xl px-4 py-12 md:py-16">
            <Breadcrumb items={breadcrumbItems} className="mb-6" />
            <JsonLd id="ld-breadcrumb" data={breadcrumbJsonLd} />
            {page.title && <h1 className="mb-8 text-3xl font-bold md:text-4xl text-foreground">{page.title}</h1>}
            {isLegacyHtml ? (
              <div
                className={legacyHtmlClasses}
                // biome-ignore lint/security/noDangerouslySetInnerHtml: conteúdo legado
                dangerouslySetInnerHTML={{ __html: page.content as string }}
              />
            ) : (
              <PageContentRenderer content={page.content as OutputData} />
            )}
          </div>
        </main>
      </div>
    );
  } catch {
    notFound();
  }
}
