import { connectToDatabase, PageModel } from "@workspace/database";
import { PageType } from "@workspace/types";

const RAW_HTML_BLOCK_TYPE = "raw-html";
const EDITOR_VERSION = "2.31.6";

async function main() {
  console.log("Conectando no MongoDB...");
  await connectToDatabase();

  const pages = await PageModel.find({ pageType: PageType.CUSTOM });
  console.log(`Encontradas ${pages.length} página(s) CUSTOM.`);

  let migrated = 0;
  let skippedAlreadyMigrated = 0;
  let skippedEmpty = 0;

  for (const page of pages) {
    const slug = page.slug;
    const content = page.content;

    if (content === undefined || content === null) {
      skippedEmpty++;
      console.log(`[skip:empty] ${slug} — content ausente`);
      continue;
    }

    if (typeof content !== "string") {
      skippedAlreadyMigrated++;
      console.log(`[skip:already-migrated] ${slug}`);
      continue;
    }

    const html = content.trim();
    if (html.length === 0) {
      skippedEmpty++;
      console.log(`[skip:empty] ${slug} — string vazia`);
      continue;
    }

    page.content = {
      time: Date.now(),
      version: EDITOR_VERSION,
      blocks: [
        {
          type: RAW_HTML_BLOCK_TYPE,
          data: { html },
        },
      ],
    };
    await page.save();
    migrated++;
    console.log(`[migrated] ${slug}`);
  }

  console.log("\n=== Resumo ===");
  console.log(`migrated: ${migrated}`);
  console.log(`skipped (already migrated): ${skippedAlreadyMigrated}`);
  console.log(`skipped (empty): ${skippedEmpty}`);
  process.exit(0);
}

main().catch((err) => {
  console.error("Falhou:", err);
  process.exit(1);
});
