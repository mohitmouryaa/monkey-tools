"use client";

import Link from "next/link";
import { FileText } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";

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

export const ToolCard = ({ name, description, categorySlug, toolSlug, icon, iconColor, bgColor }: ToolCardProps) => {
  const fallback = `hsl(${categoryVar[categorySlug] ?? "var(--category-pdf)"})`;
  const accent = iconColor || bgColor || fallback;

  return (
    <Link href={`/ferramentas/${categorySlug}/${toolSlug}`} className="group block">
      <div
        className="rounded-2xl overflow-hidden transition-all duration-200 group-hover:shadow-lg group-hover:-translate-y-0.5"
        style={{ backgroundColor: `color-mix(in srgb, ${accent} 12%, white)` }}
      >
        <div className="p-6 flex flex-col items-center text-center">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-110"
            style={{ backgroundColor: accent }}
          >
            <DynamicIcon
              name={icon as IconName}
              className="w-6 h-6 text-white"
              fallback={() => <FileText className="w-6 h-6 text-white" />}
            />
          </div>
          <h3 className="text-base font-semibold text-foreground mb-1.5 leading-tight">{name}</h3>
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{description}</p>
        </div>
        <div className="bg-background/60 px-6 py-3 text-center">
          <p className="text-xs text-primary font-medium line-clamp-2 leading-relaxed">{description}</p>
        </div>
      </div>
    </Link>
  );
};
