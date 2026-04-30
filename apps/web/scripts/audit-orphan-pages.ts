import { CategoryModel, PageModel, ToolModel, connectToDatabase } from "@workspace/database";
import { PageType } from "@workspace/types";

const baseUrl = (process.env.NEXT_PUBLIC_APP_URL || "https://pdfs.com.br").replace(/\/+$/, "");

interface OrphanReport {
  type: "tool" | "category" | "custom-page" | "comparison-page";
  slug: string;
  expectedUrl: string;
  reason: string;
}

async function auditOrphans(): Promise<OrphanReport[]> {
  await connectToDatabase();

  const orphans: OrphanReport[] = [];

  const tools = await ToolModel.find({ isActive: true })
    .populate({ path: "category", select: "slug isActive" })
    .lean();

  for (const tool of tools) {
    const toolSlug = (tool.link ?? "").replace(/^\/+/, "") || "(no slug)";
    const category = tool.category as unknown as { slug?: string; isActive?: boolean } | null;
    if (!category?.slug) {
      orphans.push({
        type: "tool",
        slug: toolSlug,
        expectedUrl: "(unknown — tool has no category populated)",
        reason: "Active tool has no category reference",
      });
      continue;
    }
    if (category.isActive === false) {
      orphans.push({
        type: "tool",
        slug: toolSlug,
        expectedUrl: `${baseUrl}/ferramentas/${category.slug}/${toolSlug}`,
        reason: `Active tool linked to inactive category "${category.slug}"`,
      });
    }
  }

  const categories = await CategoryModel.find({ isActive: true }).lean();
  const toolsByCategory = new Map<string, number>();
  for (const tool of tools) {
    const category = tool.category as unknown as { _id?: { toString(): string } } | null;
    const id = category?._id?.toString();
    if (!id) continue;
    toolsByCategory.set(id, (toolsByCategory.get(id) ?? 0) + 1);
  }
  for (const cat of categories) {
    const id = cat._id.toString();
    if (!toolsByCategory.has(id)) {
      orphans.push({
        type: "category",
        slug: cat.slug,
        expectedUrl: `${baseUrl}/ferramentas/${cat.slug}`,
        reason: "Active category has no active tools",
      });
    }
  }

  const customPages = await PageModel.find({ pageType: PageType.CUSTOM, isActive: true }).lean();
  for (const page of customPages) {
    if (!page.slug) {
      orphans.push({
        type: "custom-page",
        slug: "(no slug)",
        expectedUrl: "(unknown)",
        reason: "Custom page active but missing slug",
      });
    }
  }

  const comparisonPages = await PageModel.find({ pageType: PageType.COMPARISON, isActive: true }).lean();
  for (const page of comparisonPages) {
    if (!page.slug) {
      orphans.push({
        type: "comparison-page",
        slug: "(no slug)",
        expectedUrl: "(unknown)",
        reason: "Comparison page active but missing slug",
      });
    } else if (!page.competitorName || page.competitorName.trim().length === 0) {
      orphans.push({
        type: "comparison-page",
        slug: page.slug,
        expectedUrl: `${baseUrl}/comparar/${page.slug}`,
        reason: "Comparison page missing competitorName",
      });
    }
  }

  return orphans;
}

async function main() {
  const orphans = await auditOrphans();

  if (orphans.length === 0) {
    console.log("No orphan pages found. ✅");
    process.exit(0);
  }

  console.error(`Found ${orphans.length} orphan(s):`);
  for (const orphan of orphans) {
    console.error(`  [${orphan.type}] ${orphan.slug} — ${orphan.reason} (${orphan.expectedUrl})`);
  }
  process.exit(1);
}

main().catch((error) => {
  console.error("audit-orphan-pages failed:", error);
  process.exit(2);
});
