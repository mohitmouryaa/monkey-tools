import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caller } from "@/trpc/server";

interface CustomPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: CustomPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const page = await caller.pages.getBySlug({ slug });

    return {
      title: page.seoTitle,
      description: page.seoDescription,
      keywords: page.seoKeywords,
      openGraph: {
        title: page.seoTitle,
        description: page.seoDescription,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: page.seoTitle,
        description: page.seoDescription,
      },
    };
  } catch {
    return {
      title: "Página Não Encontrada",
      description: "A página solicitada não foi encontrada",
    };
  }
}

export default async function CustomPage({ params }: CustomPageProps) {
  try {
    const { slug } = await params;
    const page = await caller.pages.getBySlug({ slug });

    if (!page || !page.isActive) {
      notFound();
    }

    return (
      <div className="flex flex-col min-h-screen bg-background">
        <main className="container flex-1 px-4 py-12 mx-auto">
          <article className="max-w-4xl mx-auto">
            <h1 className="mb-8 text-3xl font-bold md:text-4xl text-foreground">{page.title}</h1>

            {/* Rich Content with Tailwind Typography */}
            <div
              className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground prose-ul:text-muted-foreground prose-ol:text-muted-foreground"
              // biome-ignore lint/security/noDangerouslySetInnerHtml: <Required to render rich text content>
              dangerouslySetInnerHTML={{ __html: page.content || "" }}
            />
          </article>
        </main>
      </div>
    );
  } catch {
    notFound();
  }
}
