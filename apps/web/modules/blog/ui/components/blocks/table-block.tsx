interface TableBlockData {
  withHeadings?: boolean;
  content?: string[][];
}

export const TableBlock = ({ data }: { data: TableBlockData }) => {
  const rows = data.content ?? [];
  if (rows.length === 0) return null;

  const headRow = data.withHeadings ? rows[0] : null;
  const bodyRows = data.withHeadings ? rows.slice(1) : rows;

  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm md:text-[15px]">
          {headRow && (
            <thead className="bg-muted/50">
              <tr>
                {headRow.map((cell, i) => (
                  <th
                    // biome-ignore lint/suspicious/noArrayIndexKey: blocos do Editor.js são estáticos, ordem não muda
                    key={i}
                    scope="col"
                    className="border-b border-border px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground first:pl-5 last:pr-5"
                    // biome-ignore lint/security/noDangerouslySetInnerHtml: cells contém HTML inline do Editor.js
                    dangerouslySetInnerHTML={{ __html: cell }}
                  />
                ))}
              </tr>
            </thead>
          )}
          <tbody className="divide-y divide-border [&_tr:hover]:bg-muted/30">
            {bodyRows.map((row, ri) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: blocos do Editor.js são estáticos, ordem não muda
              <tr key={ri} className="transition-colors">
                {row.map((cell, ci) => (
                  <td
                    // biome-ignore lint/suspicious/noArrayIndexKey: blocos do Editor.js são estáticos, ordem não muda
                    key={ci}
                    className="px-4 py-3 align-top text-foreground/90 tabular-nums first:pl-5 first:font-medium first:text-foreground last:pr-5"
                    // biome-ignore lint/security/noDangerouslySetInnerHtml: cells contém HTML inline do Editor.js
                    dangerouslySetInnerHTML={{ __html: cell }}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
