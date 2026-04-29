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
    <figure className="my-6">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted">
        <iframe
          src={data.embed}
          title={data.caption || data.service || "Embedded content"}
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
          className="mt-2 text-sm text-center text-muted-foreground"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: caption do Editor.js
          dangerouslySetInnerHTML={{ __html: data.caption }}
        />
      )}
    </figure>
  );
};
