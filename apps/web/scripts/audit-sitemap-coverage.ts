import { writeFile } from "node:fs/promises";
import path from "node:path";
import { ToolModel, connectToDatabase } from "@workspace/database";

interface CoverageReport {
  checkedAt: string;
  baseUrl: string;
  sitemapUrl: string;
  totalActiveTools: number;
  totalInSitemap: number;
  missingFromSitemap: Array<{
    toolId: string;
    title: string;
    link: string;
    categorySlug: string | null;
    expectedPath: string;
  }>;
}

const OUTPUT_PATH = path.resolve(process.cwd(), "scripts/.audit-sitemap-coverage.json");

const normalizeToolLink = (link: string) => link.replace(/^\/+/, "");

const SITEMAP_LOC_REGEX = /<loc>\s*([^<\s]+)\s*<\/loc>/g;
const TOOL_PATH_REGEX = /\/(?:tools|ferramentas)\/([^/]+)\/([^/?#\s]+)/;

const parseSitemap = (xml: string): Set<string> => {
  const pairs = new Set<string>();
  const matches = xml.matchAll(SITEMAP_LOC_REGEX);
  for (const m of matches) {
    const url = m[1];
    if (!url) continue;
    const tool = url.match(TOOL_PATH_REGEX);
    if (tool) {
      pairs.add(`${tool[1]}/${tool[2]}`);
    }
  }
  return pairs;
};

const run = async () => {
  const baseUrl = (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000").replace(/\/+$/, "");
  const sitemapUrl = `${baseUrl}/sitemap-tools.xml`;

  console.log(`[audit-sitemap-coverage] Conectando ao banco...`);
  await connectToDatabase();

  console.log(`[audit-sitemap-coverage] Buscando tools ativas...`);
  const tools = await ToolModel.find({ isActive: true })
    .populate({ path: "category", select: "slug isActive" })
    .select({ _id: 1, title: 1, link: 1, category: 1 })
    .lean();

  console.log(`[audit-sitemap-coverage] ${tools.length} tools ativas encontradas.`);

  console.log(`[audit-sitemap-coverage] Baixando sitemap em ${sitemapUrl} ...`);
  const response = await fetch(sitemapUrl);
  if (!response.ok) {
    console.error(
      `[audit-sitemap-coverage] ERRO: GET ${sitemapUrl} retornou ${response.status}. ` +
        `Suba o servidor Next antes de rodar (pnpm --filter web dev).`,
    );
    process.exit(2);
  }
  const xml = await response.text();
  const sitemapPairs = parseSitemap(xml);
  console.log(`[audit-sitemap-coverage] ${sitemapPairs.size} URLs de tool no sitemap.`);

  const missing: CoverageReport["missingFromSitemap"] = [];
  for (const tool of tools) {
    const category = tool.category as unknown as { slug?: string; isActive?: boolean } | null;
    const categorySlug = category?.slug ?? null;
    const toolSlug = normalizeToolLink(tool.link ?? "");

    if (!categorySlug || category?.isActive === false || !toolSlug) {
      missing.push({
        toolId: String(tool._id),
        title: tool.title,
        link: tool.link ?? "",
        categorySlug,
        expectedPath: categorySlug ? `/ferramentas/${categorySlug}/${toolSlug}` : "(sem categoria)",
      });
      continue;
    }

    const key = `${categorySlug}/${toolSlug}`;
    if (!sitemapPairs.has(key)) {
      missing.push({
        toolId: String(tool._id),
        title: tool.title,
        link: tool.link ?? "",
        categorySlug,
        expectedPath: `/ferramentas/${categorySlug}/${toolSlug}`,
      });
    }
  }

  const report: CoverageReport = {
    checkedAt: new Date().toISOString(),
    baseUrl,
    sitemapUrl,
    totalActiveTools: tools.length,
    totalInSitemap: sitemapPairs.size,
    missingFromSitemap: missing,
  };

  await writeFile(OUTPUT_PATH, `${JSON.stringify(report, null, 2)}\n`, "utf8");

  console.log("");
  console.log(`==================== RELATÓRIO ====================`);
  console.log(`Tools ativas no DB:    ${report.totalActiveTools}`);
  console.log(`URLs no sitemap:       ${report.totalInSitemap}`);
  console.log(`Faltando no sitemap:   ${missing.length}`);
  console.log(`Arquivo JSON:          ${OUTPUT_PATH}`);
  console.log(`==================================================`);

  if (missing.length > 0) {
    console.log("");
    console.log("FALTANDO:");
    for (const m of missing) {
      console.log(`  - [${m.categorySlug ?? "—"}] ${m.title} (link=${m.link}) → esperado ${m.expectedPath}`);
    }
    process.exit(1);
  }

  console.log("");
  console.log("Cobertura completa.");
  process.exit(0);
};

run().catch((err) => {
  console.error("[audit-sitemap-coverage] ERRO inesperado:", err);
  process.exit(2);
});
