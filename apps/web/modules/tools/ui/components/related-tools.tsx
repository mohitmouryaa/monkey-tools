"use client";

import Link from "next/link";
import { Wrench, ArrowRight } from "lucide-react";
import type { Tool } from "@workspace/database";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";

interface RelatedToolsProps {
  currentToolId: string;
  tools: Tool[];
  categorySlug: string;
}

export const RelatedTools = ({ currentToolId, tools, categorySlug }: RelatedToolsProps) => {
  // Filter out current tool and take up to 6
  const related = tools.filter((t) => t._id !== currentToolId).slice(0, 6);

  if (related.length === 0) return null;

  return (
    <div className="pt-8 mt-16 border-t border-border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Mais ferramentas de {categorySlug.replace(/-/g, " ")}</h2>
        <Link
          href={`/ferramentas/${categorySlug}`}
          className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          Ver todas <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {related.map((tool) => (
          <Link
            key={tool._id as string}
            href={tool.link.startsWith("/") ? `/ferramentas/${categorySlug}${tool.link}` : `/ferramentas/${categorySlug}/${tool.link}`}
            className="block group"
          >
            <div className="flex items-center h-full gap-4 p-4 transition-all duration-200 border rounded-xl border-border bg-card hover:border-primary/50 hover:bg-muted/50">
              <div className="flex items-center justify-center w-10 h-10 transition-colors rounded-lg shrink-0 bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground">
                {tool.icon ? (
                  <DynamicIcon name={tool.icon as IconName} className="w-5 h-5" fallback={() => <Wrench className="w-5 h-5" />} />
                ) : (
                  <Wrench className="w-5 h-5" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium truncate transition-colors text-foreground group-hover:text-primary">{tool.title}</h3>
                {tool.description && <p className="text-xs truncate text-muted-foreground">{tool.description}</p>}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
