import type { NextRequest } from "next/server";
import { PostModel, connectToDatabase } from "@workspace/database";
import { PostStatus } from "@workspace/types";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

const getBaseUrl = () => (process.env.NEXT_PUBLIC_APP_URL || "https://pdfs.com.br").replace(/\/+$/, "");

const escapeXml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

export async function GET(_request: NextRequest) {
  await connectToDatabase();

  const baseUrl = getBaseUrl();
  const lastmod = new Date().toISOString();

  const posts = await PostModel.find({
    status: PostStatus.PUBLISHED,
    publishedAt: { $lte: new Date() },
  })
    .select({ slug: 1, updatedAt: 1, publishedAt: 1, createdAt: 1 })
    .lean();

  const postEntries = posts.map((post) => {
    const url = `${baseUrl}/blog/${post.slug}`;
    const lastModified = (post.updatedAt ?? post.publishedAt ?? post.createdAt ?? new Date()).toISOString();
    return `  <url>
    <loc>${escapeXml(url)}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
  });

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${escapeXml(`${baseUrl}/blog`)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
${postEntries.join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
