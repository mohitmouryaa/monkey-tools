"use client";

import Link from "next/link";
import { ArrowUpRight, FolderOpen } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";

interface CategoryCardProps {
  name: string;
  slug: string;
  description: string;
  icon: string;
  color?: string;
  toolsCount?: number;
}

export const CategoryCard = ({ name, slug, description, icon, color, toolsCount }: CategoryCardProps) => {
  const accent = color || "hsl(217 91% 60%)";
  const accentBg = `color-mix(in srgb, ${accent} 7%, transparent)`;
  const accentBgHover = `color-mix(in srgb, ${accent} 14%, transparent)`;
  const accentRing = `color-mix(in srgb, ${accent} 22%, transparent)`;
  const iconGradient = `linear-gradient(135deg, ${accent}, color-mix(in srgb, ${accent} 70%, black))`;

  return (
    <Link href={`/ferramentas/${slug}`} className="group relative block h-full">
      <article
        className="relative flex h-full flex-col overflow-hidden rounded-3xl border bg-card transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:shadow-xl"
        style={{
          borderColor: accentRing,
          background: `linear-gradient(180deg, ${accentBg}, transparent 60%), var(--card)`,
        }}
      >
        <div className="absolute inset-x-0 top-0 h-1.5" style={{ background: iconGradient }} aria-hidden />

        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -bottom-16 h-48 w-48 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-50"
          style={{ background: accent }}
        />

        <div className="relative flex h-full flex-col items-center text-center px-6 pt-10 pb-7 md:px-8 md:pt-12 md:pb-9">
          <div
            className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-lg transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-3"
            style={{
              background: iconGradient,
              boxShadow: `0 12px 30px -8px ${accent}`,
            }}
          >
            <DynamicIcon name={icon as IconName} className="h-8 w-8" fallback={() => <FolderOpen className="h-8 w-8" />} />
          </div>

          <h3 className="mb-2 text-xl md:text-2xl font-bold tracking-tight text-foreground">{name}</h3>
          <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{description}</p>

          <div className="mt-auto flex items-center gap-2">
            {typeof toolsCount === "number" && toolsCount > 0 && (
              <span
                className="rounded-full px-3 py-1 text-xs font-bold transition-colors"
                style={{ color: accent, backgroundColor: accentBgHover }}
              >
                {toolsCount} {toolsCount === 1 ? "ferramenta" : "ferramentas"}
              </span>
            )}
            <span
              className="flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              style={{ backgroundColor: accentBgHover, color: accent }}
              aria-hidden
            >
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};
