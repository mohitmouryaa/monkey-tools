import Script from "next/script";
import { buildHowToJsonLd, type HowToStepInput } from "@/lib/seo";

interface HowToSchemaProps {
  toolId: string;
  name: string;
  description: string;
  steps: HowToStepInput[];
}

export const HowToSchema = ({ toolId, name, description, steps }: HowToSchemaProps) => {
  if (!steps || steps.length < 2) return null;

  const schema = buildHowToJsonLd({ name, description, steps });

  return (
    <Script
      id={`howto-schema-${toolId}`}
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Schema requires JSON-LD format
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
