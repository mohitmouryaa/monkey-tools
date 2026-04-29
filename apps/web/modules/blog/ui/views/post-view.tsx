import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock, ChevronRight } from "lucide-react";
import type { OutputData } from "@editorjs/editorjs";
import { PostContentRenderer } from "@/modules/blog/ui/components/post-content-renderer";
import { ArticleToc } from "@/modules/blog/ui/components/article-toc";
import { ShareBar } from "@/modules/blog/ui/components/share-bar";
import { ArticleSchema } from "@/modules/blog/ui/components/article-schema";
import { ArticleTags } from "@/modules/blog/ui/components/article-tags";
import { ArticleRelatedTools } from "@/modules/blog/ui/components/article-related-tools";
import { PostCard } from "@/modules/blog/ui/components/post-card";
import { BreadcrumbSchema } from "@/modules/tools/ui/components/breadcrumb-schema";
import { buildHeadingPlan, estimateReadingMinutes } from "@/modules/blog/lib/article";

interface PostViewTool {
  _id: string;
  title: string;
  link: string;
  description?: string;
  icon?: string;
  iconColor?: string;
  bgColor?: string;
  category?: { name: string; slug: string } | null;
}

interface PostViewPost {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  content: OutputData;
  publishedAt?: string | Date | null;
  updatedAt?: string | Date | null;
  tools?: PostViewTool[];
}

interface RelatedPost {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  publishedAt?: string | Date | null;
  tools?: Array<{ _id: string; title: string }>;
}

interface PostViewProps {
  post: PostViewPost;
  relatedPosts: RelatedPost[];
}

const longDateFormatter = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "long", year: "numeric" });

function formatLongDate(value?: string | Date | null) {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return longDateFormatter.format(date);
}

export const PostView = ({ post, relatedPosts }: PostViewProps) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://pdfs.com.br";
  const articleUrl = `${baseUrl}/blog/${post.slug}`;
  const tools = post.tools ?? [];
  const primaryCategory = tools.find((t) => t.category)?.category ?? null;
  const headingPlan = buildHeadingPlan(post.content);
  const readingMinutes = estimateReadingMinutes(post.content);
  const publishedDate = formatLongDate(post.publishedAt);
  const keywords = tools.map((t) => t.title);

  return (
    <article className="flex flex-col min-h-screen bg-background">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: baseUrl },
          { name: "Blog", url: `${baseUrl}/blog` },
          { name: post.title, url: articleUrl },
        ]}
      />
      <ArticleSchema
        url={articleUrl}
        title={post.title}
        description={post.excerpt}
        image={post.coverImage}
        datePublished={post.publishedAt}
        dateModified={post.updatedAt ?? post.publishedAt}
        keywords={keywords.length > 0 ? keywords : undefined}
      />

      <main className="container flex-1 px-4 py-12 md:py-16 mx-auto max-w-6xl">
        {/* HERO */}
        <header className="max-w-3xl mx-auto">
          <nav
            aria-label="breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground"
          >
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" aria-hidden />
            <Link href="/blog" className="hover:text-foreground transition-colors">
              Blog
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" aria-hidden />
            <span className="text-foreground line-clamp-1">{post.title}</span>
          </nav>

          {primaryCategory && (
            <Link
              href={`/ferramentas/${primaryCategory.slug}`}
              className="inline-flex items-center gap-2 mb-5 px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors hover:bg-primary/15"
            >
              <span className="h-1 w-1 rounded-full bg-primary" aria-hidden />
              {primaryCategory.name}
            </Link>
          )}

          <h1 className="mb-5 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
            {post.title}
          </h1>
          {post.excerpt && <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">{post.excerpt}</p>}

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            {publishedDate && (
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" aria-hidden />
                <time dateTime={post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined}>
                  {publishedDate}
                </time>
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden />
              {readingMinutes} min de leitura
            </span>
            <div className="ml-auto">
              <ShareBar url={articleUrl} title={post.title} variant="compact" />
            </div>
          </div>
        </header>

        {/* COVER */}
        {post.coverImage && (
          <div className="my-10 md:my-14 max-w-5xl mx-auto">
            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl shadow-md">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                sizes="(min-width: 1024px) 960px, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        {/* BODY */}
        <div className="max-w-3xl mx-auto">
          <ArticleToc entries={headingPlan.toc} />

          <PostContentRenderer
            content={post.content}
            tools={tools.map((t) => ({ _id: t._id, title: t.title, link: t.link }))}
            headingIdsByIndex={headingPlan.idsByBlockIndex}
          />

          {tools.length > 0 && (
            <div className="mt-20 md:mt-28 pt-10 border-t border-border">
              <ArticleTags
                tools={tools.map((t) => ({
                  _id: t._id,
                  title: t.title,
                  link: t.link,
                  category: t.category ?? null,
                }))}
              />
            </div>
          )}

          <div className="mt-12 md:mt-16">
            <ShareBar url={articleUrl} title={post.title} />
          </div>
        </div>

        {/* RELATED TOOLS */}
        {tools.length > 0 && (
          <div className="mt-24 md:mt-32 max-w-4xl mx-auto">
            <ArticleRelatedTools tools={tools} />
          </div>
        )}

        {/* RELATED POSTS */}
        {relatedPosts.length > 0 && (
          <div className="mt-24 md:mt-32 space-y-12 md:space-y-16">
            <section>
              <div className="mb-6 md:mb-8 flex items-baseline justify-between gap-4">
                <h2 className="text-xl md:text-2xl font-semibold text-foreground">Continue lendo</h2>
                <Link
                  href="/blog"
                  className="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2 transition-all"
                >
                  Todos os artigos
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-5 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((p) => (
                  <PostCard key={p._id} post={p} />
                ))}
              </div>
            </section>
          </div>
        )}

        {/* CTA FINAL */}
        <div className="mt-24 md:mt-32">
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-primary/80 px-6 py-12 md:px-12 md:py-20 text-center">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary-foreground/10 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -left-32 -bottom-32 h-80 w-80 rounded-full bg-primary-foreground/10 blur-3xl"
            />
            <div className="relative max-w-2xl mx-auto">
              <h2 className="mb-4 text-3xl md:text-4xl font-bold text-primary-foreground tracking-tight">
                Pronto para resolver sua tarefa?
              </h2>
              <p className="mb-8 text-base md:text-lg text-primary-foreground/90 leading-relaxed">
                Use a ferramenta certa para o caso e tenha o resultado em segundos — gratuito, direto no navegador.
              </p>
              <a
                href="/ferramentas"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-foreground text-primary text-sm md:text-base font-semibold shadow-lg shadow-primary-foreground/20 transition-transform hover:scale-105"
              >
                Ver todas as ferramentas
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </section>
        </div>
      </main>
    </article>
  );
};
