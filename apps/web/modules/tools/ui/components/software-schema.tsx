import Script from "next/script";
import type { Tool } from "@workspace/database";

interface SoftwareSchemaProps {
  tool: Tool;
  url: string;
}

export const SoftwareSchema = ({ tool, url }: SoftwareSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.title,
    applicationCategory: "UtilityApplication", // or "MultimediaApplication" depending on tool
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: tool.seoDescription || tool.description,
    url: url,
    // Add aggregateRating if available
  };

  return (
    <Script
      id={`software-schema-${tool._id}`}
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: <!-- Schema requires JSON-LD format -->
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
