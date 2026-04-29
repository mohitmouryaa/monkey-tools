interface ParagraphBlockData {
  text?: string;
}

interface ParagraphBlockProps {
  data: ParagraphBlockData;
  isLead?: boolean;
}

export const ParagraphBlock = ({ data, isLead = false }: ParagraphBlockProps) => {
  const text = data.text ?? "";
  const className = isLead
    ? "first-of-type:mt-0 my-6 text-lg md:text-xl text-foreground leading-[1.7] font-medium"
    : "my-5 text-foreground/90 leading-[1.75]";
  return (
    <p
      className={className}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Editor.js inline tools produzem HTML sanitizado no admin
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
};
