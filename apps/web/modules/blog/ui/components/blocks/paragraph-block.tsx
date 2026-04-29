interface ParagraphBlockData {
  text?: string;
}

export const ParagraphBlock = ({ data }: { data: ParagraphBlockData }) => {
  const text = data.text ?? "";
  return (
    <p
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Editor.js inline tools produzem HTML sanitizado no admin
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
};
