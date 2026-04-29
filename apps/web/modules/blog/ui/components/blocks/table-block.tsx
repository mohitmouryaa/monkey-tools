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
    <div className="overflow-x-auto my-6">
      <table className="w-full">
        {headRow && (
          <thead>
            <tr>
              {headRow.map((cell, i) => (
                <th
                  // biome-ignore lint/suspicious/noArrayIndexKey: blocos do Editor.js são estáticos, ordem não muda
                  key={i}
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: cells contém HTML inline do Editor.js
                  dangerouslySetInnerHTML={{ __html: cell }}
                />
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {bodyRows.map((row, ri) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: blocos do Editor.js são estáticos, ordem não muda
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td
                  // biome-ignore lint/suspicious/noArrayIndexKey: blocos do Editor.js são estáticos, ordem não muda
                  key={ci}
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: cells contém HTML inline do Editor.js
                  dangerouslySetInnerHTML={{ __html: cell }}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
