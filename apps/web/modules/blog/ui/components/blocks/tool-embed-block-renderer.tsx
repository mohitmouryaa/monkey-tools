import { Suspense } from "react";
import { ToolLoading } from "@/modules/common/ui/components/tool-loading";
import { PDFLibProvider } from "@/modules/common/providers/pdf-lib-provider";
import { TOOL_EMBED_REGISTRY } from "@/modules/blog/lib/tool-embed-registry";

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

  const loader = TOOL_EMBED_REGISTRY[componentSlug];
  if (!loader) return null;

  let ToolComponent: React.ComponentType;
  try {
    const mod = await loader();
    ToolComponent = mod.default;
  } catch {
    return null;
  }

  return (
    <div className="my-10 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="border-b border-border bg-muted/30 px-6 py-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Experimente agora</p>
        <h3 className="mt-1 text-lg md:text-xl font-semibold tracking-tight text-foreground">{tool.title}</h3>
      </div>
      <div className="p-6">
        <Suspense fallback={<ToolLoading />}>
          <PDFLibProvider>
            <ToolComponent />
          </PDFLibProvider>
        </Suspense>
      </div>
    </div>
  );
};
