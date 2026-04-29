import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { PostCard } from "./post-card";

interface FeaturedPost {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  publishedAt?: string | Date | null;
  tools?: Array<{ _id: string; title: string }>;
}

interface FeaturedHighlightProps {
  posts: FeaturedPost[];
}

const dateFormatter = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "long", year: "numeric" });

function formatDate(value?: string | Date | null) {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return dateFormatter.format(date);
}

const FeaturedPrimary = ({ post }: { post: FeaturedPost }) => {
  const date = formatDate(post.publishedAt);
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted lg:aspect-auto lg:h-full lg:min-h-[420px]">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          sizes="(min-width: 1024px) 66vw, 100vw"
          priority
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6 md:p-8 lg:p-10 text-white">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] backdrop-blur">
            <Sparkles className="h-3 w-3" aria-hidden />
            Em destaque
          </span>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-tight line-clamp-3 transition-colors group-hover:text-primary-foreground/90">
            {post.title}
          </h3>
          <p className="hidden text-base leading-relaxed text-white/85 line-clamp-2 md:block">{post.excerpt}</p>
          <div className="mt-1 flex items-center gap-2 text-xs text-white/80">
            {date && <span className="font-medium">{date}</span>}
            <span className="ml-auto inline-flex items-center gap-1.5 text-sm font-semibold text-white">
              Ler artigo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const FeaturedHighlight = ({ posts }: FeaturedHighlightProps) => {
  const primary = posts[0];
  if (!primary) return null;

  const sidekicks = posts.slice(1, 3);

  return (
    <section>
      <div className="mb-6 md:mb-8 flex items-baseline justify-between gap-4">
        <h2 className="text-xl md:text-2xl font-semibold text-foreground">Em destaque</h2>
        <p className="hidden md:block text-sm text-muted-foreground">As leituras que recomendamos primeiro.</p>
      </div>

      {sidekicks.length === 0 ? (
        <FeaturedPrimary post={primary} />
      ) : (
        <div className="grid gap-5 md:gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <FeaturedPrimary post={primary} />
          </div>
          <div className="flex flex-col gap-5 md:gap-6">
            {sidekicks.map((p) => (
              <PostCard key={p._id} post={p} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
