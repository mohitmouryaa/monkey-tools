interface HeaderBlockData {
  text?: string;
  level?: number;
}

export const HeaderBlock = ({ data }: { data: HeaderBlockData }) => {
  const level = Math.min(Math.max(data.level ?? 2, 1), 6);
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  const text = data.text ?? "";
  return (
    <Tag
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Editor.js inline tools (bold, italic, link) já produzem HTML sanitizado pelo próprio EditorJS no admin
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
};
