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
  const allTools = toolsByCategory.flatMap(({ category, tools }) =>
    tools.map((tool) => ({
      ...tool,
      category,
    })),
  );

  return (
    <section className="container max-w-4xl mx-auto px-4 pb-20" id="ferramentas">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {allTools.slice(0, 5).map((tool) => (
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
