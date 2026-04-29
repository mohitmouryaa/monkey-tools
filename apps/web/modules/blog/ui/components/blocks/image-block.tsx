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

  return (
    <figure className="my-6">
      <div
        className={[
          "relative w-full overflow-hidden rounded-xl",
          data.withBorder ? "border border-border" : "",
          data.withBackground ? "bg-muted p-4" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        style={{ aspectRatio: "16/9" }}
      >
        <Image
          src={url}
          alt={data.caption ?? ""}
          fill
          sizes="(min-width: 1024px) 800px, 100vw"
          className="object-contain"
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
