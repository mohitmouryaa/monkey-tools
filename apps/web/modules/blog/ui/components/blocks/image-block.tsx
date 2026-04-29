import Image from "next/image";

interface ImageBlockData {
  file?: { url?: string };
  caption?: string;
  withBorder?: boolean;
  withBackground?: boolean;
  stretched?: boolean;
}

export const ImageBlock = ({ data }: { data: ImageBlockData }) => {
  const url = data.file?.url;
  if (!url) return null;

  const containerClass = [
    "relative w-full overflow-hidden rounded-2xl bg-muted ring-1 ring-border shadow-sm",
    data.withBackground ? "p-4" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <figure className={`my-10 ${data.stretched ? "md:-mx-12 lg:-mx-20" : ""}`}>
      <div className={containerClass} style={{ aspectRatio: "16/9" }}>
        <Image
          src={url}
          alt={data.caption ?? ""}
          fill
          sizes="(min-width: 1024px) 800px, 100vw"
          className={data.withBackground ? "object-contain" : "object-cover"}
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
