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

export const ToolCard = ({ name, description, categorySlug, toolSlug, icon }: ToolCardProps) => {
  const categoryColor = `hsl(${categoryVar[categorySlug] ?? "var(--category-pdf)"})`;

  return (
    <Link href={`/ferramentas/${categorySlug}/${toolSlug}`} className="group block">
      <div className="tool-card bg-card hover:shadow-xl">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-110"
          style={{ backgroundColor: categoryColor }}
        >
          <DynamicIcon
            name={icon as IconName}
            className="h-7 w-7 text-primary-foreground"
            fallback={() => <FileText className="h-7 w-7 text-primary-foreground" />}
          />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-1">{name}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </Link>
  );
};
