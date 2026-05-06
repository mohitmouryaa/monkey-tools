import type { Metadata, Viewport } from "next";

export const SITE_NAME = "pdfs.com.br";
export const SITE_LOCALE = "pt_BR";
export const SITE_LANG = "pt-BR";

export const SITE_URL = (process.env.NEXT_PUBLIC_APP_URL || "https://pdfs.com.br").replace(/\/+$/, "");

export const DEFAULT_OG_IMAGE = "/api/og";
export const DEFAULT_OG_IMAGE_WIDTH = 1200;
export const DEFAULT_OG_IMAGE_HEIGHT = 630;
export const DEFAULT_OG_IMAGE_ALT = `${SITE_NAME} — ferramentas online gratuitas`;

export type OgImageType = "tool" | "page" | "blog" | "category";

const OG_TITLE_MAX = 80;
const OG_SUBTITLE_MAX = 110;

const truncate = (value: string, max: number) =>
  value.length <= max ? value : `${value.slice(0, max - 1).trimEnd()}…`;

export const buildDynamicOgUrl = (input: {
  title?: string;
  subtitle?: string;
  type?: OgImageType;
}) => {
  const params = new URLSearchParams();
  if (input.title) params.set("title", truncate(input.title, OG_TITLE_MAX));
  if (input.subtitle) params.set("subtitle", truncate(input.subtitle, OG_SUBTITLE_MAX));
  if (input.type) params.set("type", input.type);
  const qs = params.toString();
  return `${SITE_URL}/api/og${qs ? `?${qs}` : ""}`;
};

// TODO: preencher quando criar conta no X/Twitter (ex.: "@pdfscombr")
export const TWITTER_HANDLE: string | null = null;

const GOOGLE_SITE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined;

export const absoluteUrl = (path: string) => {
  if (!path) return SITE_URL;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
};

const buildOgImages = (url: string, alt?: string) => [
  {
    url,
    width: DEFAULT_OG_IMAGE_WIDTH,
    height: DEFAULT_OG_IMAGE_HEIGHT,
    alt: alt || DEFAULT_OG_IMAGE_ALT,
  },
];

const resolveOgImage = (input: {
  ogImage?: string;
  title?: string;
  description?: string;
  type?: OgImageType;
}) => {
  if (input.ogImage) return absoluteUrl(input.ogImage);
  return buildDynamicOgUrl({
    title: input.title,
    subtitle: input.description,
    type: input.type,
  });
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ferramentas online gratuitas para PDF, imagens e textos`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Ferramentas online gratuitas para PDF, imagens e textos. Comprima, converta, mescla e divide arquivos em segundos — sem cadastro.",
  applicationName: SITE_NAME,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "pt-BR": SITE_URL,
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: SITE_LOCALE,
    url: SITE_URL,
    title: `${SITE_NAME} — ferramentas online gratuitas`,
    description:
      "Ferramentas online gratuitas para PDF, imagens e textos. Sem cadastro, processamento rápido e seguro.",
    images: buildOgImages(buildDynamicOgUrl({})),
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ferramentas online gratuitas`,
    description:
      "Ferramentas online gratuitas para PDF, imagens e textos. Sem cadastro, processamento rápido e seguro.",
    images: [buildDynamicOgUrl({})],
    ...(TWITTER_HANDLE ? { site: TWITTER_HANDLE, creator: TWITTER_HANDLE } : {}),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  ...(GOOGLE_SITE_VERIFICATION ? { verification: { google: GOOGLE_SITE_VERIFICATION } } : {}),
  // TODO: configurar quando favicon/logo/manifest existirem
  // icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
  // manifest: "/manifest.webmanifest",
};

export const defaultViewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export interface BuildMetadataInput {
  title: string;
  description: string;
  path: string;
  keywords?: string | string[];
  ogImage?: string;
  ogImageType?: OgImageType;
  ogType?: "website" | "article";
  noIndex?: boolean;
}

