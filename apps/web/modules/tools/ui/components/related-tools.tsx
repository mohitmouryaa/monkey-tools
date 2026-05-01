"use client";

import Link from "next/link";
import { ArrowRight, Wrench } from "lucide-react";
import type { Tool } from "@workspace/database";
import { SafeDynamicIcon } from "@/modules/common/ui/components/safe-dynamic-icon";

interface RelatedToolsProps {
  currentToolId: string;
  tools: Tool[];
  categorySlug: string;
}

export const RelatedTools = ({ currentToolId, tools, categorySlug }: RelatedToolsProps) => {
  const related = tools.filter((t) => t._id !== currentToolId).slice(0, 6);

  if (related.length === 0) return null;

  return (
    <section className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
      <h2 className="mb-6 text-xl md:text-2xl font-bold text-foreground">Ferramentas Relacionadas</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {related.map((tool) => {
          const href = tool.link.startsWith("/")
            ? `/ferramentas/${categorySlug}${tool.link}`
            : `/ferramentas/${categorySlug}/${tool.link}`;

          return (
            <Link
              key={tool._id as string}
              href={href}
              className="group flex items-center justify-between gap-3 rounded-full border border-emerald-100 bg-emerald-50/70 px-5 py-3 text-foreground transition-all hover:bg-emerald-100 hover:border-emerald-200"
            >
              <span className="flex items-center gap-3 min-w-0">
                <SafeDynamicIcon
                  name={tool.icon}
                  className="w-4 h-4 shrink-0 text-foreground/70"
                  fallback={<Wrench className="w-4 h-4 shrink-0 text-foreground/70" />}
                />
                <span className="text-sm font-medium truncate">{tool.title}</span>
              </span>
              <ArrowRight className="w-4 h-4 shrink-0 text-foreground/60 transition-transform group-hover:translate-x-1" />
            </Link>
          );
        })}
      </div>
    </section>
  );
};
