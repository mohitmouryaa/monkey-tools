"use client";

import { useState } from "react";
import { ToolCard } from "@/modules/common/ui/components/tool-card";

interface Tool {
  _id: string;
  title: string;
  description: string;
  link: string;
  icon: string;
  iconColor: string;
  bgColor: string;
  category: {
    _id: string;
    name: string;
    slug: string;
  };
}

interface ToolsByCategory {
  category: {
    _id: string;
    name: string;
    slug: string;
  };
  tools: Tool[];
}

interface NewToolsGridProps {
  toolsByCategory: ToolsByCategory[];
}

export const NewToolsGrid = ({ toolsByCategory }: NewToolsGridProps) => {
  const [activeSlug, setActiveSlug] = useState<string>("all");

  const allTools = toolsByCategory.flatMap(({ category, tools }) => tools.map((tool) => ({ ...tool, category })));

  const visibleTools = activeSlug === "all" ? allTools : allTools.filter((t) => t.category.slug === activeSlug);

  return (
    <section className="container max-w-7xl mx-auto px-4 sm:px-6 pb-16 md:pb-20" id="ferramentas">
      <div className="flex flex-wrap items-center justify-center gap-3 mb-8 md:mb-10">
        <button
          type="button"
          onClick={() => setActiveSlug("all")}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
            activeSlug === "all" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70"
          }`}
        >
          Todas
        </button>
        {toolsByCategory.map(({ category }) => (
          <button
            type="button"
            key={category._id}
            onClick={() => setActiveSlug(category.slug)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              activeSlug === category.slug
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/70"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
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
    </section>
  );
};
