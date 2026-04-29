import type { OutputData } from "@editorjs/editorjs";
import { HeaderBlock } from "@/modules/blog/ui/components/blocks/header-block";
import { ParagraphBlock } from "@/modules/blog/ui/components/blocks/paragraph-block";
import { ListBlock } from "@/modules/blog/ui/components/blocks/list-block";
import { QuoteBlock } from "@/modules/blog/ui/components/blocks/quote-block";
import { EmbedBlock } from "@/modules/blog/ui/components/blocks/embed-block";
import { TableBlock } from "@/modules/blog/ui/components/blocks/table-block";
import { ChecklistBlock } from "@/modules/blog/ui/components/blocks/checklist-block";
import { ImageBlock } from "@/modules/blog/ui/components/blocks/image-block";
import { ToolEmbedBlockRenderer } from "@/modules/blog/ui/components/blocks/tool-embed-block-renderer";

interface PostContentRendererProps {
  content: OutputData | { blocks?: Array<{ id?: string; type: string; data: unknown }> };
  tools: Array<{ _id: string; title: string; link: string }>;
}

export const PostContentRenderer = ({ content, tools }: PostContentRendererProps) => {
  const blocks = (content as OutputData).blocks ?? [];

  return (
    <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground prose-ul:text-muted-foreground prose-ol:text-muted-foreground">
      {blocks.map((block, idx) => {
        const key = block.id ?? `b-${idx}`;
        switch (block.type) {
          case "header":
            return <HeaderBlock key={key} data={block.data as never} />;
          case "paragraph":
            return <ParagraphBlock key={key} data={block.data as never} />;
          case "list":
            return <ListBlock key={key} data={block.data as never} />;
          case "quote":
            return <QuoteBlock key={key} data={block.data as never} />;
          case "embed":
            return <EmbedBlock key={key} data={block.data as never} />;
          case "table":
            return <TableBlock key={key} data={block.data as never} />;
          case "checklist":
            return <ChecklistBlock key={key} data={block.data as never} />;
          case "image":
            return <ImageBlock key={key} data={block.data as never} />;
          case "toolEmbed":
            return <ToolEmbedBlockRenderer key={key} data={block.data as never} tools={tools} />;
          default:
            return null;
        }
      })}
    </div>
  );
};
