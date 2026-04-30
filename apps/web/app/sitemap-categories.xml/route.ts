import type { NextRequest } from "next/server";
import { CategoryModel, connectToDatabase } from "@workspace/database";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

const getBaseUrl = () => (process.env.NEXT_PUBLIC_APP_URL || "https://pdfs.com.br").replace(/\/+$/, "");

const escapeXml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

export async function GET(_request: NextRequest) {
  await connectToDatabase();

  const baseUrl = getBaseUrl();

  const categories = await CategoryModel.find({ isActive: true })
    .select({ slug: 1, updatedAt: 1, createdAt: 1 })
    .lean();

  const categoryEntries = categories.map((cat) => {
    const url = `${baseUrl}/ferramentas/${cat.slug}`;
    const ts = cat as unknown as { updatedAt?: Date; createdAt?: Date };
    const lastModified = (ts.updatedAt ?? ts.createdAt ?? new Date()).toISOString();
    return `  <url>
    <loc>${escapeXml(url)}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
  });

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${categoryEntries.join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
