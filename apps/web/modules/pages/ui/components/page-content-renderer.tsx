import type { OutputData } from "@editorjs/editorjs";
import { ChecklistBlock } from "@/modules/blog/ui/components/blocks/checklist-block";
import { EmbedBlock } from "@/modules/blog/ui/components/blocks/embed-block";
import { HeaderBlock } from "@/modules/blog/ui/components/blocks/header-block";
import { ImageBlock } from "@/modules/blog/ui/components/blocks/image-block";
import { ListBlock } from "@/modules/blog/ui/components/blocks/list-block";
import { ParagraphBlock } from "@/modules/blog/ui/components/blocks/paragraph-block";
import { QuoteBlock } from "@/modules/blog/ui/components/blocks/quote-block";
import { TableBlock } from "@/modules/blog/ui/components/blocks/table-block";
import { CardsBlock } from "@/modules/pages/ui/components/blocks/cards-block";
import { CtaBlock } from "@/modules/pages/ui/components/blocks/cta-block";
import { FaqBlock } from "@/modules/pages/ui/components/blocks/faq-block";
import { HeroBlock } from "@/modules/pages/ui/components/blocks/hero-block";
import { RawHtmlBlock } from "@/modules/pages/ui/components/blocks/raw-html-block";
import { StepsBlock } from "@/modules/pages/ui/components/blocks/steps-block";

interface PageContentRendererProps {
  content: OutputData | { blocks?: Array<{ id?: string; type: string; data: unknown }> };
}

type Block = { id?: string; type: string; data: unknown };

// Blocos "seção" trazem container/full-bleed próprio. Não receber wrapper externo.
const SECTION_TYPES = new Set(["hero", "steps", "cards", "faq", "cta", "raw-html"]);

const renderBlock = (block: Block, key: string) => {
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
    case "hero":
      return <HeroBlock key={key} data={block.data as never} />;
    case "steps":
      return <StepsBlock key={key} data={block.data as never} />;
    case "cards":
      return <CardsBlock key={key} data={block.data as never} />;
    case "faq":
      return <FaqBlock key={key} data={block.data as never} />;
    case "cta":
      return <CtaBlock key={key} data={block.data as never} />;
    case "raw-html":
      return <RawHtmlBlock key={key} data={block.data as never} />;
    default:
      return null;
  }
};

const proseClasses = [
  "text-foreground text-base md:text-lg leading-[1.75]",
  "[&_a]:text-primary [&_a]:underline [&_a]:decoration-primary/30 [&_a]:underline-offset-[3px] [&_a]:transition-colors",
  "hover:[&_a]:decoration-primary",
  "[&_strong]:font-semibold [&_strong]:text-foreground",
  "[&_em]:italic",
  "[&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.9em] [&_code]:text-foreground",
  "[&_mark]:rounded [&_mark]:bg-amber-200/40 dark:[&_mark]:bg-amber-300/20 [&_mark]:px-1 [&_mark]:py-0.5",
].join(" ");

// TODO(post-migration): remover branch `typeof content === "string"` em [slug]/page.tsx
// apos confirmar que migrate:pages rodou em prod.
export const PageContentRenderer = ({ content }: PageContentRendererProps) => {
  const blocks = ((content as OutputData).blocks ?? []) as Block[];

  // Agrupa blocos consecutivos: "seção" (full-bleed) vs "prose" (centralizado max-w-3xl).
  const groups: Array<{ kind: "section" | "prose"; items: Array<{ block: Block; key: string }> }> = [];
  blocks.forEach((block, idx) => {
    const key = block.id ?? `b-${idx}`;
    const kind = SECTION_TYPES.has(block.type) ? "section" : "prose";
    const last = groups[groups.length - 1];
    if (last && last.kind === kind) {
      last.items.push({ block, key });
    } else {
      groups.push({ kind, items: [{ block, key }] });
    }
  });

  return (
    <>
      {groups.map((group, gIdx) => {
        if (group.kind === "section") {
          return (
            // biome-ignore lint/suspicious/noArrayIndexKey: ordem dos grupos é estável
            <div key={`g-${gIdx}`}>{group.items.map(({ block, key }) => renderBlock(block, key))}</div>
          );
        }
        return (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: ordem dos grupos é estável
            key={`g-${gIdx}`}
            className="container mx-auto px-4 py-10 md:py-14"
          >
            <div className={`max-w-3xl mx-auto ${proseClasses}`}>
              {group.items.map(({ block, key }) => renderBlock(block, key))}
            </div>
          </div>
        );
      })}
    </>
  );
};
