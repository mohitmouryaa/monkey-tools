import Script from "next/script";

interface ArticleSchemaProps {
  url: string;
  title: string;
  description: string;
  image: string;
  datePublished?: string | Date | null;
  dateModified?: string | Date | null;
  authorName?: string;
  publisherName?: string;
  publisherLogo?: string;
  keywords?: string[];
}

export const ArticleSchema = ({
  url,
  title,
  description,
  image,
  datePublished,
  dateModified,
  authorName = "Equipe pdfs.com.br",
  publisherName = "pdfs.com.br",
  publisherLogo,
  keywords,
}: ArticleSchemaProps) => {
  const isoPublished = datePublished ? new Date(datePublished).toISOString() : undefined;
  const isoModified = dateModified ? new Date(dateModified).toISOString() : isoPublished;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: title,
    description,
    image: image ? [image] : undefined,
    datePublished: isoPublished,
    dateModified: isoModified,
    author: { "@type": "Organization", name: authorName },
    publisher: {
      "@type": "Organization",
      name: publisherName,
      ...(publisherLogo ? { logo: { "@type": "ImageObject", url: publisherLogo } } : {}),
    },
    ...(keywords && keywords.length ? { keywords: keywords.join(", ") } : {}),
  };

  return (
    <Script
      id="article-schema"
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD schema requires raw script injection
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
