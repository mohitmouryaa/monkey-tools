interface ContentBlock {
  type: string;
  data: unknown;
}

interface ContentLike {
  blocks?: ContentBlock[];
}

const WORDS_PER_MINUTE = 220;

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ");
}

function extractText(block: ContentBlock): string {
  const data = block.data as Record<string, unknown> | null | undefined;
  if (!data) return "";

  switch (block.type) {
    case "header":
    case "paragraph":
    case "quote":
      return stripHtml(String(data.text ?? ""));
    case "list": {
      const items = (data.items ?? []) as Array<string | { content?: string }>;
      return items.map((i) => stripHtml(typeof i === "string" ? i : (i.content ?? ""))).join(" ");
    }
    case "checklist": {
      const items = (data.items ?? []) as Array<{ text?: string }>;
      return items.map((i) => stripHtml(i.text ?? "")).join(" ");
    }
    case "table": {
      const content = (data.content ?? []) as string[][];
      return content.flat().map(stripHtml).join(" ");
    }
    default:
      return "";
  }
}

export function estimateReadingMinutes(content: ContentLike): number {
  const blocks = content?.blocks ?? [];
  const text = blocks.map(extractText).join(" ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export function slugifyHeading(text: string): string {
  return stripHtml(text)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export interface TocEntry {
  id: string;
  text: string;
  level: number;
}

export interface HeadingPlan {
  toc: TocEntry[];
  idsByBlockIndex: Map<number, string>;
}

export function buildHeadingPlan(content: ContentLike): HeadingPlan {
  const blocks = content?.blocks ?? [];
  const counts = new Map<string, number>();
  const idsByBlockIndex = new Map<number, string>();
  const toc: TocEntry[] = [];

  blocks.forEach((b, idx) => {
    if (b.type !== "header") return;
    const data = b.data as { text?: string; level?: number } | null;
    const rawText = String(data?.text ?? "");
    const text = stripHtml(rawText).trim();
    const level = data?.level ?? 2;
    if (!text) return;

    const baseId = slugifyHeading(text) || "secao";
    const seen = counts.get(baseId) ?? 0;
    counts.set(baseId, seen + 1);
    const id = seen === 0 ? baseId : `${baseId}-${seen + 1}`;

    idsByBlockIndex.set(idx, id);
    if (level <= 3) toc.push({ id, text, level });
  });

  return { toc, idsByBlockIndex };
}
