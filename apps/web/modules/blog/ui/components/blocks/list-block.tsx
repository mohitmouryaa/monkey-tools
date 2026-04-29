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
  return items.map((item, idx) => (
    // biome-ignore lint/suspicious/noArrayIndexKey: blocos do Editor.js são estáticos, ordem não muda
    <li key={idx}>
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: Editor.js inline tools sanitiza no admin */}
      <span dangerouslySetInnerHTML={{ __html: item.content ?? "" }} />
      {item.items && item.items.length > 0 ? (
        style === "ordered" ? (
          <ol>{renderItems(item.items, style)}</ol>
        ) : (
          <ul>{renderItems(item.items, style)}</ul>
        )
      ) : null}
    </li>
  ));
};

export const ListBlock = ({ data }: { data: ListBlockData }) => {
  const items = data.items ?? [];
  if (items.length === 0) return null;

  if (data.style === "ordered") {
    return <ol>{renderItems(items, "ordered")}</ol>;
  }
  return <ul>{renderItems(items, data.style)}</ul>;
};
