import { Quote as QuoteIcon } from "lucide-react";

interface QuoteBlockData {
  text?: string;
  caption?: string;
  alignment?: "left" | "center";
}

export const QuoteBlock = ({ data }: { data: QuoteBlockData }) => {
  const text = data.text ?? "";
  const caption = data.caption ?? "";
  const isCenter = data.alignment === "center";

  return (
    <figure
      className={`relative my-10 border-l-4 border-primary bg-muted/40 dark:bg-muted/30 px-6 py-6 md:px-10 md:py-8 ${
        isCenter ? "text-center" : ""
      }`}
    >
      <QuoteIcon
        aria-hidden
        className={`mb-3 h-6 w-6 text-primary ${isCenter ? "mx-auto" : ""}`}
      />
      <blockquote className="text-xl md:text-2xl font-medium text-foreground leading-[1.45]">
        <p
          className="m-0"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Editor.js inline tools sanitiza no admin
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </blockquote>
      {caption && (
        <figcaption
          className={`mt-4 text-sm font-medium text-muted-foreground before:mr-1 before:content-['—'] ${
            isCenter ? "text-center" : ""
          }`}
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Editor.js inline tools sanitiza no admin
          dangerouslySetInnerHTML={{ __html: caption }}
        />
      )}
    </figure>
  );
};