const SITE_NAME_SUFFIX_RE = new RegExp(`[\\s\\-—|·:]*${SITE_NAME.replace(/\./g, "\\.")}\\s*$`, "i");

const stripSiteSuffix = (value: string) => value.replace(SITE_NAME_SUFFIX_RE, "").trim();

const titleAlreadyHasSite = (value: string) =>
  value.toLowerCase().includes(SITE_NAME.toLowerCase()) || /monkey\s*tools/i.test(value);

type ResolvedTitle =
  | { kind: "absolute"; absolute: string; social: string }
  | { kind: "templated"; templated: string; social: string };

const resolveTitle = (input: string): ResolvedTitle => {
  const cleaned = stripSiteSuffix(input);
  if (titleAlreadyHasSite(cleaned)) {
    return { kind: "absolute", absolute: cleaned, social: cleaned };
  }
  return { kind: "templated", templated: cleaned, social: `${cleaned} | ${SITE_NAME}` };
};

export const buildMetadata = ({
  title,
  description,
  path,
  keywords,
  ogImage,
  ogImageType,
  ogType = "website",
  noIndex,
}: BuildMetadataInput): Metadata => {
  const url = absoluteUrl(path);
  const resolved = resolveTitle(title);
  const titleField = resolved.kind === "absolute" ? { absolute: resolved.absolute } : resolved.templated;
  const resolvedOgImage = resolveOgImage({
    ogImage,
    title: stripSiteSuffix(title),
    description,
    type: ogImageType ?? (ogType === "article" ? "blog" : undefined),
  });

  return {
    title: titleField,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: {
      canonical: url,
      languages: {
        "pt-BR": url,
      },
    },
    openGraph: {
      type: ogType,
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      url,
      title: resolved.social,
      description,
      images: buildOgImages(resolvedOgImage),
    },
    twitter: {
      card: "summary_large_image",
      title: resolved.social,
      description,
      images: [resolvedOgImage],
      ...(TWITTER_HANDLE ? { site: TWITTER_HANDLE, creator: TWITTER_HANDLE } : {}),
    },
    robots: noIndex
      ? { index: false, follow: false, nocache: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-snippet": -1,
            "max-image-preview": "large",
            "max-video-preview": -1,
          },
        },
  };
};

// JSON-LD builders ----------------------------------------------------

export const buildOrganizationJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  sameAs: [],
});

export const buildWebsiteJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: SITE_LANG,
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
  mainEntity: items.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
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
  path?: string;
  totalTime?: string;
}

export const buildHowToJsonLd = ({ name, description, steps, path, totalTime }: HowToJsonLdInput) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  name,
  description,
  ...(totalTime ? { totalTime } : {}),
  step: steps.map((s, index) => ({
    "@type": "HowToStep",
    position: index + 1,
    name: s.name,
    text: s.text,
    ...(s.imageUrl ? { image: s.imageUrl } : {}),
    ...(path ? { url: `${absoluteUrl(path)}#step-${index + 1}` } : {}),
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

export const buildVideoJsonLd = ({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  durationISO,
  embedUrl,
}: VideoJsonLdInput) => ({
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name,
  description,
  thumbnailUrl,
  uploadDate: typeof uploadDate === "string" ? uploadDate : uploadDate.toISOString(),
  duration: durationISO,
  embedUrl,
});

export interface WithUtmInput {
  source: string;
  medium?: string;
  campaign: string;
}

// O link gerado destina-se a canais externos (descrição de YouTube, posts em redes
// sociais, etc.) — não usar internamente, pois o robots.ts bloqueia URLs com query
// string para evitar duplicação de indexação.
export const withUtm = (path: string, { source, medium = "descricao", campaign }: WithUtmInput) =>
  `${absoluteUrl(path)}?utm_source=${encodeURIComponent(source)}&utm_medium=${encodeURIComponent(medium)}&utm_campaign=${encodeURIComponent(campaign)}`;
