import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface PostCardProps {
  post: {
    _id: string;
    slug: string;
    title: string;
    excerpt: string;
    coverImage: string;
    publishedAt?: string | Date | null;
    tools?: Array<{ _id: string; title: string }>;
  };
}

const dateFormatter = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric" });

function formatDate(value?: string | Date | null) {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return dateFormatter.format(date);
}

export const PostCard = ({ post }: PostCardProps) => {
  const tools = post.tools ?? [];
  const visibleTools = tools.slice(0, 2);
  const remaining = tools.length - visibleTools.length;
  const date = formatDate(post.publishedAt);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        {(date || visibleTools.length > 0) && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {date && <span className="font-medium uppercase tracking-wide">{date}</span>}
            {date && visibleTools.length > 0 && <span aria-hidden>·</span>}
            {visibleTools.length > 0 && (
              <span className="line-clamp-1">
                {visibleTools.map((t) => t.title).join(", ")}
                {remaining > 0 ? ` +${remaining}` : ""}
              </span>
            )}
          </div>
        )}
        <h3 className="text-lg font-semibold leading-snug tracking-tight text-foreground line-clamp-2 transition-colors group-hover:text-primary">
          {post.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{post.excerpt}</p>
        <div className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-primary">
          Ler artigo
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </div>
      </div>
    </Link>
  );
};
