import { Facebook, Linkedin, Mail } from "lucide-react";
import { ShareActions } from "@/modules/blog/ui/components/share-actions";

interface ShareBarProps {
  url: string;
  title: string;
  variant?: "inline" | "compact";
}

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const WhatsappIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
    <path d="M19.05 4.91A9.92 9.92 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.27-1.38a9.9 9.9 0 0 0 4.76 1.21h.01c5.46 0 9.91-4.45 9.91-9.92 0-2.65-1.03-5.14-2.9-7.0zm-7.01 15.27h-.01a8.21 8.21 0 0 1-4.18-1.14l-.3-.18-3.13.82.83-3.05-.2-.31a8.18 8.18 0 0 1-1.25-4.41c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.83 2.42a8.16 8.16 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24zm4.52-6.16c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.45-1.37-1.69-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.49-.41-.42-.56-.43-.14-.01-.31-.01-.48-.01-.16 0-.43.06-.66.31-.23.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.55.12.16 1.74 2.66 4.21 3.73.59.25 1.05.4 1.41.51.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.66-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.18-.47-.3z" />
  </svg>
);

const enc = (s: string) => encodeURIComponent(s);

const buildLinks = (url: string, title: string) => [
  { label: "X", href: `https://x.com/intent/post?text=${enc(title)}&url=${enc(url)}`, Icon: XIcon },
  { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`, Icon: Facebook },
  { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`, Icon: Linkedin },
  { label: "WhatsApp", href: `https://wa.me/?text=${enc(`${title} — ${url}`)}`, Icon: WhatsappIcon },
  { label: "E-mail", href: `mailto:?subject=${enc(title)}&body=${enc(`${title}\n\n${url}`)}`, Icon: Mail },
];

export const ShareBar = ({ url, title, variant = "inline" }: ShareBarProps) => {
  const links = buildLinks(url, title);

  if (variant === "compact") {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Compartilhar</span>
        <div className="flex items-center gap-1">
          {links.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Compartilhar no ${label}`}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
          <ShareActions url={url} title={title} variant="compact" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-semibold text-foreground">Gostou do artigo?</p>
        <p className="text-sm text-muted-foreground">Compartilhe com quem pode achar útil.</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {links.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Compartilhar no ${label}`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Icon className="h-4 w-4" />
          </a>
        ))}
        <ShareActions url={url} title={title} variant="inline" />
      </div>
    </div>
  );
};
