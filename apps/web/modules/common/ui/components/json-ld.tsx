interface JsonLdProps {
  id?: string;
  data: Record<string, unknown> | Record<string, unknown>[];
}

export const JsonLd = ({ id, data }: JsonLdProps) => {
  return (
    <script
      {...(id ? { id } : {})}
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires raw script content
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};
