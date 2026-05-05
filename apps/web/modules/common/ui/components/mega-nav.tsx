"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, FolderOpen, Wrench } from "lucide-react";
import { SafeDynamicIcon } from "@/modules/common/ui/components/safe-dynamic-icon";
import { cn } from "@workspace/ui/lib/utils";

export interface NavCategory {
  _id: string;
  name: string;
  slug: string;
  icon: string;
  color?: string;
  description?: string;
  tools: Array<{
    _id: string;
    title: string;
    link: string;
    icon: string;
    iconColor?: string;
    bgColor?: string;
  }>;
}

interface MegaNavProps {
  categories: NavCategory[];
}

export const MegaNav = ({ categories }: MegaNavProps) => {
  const [clicked, setClicked] = useState(false);

  const close = () => setClicked(false);

  return (
    <div className="group relative" data-open={clicked || undefined}>
      <button
        type="button"
        aria-expanded={clicked}
        aria-haspopup="menu"
        onClick={() => setClicked((prev) => !prev)}
        className={cn(
          "inline-flex items-center gap-1.5 text-sm font-medium transition-colors",
          "text-muted-foreground hover:text-foreground group-hover:text-foreground",
          clicked && "text-foreground",
        )}
      >
        Ferramentas
        <ChevronDown
          className={cn("h-4 w-4 transition-transform duration-200", "group-hover:rotate-180", clicked && "rotate-180")}
          aria-hidden
        />
      </button>

      <div
        role="menu"
        className={cn(
          "absolute left-1/2 top-full z-50 mt-3 w-screen max-w-5xl -translate-x-1/2 px-4 transition-all duration-200",
          "pointer-events-none opacity-0 -translate-y-2",
          "group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0",
          "group-data-[open=true]:pointer-events-auto group-data-[open=true]:opacity-100 group-data-[open=true]:translate-y-0",
        )}
      >
        <div className="overflow-hidden rounded-2xl border border-border/60 bg-popover text-popover-foreground shadow-2xl">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 p-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => {
              const accent = category.color || "hsl(217 91% 60%)";
              return (
                <div key={category._id} className="min-w-0">
                  <Link href={`/ferramentas/${category.slug}`} onClick={close} className="group/cat flex items-center gap-3 mb-3">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                      style={{
                        background: `color-mix(in srgb, ${accent} 12%, transparent)`,
                        color: accent,
                      }}
                      aria-hidden
                    >
                      <SafeDynamicIcon
                        name={category.icon}
                        className="h-4 w-4"
                        fallback={<FolderOpen className="h-4 w-4" />}
                      />
                    </span>
                    <span className="text-sm font-semibold tracking-tight text-foreground group-hover/cat:text-primary transition-colors">
                      {category.name}
                    </span>
                  </Link>

                  <ul className="space-y-1.5">
                    {category.tools.slice(0, 6).map((tool) => (
                      <li key={tool._id}>
                        <Link
                          href={`/ferramentas/${category.slug}/${tool.link}`}
                          onClick={close}
                          className="block rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                        >
                          {tool.title}
                        </Link>
                      </li>
                    ))}
                    {category.tools.length === 0 && <li className="px-2 py-1.5 text-xs text-muted-foreground/70">Em breve</li>}
                    <li>
                      <Link
                        href={`/ferramentas/${category.slug}`}
                        onClick={close}
                        className="inline-flex items-center gap-1 px-2 py-1.5 text-xs font-medium text-primary hover:underline"
                      >
                        Ver todas →
                      </Link>
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-border/60 bg-muted/40 px-6 py-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Wrench className="h-3.5 w-3.5" aria-hidden />
              <span>Todas as ferramentas são gratuitas e funcionam direto no navegador.</span>
            </div>
            <Link href="/ferramentas" onClick={close} className="text-xs font-semibold text-primary hover:underline">
              Ver todas as ferramentas →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
