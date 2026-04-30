import type { Metadata, Viewport } from "next";

export const SITE_URL = (process.env.NEXT_PUBLIC_APP_URL || "https://pdfs.com.br").replace(/\/+$/, "");
export const SITE_NAME = "pdfs.com.br";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.png`;

export const absoluteUrl = (path: string) => {
  if (!path) return SITE_URL;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized === "/" ? "" : normalized.replace(/\/+$/, "")}`;
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  generator: "Next.js",
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    siteName: SITE_NAME,
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    languages: {
      "pt-BR": SITE_URL,
    },
  },
};

export const defaultViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export interface BuildMetadataInput {
  title: string;
  description: string;
  path: string;
  keywords?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export const buildMetadata = ({ title, description, path, keywords, ogImage, noIndex }: BuildMetadataInput): Metadata => {
  const url = absoluteUrl(path);
  const image = ogImage || DEFAULT_OG_IMAGE;
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
      languages: {
        "pt-BR": url,
      },
    },
    robots: noIndex
      ? { index: false, follow: false, nocache: true }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "pt_BR",
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
};

export const buildOrganizationJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  sameAs: [],
});

export const buildWebsiteJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/ferramentas?search={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
});

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export const buildBreadcrumbJsonLd = (items: BreadcrumbItem[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

export interface SoftwareAppJsonLdInput {
  name: string;
  description: string;
  path: string;
  category?: string;
}

export const buildSoftwareAppJsonLd = ({ name, description, path, category }: SoftwareAppJsonLdInput) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name,
  description,
  url: absoluteUrl(path),
  applicationCategory: category || "UtilityApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "BRL",
  },
});

export interface FaqItem {
  question: string;
  answer: string;
}

export const buildFaqJsonLd = (items: FaqItem[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
});

export interface HowToStepInput {
  name: string;
  text: string;
  imageUrl?: string;
}

export interface HowToJsonLdInput {
  name: string;
  description: string;
  steps: HowToStepInput[];
  totalTime?: string;
}

export const buildHowToJsonLd = ({ name, description, steps, totalTime }: HowToJsonLdInput) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  name,
  description,
  ...(totalTime ? { totalTime } : {}),
  step: steps.map((s, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: s.name,
    text: s.text,
    ...(s.imageUrl ? { image: s.imageUrl } : {}),
  })),
});

export interface VideoJsonLdInput {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: Date | string;
  durationISO: string;
  embedUrl: string;
}

export const buildVideoJsonLd = (input: VideoJsonLdInput) => ({
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: input.name,
  description: input.description,
  thumbnailUrl: input.thumbnailUrl,
  uploadDate: typeof input.uploadDate === "string" ? input.uploadDate : input.uploadDate.toISOString(),
  duration: input.durationISO,
  embedUrl: input.embedUrl,
});

export interface WithUtmInput {
  source: string;
  medium?: string;
  campaign: string;
}

export const withUtm = (path: string, { source, medium = "descricao", campaign }: WithUtmInput) =>
  `${absoluteUrl(path)}?utm_source=${encodeURIComponent(source)}&utm_medium=${encodeURIComponent(medium)}&utm_campaign=${encodeURIComponent(campaign)}`;
