import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

const getBaseUrl = () => (process.env.NEXT_PUBLIC_APP_URL || "https://pdfs.com.br").replace(/\/+$/, "");

export async function GET(_request: NextRequest) {
  const baseUrl = getBaseUrl();
  const lastmod = new Date().toISOString();

  const sitemaps = ["sitemap-tools.xml", "sitemap-categories.xml", "sitemap-pages.xml"];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps
  .map(
    (path) => `  <sitemap>
    <loc>${baseUrl}/${path}</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>`,
  )
  .join("\n")}
</sitemapindex>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
