import { slugifyHeading } from "@/modules/blog/lib/article";

interface HeaderBlockData {
  text?: string;
  level?: number;
}

interface HeaderBlockProps {
  data: HeaderBlockData;
  id?: string;
}

const STYLES: Record<number, string> = {
  1: "mt-12 mb-6 text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-[1.15]",
  2: "mt-14 md:mt-16 mb-5 text-2xl md:text-[1.75rem] font-bold tracking-tight text-foreground leading-[1.2]",
  3: "mt-10 md:mt-12 mb-4 text-xl md:text-2xl font-semibold tracking-tight text-foreground leading-snug",
  4: "mt-8 mb-3 text-lg md:text-xl font-semibold tracking-tight text-foreground leading-snug",
  5: "mt-6 mb-2 text-base font-semibold tracking-tight text-foreground",
  6: "mt-6 mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground",
};

export const HeaderBlock = ({ data, id: providedId }: HeaderBlockProps) => {
  const level = Math.min(Math.max(data.level ?? 2, 1), 6);
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  const text = data.text ?? "";
  const id = providedId ?? (level <= 3 ? slugifyHeading(text) || undefined : undefined);
  const className = `${STYLES[level]}${id ? " group scroll-mt-24" : ""}`;

  return (
    <Tag id={id} className={className}>
      <span
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Editor.js inline tools sanitiza no admin
        dangerouslySetInnerHTML={{ __html: text }}
      />
      {id && (
        <a
          href={`#${id}`}
          aria-label="Link para esta seção"
          className="ml-2 inline-block text-[0.7em] font-normal text-muted-foreground/50 no-underline opacity-0 transition-opacity hover:text-primary group-hover:opacity-100"
        >
          #
        </a>
      )}
    </Tag>
  );
};
