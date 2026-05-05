interface EmbedBlockData {
  service?: string;
  source?: string;
  embed?: string;
  width?: number;
  height?: number;
  caption?: string;
}

export const EmbedBlock = ({ data }: { data: EmbedBlockData }) => {
  if (!data.embed) return null;

  return (
    <figure className="my-10">
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-muted ring-1 ring-border shadow-sm">
        <iframe
          src={data.embed}
          title={data.caption || data.service || "Conteúdo incorporado"}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          sandbox="allow-scripts allow-same-origin allow-popups allow-presentation"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      {data.caption && (
        <figcaption
          className="mt-3 text-center text-sm text-muted-foreground italic"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: caption do Editor.js
          dangerouslySetInnerHTML={{ __html: data.caption }}
        />
      )}
    </figure>
  );
};
