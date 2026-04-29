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
  headingIdsByIndex?: Map<number, string>;
}

export const PostContentRenderer = ({ content, tools, headingIdsByIndex }: PostContentRendererProps) => {
  const blocks = (content as OutputData).blocks ?? [];
  const firstParagraphIdx = blocks.findIndex((b) => b.type === "paragraph");

  return (
    <div
      className={[
        "article-body text-foreground text-[17px] md:text-lg leading-[1.75]",
        "[&_a]:text-primary [&_a]:underline [&_a]:decoration-primary/30 [&_a]:underline-offset-[3px] [&_a]:transition-colors",
        "hover:[&_a]:decoration-primary",
        "[&_strong]:font-semibold [&_strong]:text-foreground",
        "[&_em]:italic",
        "[&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.9em] [&_code]:text-foreground",
        "[&_mark]:rounded [&_mark]:bg-amber-200/40 dark:[&_mark]:bg-amber-300/20 [&_mark]:px-1 [&_mark]:py-0.5",
      ].join(" ")}
    >
      {blocks.map((block, idx) => {
        const key = block.id ?? `b-${idx}`;
        switch (block.type) {
          case "header":
            return <HeaderBlock key={key} data={block.data as never} id={headingIdsByIndex?.get(idx)} />;
          case "paragraph":
            return <ParagraphBlock key={key} data={block.data as never} isLead={idx === firstParagraphIdx} />;
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
