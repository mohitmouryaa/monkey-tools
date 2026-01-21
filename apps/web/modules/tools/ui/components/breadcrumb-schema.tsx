import Script from "next/script";

interface BreadcrumbSchemaProps {
  items: {
    name: string;
    url: string;
  }[];
}

export const BreadcrumbSchema = ({ items }: BreadcrumbSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    // biome-ignore lint/security/noDangerouslySetInnerHtml: <!-- Schema requires JSON-LD format -->
    <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
};
