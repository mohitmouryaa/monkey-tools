"use client";

import Link from "next/link";
import { ArrowRight, Wrench } from "lucide-react";
import { SafeDynamicIcon } from "@/modules/common/ui/components/safe-dynamic-icon";

interface RelatedTool {
  _id: string;
  title: string;
  link: string;
  description?: string;
  icon?: string;
  iconColor?: string;
  bgColor?: string;
  category?: { name: string; slug: string } | null;
}

interface ArticleRelatedToolsProps {
  tools: RelatedTool[];
}

function buildHref(link: string, categorySlug?: string) {
  const trimmed = link.startsWith("/") ? link.slice(1) : link;
  if (!categorySlug) return `/ferramentas`;
  return `/ferramentas/${categorySlug}/${trimmed}`;
}

export const ArticleRelatedTools = ({ tools }: ArticleRelatedToolsProps) => {
  if (tools.length === 0) return null;

  return (
    <section className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
      <div className="mb-6">
        <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
          <span className="h-1 w-1 rounded-full bg-primary" aria-hidden />
          Coloque em prática
        </span>
        <h2 className="mt-2 text-xl md:text-2xl font-bold tracking-tight text-foreground">Ferramentas mencionadas</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Resolva agora mesmo as tarefas tratadas no artigo — gratuito, direto no navegador.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {tools.map((tool) => {
          const href = buildHref(tool.link, tool.category?.slug);
          return (
            <Link
              key={tool._id}
              href={href}
              className="group flex items-start gap-4 rounded-xl border border-border bg-background p-4 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-sm"
            >
              <span
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                style={{
                  backgroundColor: tool.bgColor || "rgb(var(--muted))",
                  color: tool.iconColor || "currentColor",
                }}
              >
                <SafeDynamicIcon name={tool.icon} className="h-5 w-5" fallback={<Wrench className="h-5 w-5" />} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2">
                  <span className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                    {tool.title}
                  </span>
                </span>
                {tool.description && <span className="mt-1 block text-xs text-muted-foreground line-clamp-2">{tool.description}</span>}
              </span>
              <ArrowRight className="mt-2 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
            </Link>
          );
        })}
      </div>
    </section>
  );
};
