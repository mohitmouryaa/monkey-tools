import type { NextRequest } from "next/server";
import { ToolModel, connectToDatabase } from "@workspace/database";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

const getBaseUrl = () => (process.env.NEXT_PUBLIC_APP_URL || "https://pdfs.com.br").replace(/\/+$/, "");

const escapeXml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

export async function GET(_request: NextRequest) {
  await connectToDatabase();

  const baseUrl = getBaseUrl();
  const lastmod = new Date().toISOString();

  const tools = await ToolModel.find({ isActive: true })
    .populate({ path: "category", select: "slug" })
    .select({ link: 1, updatedAt: 1, createdAt: 1, category: 1 })
    .lean();

  // TODO(seo): se a base ultrapassar 50k URLs, particionar por categoria.
  const toolEntries = tools
    .filter((tool) => tool.category && typeof tool.category === "object" && "slug" in tool.category)
    .map((tool) => {
      const categorySlug = (tool.category as unknown as { slug: string }).slug;
      const toolSlug = (tool.link ?? "").replace(/^\/+/, "");
      const url = `${baseUrl}/ferramentas/${categorySlug}/${toolSlug}`;
      const ts = tool as unknown as { updatedAt?: Date; createdAt?: Date };
      const lastModified = (ts.updatedAt ?? ts.createdAt ?? new Date()).toISOString();
      return `  <url>
    <loc>${escapeXml(url)}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`;
    });

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${escapeXml(`${baseUrl}/ferramentas`)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
${toolEntries.join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
