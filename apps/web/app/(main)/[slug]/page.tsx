import type { OutputData } from "@editorjs/editorjs";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionErrorBoundary } from "@/modules/common/ui/components/section-error-boundary";
import { PageContentRenderer } from "@/modules/pages/ui/components/page-content-renderer";
import { caller } from "@/trpc/server";
import { buildMetadata } from "@/lib/seo";

const legacyHtmlClasses = [
  "text-foreground text-base md:text-lg leading-[1.75]",
  "[&_h1]:mt-12 [&_h1]:mb-6 [&_h1]:text-3xl md:[&_h1]:text-4xl [&_h1]:font-bold [&_h1]:tracking-tight [&_h1]:text-foreground",
  "[&_h2]:mt-10 [&_h2]:mb-5 [&_h2]:text-2xl md:[&_h2]:text-[1.75rem] [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-foreground",
  "[&_h3]:mt-8 [&_h3]:mb-4 [&_h3]:text-xl md:[&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:tracking-tight [&_h3]:text-foreground",
  "[&_h4]:mt-6 [&_h4]:mb-3 [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-foreground",
  "[&_p]:my-5 [&_p]:leading-[1.75]",
  "[&_a]:text-primary [&_a]:underline [&_a]:decoration-primary/30 [&_a]:underline-offset-[3px] [&_a]:transition-colors hover:[&_a]:decoration-primary",
  "[&_strong]:font-semibold [&_strong]:text-foreground",
  "[&_em]:italic",
  "[&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.9em] [&_code]:text-foreground",
  "[&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-muted [&_pre]:p-4 [&_pre]:text-sm",
  "[&_pre_code]:bg-transparent [&_pre_code]:p-0",
  "[&_mark]:rounded [&_mark]:bg-amber-200/40 dark:[&_mark]:bg-amber-300/20 [&_mark]:px-1 [&_mark]:py-0.5",
  "[&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2",
  "[&_ol]:my-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2",
  "[&_li]:leading-[1.75]",
  "[&_blockquote]:my-6 [&_blockquote]:border-l-4 [&_blockquote]:border-primary/40 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground",
  "[&_hr]:my-10 [&_hr]:border-border",
  "[&_img]:my-6 [&_img]:rounded-lg",
].join(" ");

interface CustomPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: CustomPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const page = await caller.pages.getBySlug({ slug });
    const seoTitle = page.seoTitle?.trim();
    const seoDescription = page.seoDescription?.trim();
    const fallbackTitle = page.title?.trim();
    const bothMissing = !seoTitle && !seoDescription;

    return buildMetadata({
      title: seoTitle || fallbackTitle || "Página",
      description: seoDescription || `Saiba mais sobre ${fallbackTitle || "esta página"} em pdfs.com.br.`,
      keywords: page.seoKeywords,
      path: `/${slug}`,
      ogImageType: "page",
      noIndex: bothMissing,
    });
  } catch {
    return buildMetadata({
      title: "Página não encontrada",
      description: "A página solicitada não foi encontrada.",
      path: "/",
      noIndex: true,
    });
  }
}

export default async function CustomPage({ params }: CustomPageProps) {
  try {
    const { slug } = await params;
    const page = await caller.pages.getBySlug({ slug });

    if (!page || !page.isActive) {
      notFound();
    }

    if (!page.content) {
      notFound();
    }

    const isLegacyHtml = typeof page.content === "string";

    if (isLegacyHtml) {
      return (
        <div className="flex flex-col min-h-screen bg-background">
          <main className="container flex-1 px-4 py-12 mx-auto">
            <article className="max-w-4xl mx-auto">
              <h1 className="mb-8 text-3xl font-bold md:text-4xl text-foreground">{page.title}</h1>
              <div
                className={legacyHtmlClasses}
                // biome-ignore lint/security/noDangerouslySetInnerHtml: conteudo migrado do TipTap admin, confiavel
                dangerouslySetInnerHTML={{ __html: page.content as string }}
              />
            </article>
          </main>
        </div>
      );
    }

    return (
      <div className="flex flex-col min-h-screen bg-background">
        <main className="flex-1">
          <SectionErrorBoundary message="Não foi possível renderizar o conteúdo desta página.">
            <PageContentRenderer content={page.content as OutputData} />
          </SectionErrorBoundary>
        </main>
      </div>
    );
  } catch {
    notFound();
  }
}
