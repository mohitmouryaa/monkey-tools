"use client";

import { useState } from "react";
import { ToolCard } from "@/modules/common/ui/components/tool-card";

interface FilterTool {
  _id: string;
  title: string;
  description: string;
  link: string;
  icon: string;
  iconColor?: string;
  bgColor?: string;
  category: {
    _id: string;
    name: string;
    slug: string;
  };
}

interface FilterCategory {
  _id: string;
  name: string;
  slug: string;
}

interface ToolsFilterGridProps {
  tools: FilterTool[];
  categories: FilterCategory[];
  showAllOption?: boolean;
}

export const ToolsFilterGrid = ({ tools, categories, showAllOption = true }: ToolsFilterGridProps) => {
  const [activeSlug, setActiveSlug] = useState<string>(showAllOption ? "all" : (categories[0]?.slug ?? "all"));

  const visibleTools = activeSlug === "all" ? tools : tools.filter((t) => t.category.slug === activeSlug);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-3 mb-8 md:mb-10">
        {showAllOption && (
          <button
            type="button"
            onClick={() => setActiveSlug("all")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              activeSlug === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/70"
            }`}
          >
            Todas
          </button>
        )}
        {categories.map((cat) => (
          <button
            type="button"
            key={cat._id}
            onClick={() => setActiveSlug(cat.slug)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              activeSlug === cat.slug
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/70"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visibleTools.map((tool) => (
          <ToolCard
            key={tool._id}
            name={tool.title}
            description={tool.description}
            category={tool.category.name}
            categorySlug={tool.category.slug}
            toolSlug={tool.link}
            icon={tool.icon}
            iconColor={tool.iconColor}
            bgColor={tool.bgColor}
          />
        ))}
      </div>
    </div>
  );
};
