import Link from "next/link";
import { Hash, Tag } from "lucide-react";

interface ToolChip {
  _id: string;
  title: string;
  link: string;
  category?: { name: string; slug: string } | null;
}

interface ArticleTagsProps {
  tools: ToolChip[];
}

function normalizeToolHref(link: string, categorySlug?: string) {
  const trimmed = link.startsWith("/") ? link.slice(1) : link;
  if (!categorySlug) return `/ferramentas`;
  return `/ferramentas/${categorySlug}/${trimmed}`;
}

export const ArticleTags = ({ tools }: ArticleTagsProps) => {
  if (tools.length === 0) return null;

  const categories = Array.from(
    tools.reduce((map, t) => {
      if (t.category && !map.has(t.category.slug)) {
        map.set(t.category.slug, { name: t.category.name, slug: t.category.slug });
      }
      return map;
    }, new Map<string, { name: string; slug: string }>()).values(),
  );

  return (
    <div className="space-y-4">
      {categories.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            <Tag className="h-3.5 w-3.5" aria-hidden />
            Categorias
          </span>
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/ferramentas/${c.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary/15"
            >
              {c.name}
            </Link>
          ))}
        </div>
      )}
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          <Hash className="h-3.5 w-3.5" aria-hidden />
          Tags
        </span>
        {tools.map((t) => (
          <Link
            key={t._id}
            href={normalizeToolHref(t.link, t.category?.slug)}
            className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
          >
            #{t.title.toLowerCase().replace(/\s+/g, "-")}
          </Link>
        ))}
      </div>
    </div>
  );
};
