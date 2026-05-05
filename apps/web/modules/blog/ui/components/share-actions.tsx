"use client";

import { useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";

interface ShareActionsProps {
  url: string;
  title: string;
  variant: "inline" | "compact";
}

export const ShareActions = ({ url, title, variant }: ShareActionsProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  };

  const handleNative = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        /* user cancelled */
      }
    } else {
      handleCopy();
    }
  };

  if (variant === "compact") {
    return (
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copiar link"
        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
      </button>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border bg-background px-3 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
      >
        {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
        {copied ? "Copiado!" : "Copiar link"}
      </button>
      <button
        type="button"
        onClick={handleNative}
        className="inline-flex h-9 items-center gap-1.5 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 sm:hidden"
      >
        <Share2 className="h-4 w-4" />
        Compartilhar
      </button>
    </>
  );
};
