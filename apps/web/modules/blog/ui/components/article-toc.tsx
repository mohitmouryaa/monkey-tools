import type { TocEntry } from "@/modules/blog/lib/article";

interface ArticleTocProps {
  entries: TocEntry[];
}

export const ArticleToc = ({ entries }: ArticleTocProps) => {
  if (entries.length < 2) return null;

  return (
    <nav
      aria-label="Neste artigo"
      className="not-prose mb-10 rounded-2xl border border-border bg-card/70 p-5 shadow-sm"
    >
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Neste artigo</p>
      <ol className="space-y-2 text-sm">
        {entries.map((entry, idx) => (
          <li key={entry.id} className={entry.level >= 3 ? "pl-4" : ""}>
            <a
              href={`#${entry.id}`}
              className="group flex items-baseline gap-3 text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="w-5 shrink-0 text-right font-mono text-xs text-muted-foreground/60 group-hover:text-primary">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span className="leading-snug">{entry.text}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};
