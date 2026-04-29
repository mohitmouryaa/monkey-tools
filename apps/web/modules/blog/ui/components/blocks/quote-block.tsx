interface QuoteBlockData {
  text?: string;
  caption?: string;
  alignment?: "left" | "center";
}

export const QuoteBlock = ({ data }: { data: QuoteBlockData }) => {
  const text = data.text ?? "";
  const caption = data.caption ?? "";
  return (
    <blockquote>
      <p
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Editor.js inline tools sanitiza no admin
        dangerouslySetInnerHTML={{ __html: text }}
      />
      {caption && (
        <cite
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Editor.js inline tools sanitiza no admin
          dangerouslySetInnerHTML={{ __html: caption }}
        />
      )}
    </blockquote>
  );
};
