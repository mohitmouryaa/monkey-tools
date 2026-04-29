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
    <ul className="not-prose my-6 space-y-2 list-none pl-0">
      {items.map((item, idx) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: blocos do Editor.js são estáticos, ordem não muda
        <li key={idx} className="flex items-start gap-2">
          <input
            type="checkbox"
            checked={!!item.checked}
            disabled
            className="mt-1 size-4 rounded border-border accent-primary"
            aria-label={item.text}
            readOnly
          />
          <span
            className="text-foreground"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: Editor.js inline tools sanitiza no admin
            dangerouslySetInnerHTML={{ __html: item.text ?? "" }}
          />
        </li>
      ))}
    </ul>
  );
};
