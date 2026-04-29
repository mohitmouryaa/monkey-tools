import type React from "react";

interface ListItem {
  content?: string;
  items?: ListItem[];
  meta?: { checked?: boolean };
}

interface ListBlockData {
  style?: "ordered" | "unordered" | "checklist";
  items?: ListItem[];
}

const renderItems = (items: ListItem[], style: ListBlockData["style"]): React.ReactNode => {
  return items.map((item, idx) => {
    if (style === "ordered") {
      const number = String(idx + 1).padStart(2, "0");
      return (
        // biome-ignore lint/suspicious/noArrayIndexKey: blocos do Editor.js são estáticos, ordem não muda
        <li key={idx} className="relative pl-12 leading-[1.7] text-foreground/90">
          <span
            aria-hidden
            className="absolute left-0 top-0 inline-flex h-7 w-9 items-center justify-center rounded-full bg-primary/10 text-[12px] font-bold tracking-wider text-primary"
          >
            {number}
          </span>
          <span
            // biome-ignore lint/security/noDangerouslySetInnerHtml: Editor.js inline tools sanitiza no admin
            dangerouslySetInnerHTML={{ __html: item.content ?? "" }}
          />
          {item.items && item.items.length > 0 ? (
            <ol className="mt-2 ml-1 space-y-2">{renderItems(item.items, style)}</ol>
          ) : null}
        </li>
      );
    }
    return (
      // biome-ignore lint/suspicious/noArrayIndexKey: blocos do Editor.js são estáticos, ordem não muda
      <li
        key={idx}
        className="relative pl-7 leading-[1.7] text-foreground/90 before:content-[''] before:absolute before:left-1.5 before:top-[0.85em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-primary"
      >
        <span
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Editor.js inline tools sanitiza no admin
          dangerouslySetInnerHTML={{ __html: item.content ?? "" }}
        />
        {item.items && item.items.length > 0 ? (
          <ul className="mt-2 ml-1 space-y-2">{renderItems(item.items, style)}</ul>
        ) : null}
      </li>
    );
  });
};

export const ListBlock = ({ data }: { data: ListBlockData }) => {
  const items = data.items ?? [];
  if (items.length === 0) return null;

  if (data.style === "ordered") {
    return <ol className="my-6 space-y-3">{renderItems(items, "ordered")}</ol>;
  }
  return <ul className="my-6 space-y-3">{renderItems(items, data.style)}</ul>;
};
