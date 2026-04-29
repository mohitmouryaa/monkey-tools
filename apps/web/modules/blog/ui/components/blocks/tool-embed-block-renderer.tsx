import { Suspense } from "react";
import { ToolLoading } from "@/modules/common/ui/components/tool-loading";
import { PDFLibProvider } from "@/modules/common/providers/pdf-lib-provider";

interface ToolReference {
  _id: string;
  title: string;
  link: string;
}

interface ToolEmbedBlockData {
  toolId?: string;
}

interface ToolEmbedBlockRendererProps {
  data: ToolEmbedBlockData;
  tools: ToolReference[];
}

export const ToolEmbedBlockRenderer = async ({ data, tools }: ToolEmbedBlockRendererProps) => {
  if (!data.toolId) return null;

  const tool = tools.find((t) => t._id === data.toolId);
  if (!tool) return null;

  const componentSlug = tool.link.startsWith("/") ? tool.link.slice(1) : tool.link;

  let ToolComponent: React.ComponentType;
  try {
    const mod = await import(`@/modules/tools/ui/components/${componentSlug}`);
    ToolComponent = mod.default;
  } catch {
    return null;
  }

  return (
    <div className="my-8 p-6 border rounded-xl bg-card border-border">
      <div className="mb-4">
        <p className="text-xs font-medium tracking-wide uppercase text-muted-foreground">Experimente agora</p>
        <h3 className="text-lg font-semibold text-foreground">{tool.title}</h3>
      </div>
      <Suspense fallback={<ToolLoading />}>
        <PDFLibProvider>
          <ToolComponent />
        </PDFLibProvider>
      </Suspense>
    </div>
  );
};
