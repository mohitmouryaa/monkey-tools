    "use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import { ToolCard } from "@/modules/common/ui/components/tool-card";

interface Tool {
  _id: string;
  title: string;
  description: string;
  link: string;
  category: {
    _id: string;
    name: string;
    slug: string;
  } | string;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
}

interface AllToolsClientProps {
  tools: Tool[];
  categories: Category[];
}

export function AllToolsClient({ tools, categories }: AllToolsClientProps) {
  // Group tools by category
  const getToolsByCategory = (categoryId?: string) => {
    if (!categoryId) return tools;
    return tools.filter(tool => typeof tool.category === 'object' && tool.category?._id === categoryId);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            All Tools
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our complete collection of free online tools for PDF, images, text and conversions.
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full flex flex-wrap justify-center gap-1 h-auto p-2 bg-muted/50 mb-8">
            <TabsTrigger 
              value="all"
              className="px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-secondary/80"
            >
              All
            </TabsTrigger>
            {categories.map((cat) => (
              <TabsTrigger 
                key={cat._id} 
                value={cat._id}
                className="px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-secondary/80"
              >
                {cat.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {tools.map((tool) => (
                <ToolCard
                  key={tool._id}
                  name={tool.title}
                  description={tool.description}
                  category={typeof tool.category === 'object' ? tool.category?.name || 'Tools' : 'Tools'}
                  categorySlug={typeof tool.category === 'object' ? tool.category?.slug || 'tools' : 'tools'}
                  toolSlug={tool.link}
                />
              ))}
            </div>
          </TabsContent>

          {categories.map((cat) => (
            <TabsContent key={cat._id} value={cat._id}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {getToolsByCategory(cat._id).map((tool) => (
                  <ToolCard
                    key={tool._id}
                    name={tool.title}
                    description={tool.description}
                    category={cat.name}
                    categorySlug={cat.slug}
                    toolSlug={tool.link}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
}
