import type { NextRequest } from "next/server";
import { PageModel, connectToDatabase } from "@workspace/database";
import { PageType } from "@workspace/types";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

const getBaseUrl = () => (process.env.NEXT_PUBLIC_APP_URL || "https://pdfs.com.br").replace(/\/+$/, "");

const escapeXml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

export async function GET(_request: NextRequest) {
  await connectToDatabase();

  const baseUrl = getBaseUrl();
  const lastmod = new Date().toISOString();

  const customPages = await PageModel.find({ pageType: PageType.CUSTOM, isActive: true })
    .select({ slug: 1, updatedAt: 1, createdAt: 1 })
    .lean();

  const customEntries = customPages.map((page) => {
    const url = `${baseUrl}/${page.slug}`;
    const lastModified = (page.updatedAt ?? page.createdAt ?? new Date()).toISOString();
    return `  <url>
    <loc>${escapeXml(url)}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.4</priority>
  </url>`;
  });

  const comparisonPages = await PageModel.find({ pageType: PageType.COMPARISON, isActive: true })
    .select({ slug: 1, updatedAt: 1, createdAt: 1 })
    .lean();

  const comparisonEntries = comparisonPages.map((page) => {
    const url = `${baseUrl}/comparar/${page.slug}`;
    const lastModified = (page.updatedAt ?? page.createdAt ?? new Date()).toISOString();
    return `  <url>
    <loc>${escapeXml(url)}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
  });

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${escapeXml(`${baseUrl}/`)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${escapeXml(`${baseUrl}/empresas`)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${escapeXml(`${baseUrl}/blog`)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
${[...customEntries, ...comparisonEntries].join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
