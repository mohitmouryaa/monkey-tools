"use client";

import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { SafeDynamicIcon } from "@/modules/common/ui/components/safe-dynamic-icon";

interface ToolCardProps {
  name: string;
  description: string;
  category: string;
  categorySlug: string;
  toolSlug: string;
  icon?: string;
  iconColor?: string;
  bgColor?: string;
}

const categoryVar: Record<string, string> = {
  "pdf-tools": "var(--category-pdf)",
  "image-tools": "var(--category-image)",
  "text-tools": "var(--category-text)",
  "text-ai-tools": "var(--category-text)",
  converters: "var(--category-converter)",
};

export const ToolCard = ({ name, description, category, categorySlug, toolSlug, icon, iconColor, bgColor }: ToolCardProps) => {
  const accentVar = categoryVar[categorySlug] ?? "var(--category-pdf)";
  const accent = iconColor || bgColor || `hsl(${accentVar})`;
  const accentSoft = `hsl(${accentVar} / 0.12)`;
  const accentRing = `hsl(${accentVar} / 0.35)`;
  const accentGlow = `hsl(${accentVar} / 0.45)`;

  return (
    <Link href={`/ferramentas/${categorySlug}/${toolSlug}`} className="group relative block h-full">
      <article
        className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-500 ease-out group-hover:-translate-y-1"
        style={{ ["--accent" as string]: accent }}
      >
        {/* Halo radial colorido */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-60"
          style={{ background: `radial-gradient(circle, ${accent}, transparent 70%)` }}
        />
        {/* Borda iluminada + sombra colorida */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ boxShadow: `inset 0 0 0 1px ${accentRing}, 0 18px 50px -18px ${accentGlow}` }}
        />
        {/* Linha sutil de topo */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-6 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
        />

        <div className="relative mb-5 flex items-start justify-between gap-3">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-500 ease-out group-hover:scale-110 group-hover:-rotate-3"
            style={{
              background: `linear-gradient(135deg, ${accentSoft}, ${accentRing})`,
              boxShadow: `inset 0 0 0 1px ${accentRing}`,
            }}
          >
            <SafeDynamicIcon
              name={icon}
              className="h-6 w-6"
              style={{ color: accent }}
              fallback={<FileText className="h-6 w-6" style={{ color: accent }} />}
            />
          </div>
          <span
            className="rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors duration-300"
            style={{ color: accent, borderColor: accentRing, backgroundColor: accentSoft }}
          >
            {category}
          </span>
        </div>

        <h3 className="relative mb-2 line-clamp-1 text-base font-semibold text-foreground">{name}</h3>
        <p className="relative mb-6 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">{description}</p>

        <div className="relative flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 transition-all duration-300 group-hover:gap-2.5 group-hover:text-foreground">
            Usar agora
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
          <div
            className="h-1 w-8 rounded-full opacity-50 transition-all duration-500 ease-out group-hover:w-14 group-hover:opacity-100"
            style={{ background: `linear-gradient(90deg, ${accentSoft}, ${accent})` }}
          />
        </div>
      </article>
    </Link>
  );
};
