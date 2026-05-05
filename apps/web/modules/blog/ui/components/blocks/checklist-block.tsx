import { Check } from "lucide-react";

interface ChecklistItem {
  text?: string;
  checked?: boolean;
}

interface ChecklistBlockData {
  items?: ChecklistItem[];
}

export const ChecklistBlock = ({ data }: { data: ChecklistBlockData }) => {
  const items = data.items ?? [];
  if (items.length === 0) return null;

  return (
    <ul className="my-8 space-y-3 list-none pl-0 rounded-2xl border border-border bg-card/50 p-5 md:p-6">
      {items.map((item, idx) => {
        const checked = !!item.checked;
        return (
          // biome-ignore lint/suspicious/noArrayIndexKey: blocos do Editor.js são estáticos, ordem não muda
          <li key={idx} className="flex items-start gap-3 leading-[1.6]">
            <span
              aria-hidden
              className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                checked ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background"
              }`}
            >
              {checked && <Check className="h-3 w-3" strokeWidth={3} />}
            </span>
            <span
              className={checked ? "text-muted-foreground line-through decoration-muted-foreground/40" : "text-foreground/90"}
              // biome-ignore lint/security/noDangerouslySetInnerHtml: Editor.js inline tools sanitiza no admin
              dangerouslySetInnerHTML={{ __html: item.text ?? "" }}
            />
          </li>
        );
      })}
    </ul>
  );
};
