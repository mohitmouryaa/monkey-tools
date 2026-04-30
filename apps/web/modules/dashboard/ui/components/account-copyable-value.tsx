"use client";

import { useState } from "react";
import { CheckCircle2, Copy } from "lucide-react";

export const AccountCopyableValue = ({ value, mono }: { value: string; mono?: boolean }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center justify-between w-full gap-2 px-2 py-1.5 -mx-2 rounded-md transition-colors hover:bg-muted ${
        mono ? "font-mono text-xs" : "text-sm"
      }`}
      title="Copiar"
    >
      <span className="truncate">{value}</span>
      {copied ? (
        <CheckCircle2 className="size-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
      ) : (
        <Copy className="size-3.5 text-muted-foreground shrink-0" />
      )}
    </button>
  );
};
