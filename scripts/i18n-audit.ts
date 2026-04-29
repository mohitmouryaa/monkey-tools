import { chromium, type Page } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { MongoClient, ObjectId } from "mongodb";

const BASE_URL = process.env.AUDIT_BASE_URL ?? "http://localhost:3000";
const MONGO_URL = process.env.DATABASE_URL ?? "mongodb://localhost:27017/monkey-tools?replicaSet=rs0";
const REPORT_PATH = process.env.AUDIT_REPORT_PATH
  ? resolve(process.cwd(), process.env.AUDIT_REPORT_PATH)
  : resolve(process.cwd(), ".claude/i18n-audit.md");
const SCREENSHOT_DIR = resolve(process.cwd(), ".claude/i18n-screenshots");
const MAX_PAGES = 200;
const NAV_TIMEOUT_MS = 20_000;
const LOOSE = process.env.AUDIT_LOOSE === "1";
const MIN_EN_WORDS = LOOSE ? 1 : 2;
const MIN_TOKENS = LOOSE ? 2 : 3;
const MIN_BLOCK_LEN = LOOSE ? 4 : 8;

const STOPWORDS_EN = new Set([
  "the",
  "is",
  "are",
  "was",
  "were",
  "be",
  "been",
  "being",
  "am",
  "has",
  "have",
  "had",
  "do",
  "does",
  "did",
  "doing",
  "will",
  "would",
  "can",
  "could",
  "should",
  "shall",
  "may",
  "might",
  "must",
  "of",
  "to",
  "in",
  "on",
  "at",
  "by",
  "with",
  "from",
  "for",
  "about",
  "into",
  "onto",
  "over",
  "under",
  "between",
  "through",
  "and",
  "or",
  "but",
  "if",
  "then",
  "else",
  "when",
  "while",
  "because",
  "so",
  "than",
  "as",
  "not",
  "no",
  "yes",
  "this",
  "that",
  "these",
  "those",
  "there",
  "here",
  "where",
  "what",
  "which",
  "who",
  "whom",
  "whose",
  "why",
  "how",
  "your",
  "our",
  "their",
  "my",
  "his",
  "her",
  "its",
  "you",
  "we",
  "they",
  "i",
  "me",
  "us",
  "them",
  "him",
  "he",
  "she",
  "it",
  "click",
  "upload",
  "download",
  "drag",
  "drop",
  "choose",
  "select",
  "convert",
  "compress",
  "merge",
  "split",
  "rotate",
  "page",
  "pages",
  "file",
  "files",
  "image",
  "images",
  "tool",
  "tools",
  "free",
  "online",
  "fast",
  "easy",
  "secure",
  "next",
  "back",
  "previous",
  "continue",
  "cancel",
  "ok",
  "yes",
  "no",
  "submit",
  "save",
  "delete",
  "edit",
  "create",
  "login",
  "logout",
  "sign",
  "signup",
  "email",
  "password",
  "username",
  "account",
  "settings",
  "help",
  "support",
  "home",
  "about",
  "contact",
  "privacy",
  "terms",
  "cookies",
  "faq",
  "blog",
  "news",
  "loading",
  "please",
  "wait",
  "error",
  "success",
  "warning",
  "info",
  "ready",
  "done",
  "finished",
  "completed",
]);

const STOPWORDS_PT = new Set([
  "o",
  "a",
  "os",
  "as",
  "um",
  "uma",
  "uns",
  "umas",
  "de",
  "da",
  "do",
  "das",
  "dos",
  "em",
  "no",
  "na",
  "nos",
  "nas",
  "para",
  "pra",
  "com",
  "sem",
  "por",
  "ao",
  "aos",
  "à",
  "às",
  "pelo",
  "pela",
  "pelos",
  "pelas",
  "é",
  "são",
  "foi",
  "foram",
  "ser",
  "estar",
  "está",
  "estão",
  "estava",
  "tem",
  "têm",
  "tinha",
  "tinham",
  "há",
  "e",
  "ou",
  "mas",
  "se",
  "que",
  "como",
  "quando",
  "onde",
  "porque",
  "então",
  "também",
  "já",
  "ainda",
  "só",
  "apenas",
  "isso",
  "isto",
  "esse",
  "esta",
  "este",
  "essa",
  "aquilo",
  "aquele",
  "aquela",
  "aqui",
  "agora",
  "depois",
  "antes",
  "seu",
  "sua",
  "seus",
  "suas",
  "meu",
  "minha",
  "nosso",
  "nossa",
  "você",
  "vocês",
  "ele",
  "ela",
  "eles",
  "elas",
  "nós",
  "clique",
  "clicar",
  "enviar",
  "baixar",
  "arquivo",
  "arquivos",
  "imagem",
  "imagens",
  "ferramenta",
  "ferramentas",
  "página",
  "páginas",
  "gratuito",
  "grátis",
  "rápido",
  "fácil",
  "seguro",
  "online",
  "próximo",
  "voltar",
  "anterior",
  "continuar",
  "cancelar",
  "sim",
  "não",
  "salvar",
  "apagar",
  "editar",
  "criar",
  "entrar",
  "sair",
  "cadastrar",
  "conta",
  "ajuda",
  "suporte",
  "início",
  "sobre",
  "contato",
  "privacidade",
  "termos",
  "carregando",
  "aguarde",
  "erro",
  "sucesso",
  "aviso",
  "pronto",
  "concluído",
  "finalizado",
  "comprimir",
  "mesclar",
  "dividir",
  "rotacionar",
  "desbloquear",
  "proteger",
  "numerar",
  "converter",
  "gerar",
  "comprima",
  "converta",
  "mescle",
  "edite",
  "reduza",
  "gere",
  "faça",
  "deixe",
  "tamanho",
  "qualidade",
  "formato",
  "entre",
  "junte",
  "corte",
  "redimensione",
]);

const BRAND_TERMS = new Set([
  "pdf",
  "jpg",
  "jpeg",
  "png",
  "webp",
  "heic",
  "gif",
  "bmp",
  "svg",
  "tiff",
  "json",
  "xml",
  "csv",
  "html",
  "css",
  "js",
  "ts",
  "tsx",
  "jsx",
  "excel",
  "word",
  "powerpoint",
  "docx",
  "xlsx",
  "pptx",
  "qr",
  "cnpj",
  "cpf",
  "cep",
  "seo",
  "url",
  "api",
  "cdn",
  "cms",
  "saas",
  "ssl",
  "tls",
  "pwa",
  "mongodb",
  "redis",
  "minio",
  "s3",
  "aws",
  "docker",
  "node",
  "react",
  "next",
  "tailwind",
  "monkey",
]);

type EnglishHit = {
  block: string;
  enWords: string[];
  ptWords: string[];
};

type PageReport = {
  url: string;
  status: number;
  title: string;
  hits: EnglishHit[];
  screenshot: string;
  error?: string;
};

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-záéíóúâêôãõàçñ\s'-]/giu, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function isAsciiAlpha(token: string): boolean {
  return /^[a-z][a-z'-]*$/i.test(token);
}

function detectEnglishBlocks(text: string): EnglishHit[] {
  const hits: EnglishHit[] = [];
  const blocks = text
    .split(/\n+/)
    .map((b) => b.trim())
    .filter((b) => b.length >= MIN_BLOCK_LEN);

  for (const block of blocks) {
    const tokens = tokenize(block);
    if (tokens.length < MIN_TOKENS) continue;

    const enWords: string[] = [];
    const ptWords: string[] = [];
    let asciiOnly = 0;

    for (const tok of tokens) {
      if (BRAND_TERMS.has(tok)) continue;
      if (isAsciiAlpha(tok)) asciiOnly++;
      if (STOPWORDS_EN.has(tok)) enWords.push(tok);
      if (STOPWORDS_PT.has(tok)) ptWords.push(tok);
    }

    const minAscii = LOOSE ? 2 : 3;
    if (enWords.length >= MIN_EN_WORDS && enWords.length > ptWords.length && asciiOnly >= minAscii) {
      hits.push({ block: block.slice(0, 400), enWords, ptWords });
    }
  }
  return hits;
}

async function loadSeedUrls(): Promise<string[]> {
  const client = new MongoClient(MONGO_URL);
  try {
    await client.connect();
    const db = client.db();
    const [tools, categories, pages] = await Promise.all([
      db
        .collection("tools")
        .find({}, { projection: { link: 1, category: 1 } })
        .toArray(),
      db
        .collection("categories")
        .find({}, { projection: { slug: 1, _id: 1 } })
        .toArray(),
      db
        .collection("pages")
        .find({}, { projection: { slug: 1 } })
        .toArray(),
    ]);
    const catById = new Map(categories.map((c) => [String(c._id), c.slug as string]));

    const urls = new Set<string>();
    urls.add(`${BASE_URL}/`);
    urls.add(`${BASE_URL}/login`);
    urls.add(`${BASE_URL}/ferramentas`);

    for (const c of categories) urls.add(`${BASE_URL}/ferramentas/${c.slug}`);
    for (const t of tools) {
      const cat = catById.get(String(t.category));
      if (cat && t.link) urls.add(`${BASE_URL}/ferramentas/${cat}/${t.link}`);
    }
    for (const p of pages) {
      if (p.slug && p.slug !== "homepage") urls.add(`${BASE_URL}/${p.slug}`);
    }
    return Array.from(urls);
  } finally {
    await client.close();
  }
}

function sameOrigin(url: string): boolean {
  try {
    const u = new URL(url);
    return u.origin === new URL(BASE_URL).origin;
  } catch {
    return false;
  }
}

function normalizeUrl(url: string): string {
  try {
    const u = new URL(url);
    u.hash = "";
    return u.toString();
  } catch {
    return url;
  }
}

async function auditPage(page: Page, url: string, idx: number): Promise<PageReport> {
  const screenshotRel = `i18n-screenshots/${String(idx).padStart(3, "0")}-${encodeURIComponent(url.replace(BASE_URL, "").slice(0, 60) || "root")}.png`;
  const screenshotAbs = resolve(SCREENSHOT_DIR, screenshotRel.replace("i18n-screenshots/", ""));
  try {
    const resp = await page.goto(url, { waitUntil: "networkidle", timeout: NAV_TIMEOUT_MS });
    const status = resp?.status() ?? 0;
    const title = await page.title();
    const text = await page.evaluate(() => document.body?.innerText ?? "");
    await mkdir(dirname(screenshotAbs), { recursive: true });
    await page.screenshot({ path: screenshotAbs, fullPage: true });
    const hits = detectEnglishBlocks(text);
    return { url, status, title, hits, screenshot: screenshotRel };
  } catch (err) {
    return {
      url,
      status: 0,
      title: "",
      hits: [],
      screenshot: screenshotRel,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

async function discoverLinks(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll("a[href]")) as HTMLAnchorElement[];
    return anchors.map((a) => a.href).filter(Boolean);
  });
}

function renderReport(reports: PageReport[]): string {
  const withHits = reports.filter((r) => r.hits.length > 0);
  const errors = reports.filter((r) => r.error);
  const lines: string[] = [];
  lines.push(`# Auditoria de Conteúdo em Inglês`);
  lines.push("");
  lines.push(`- Base URL: \`${BASE_URL}\``);
  lines.push(`- Páginas visitadas: **${reports.length}**`);
  lines.push(`- Páginas com inglês detectado: **${withHits.length}**`);
  lines.push(`- Erros de navegação: **${errors.length}**`);
  lines.push("");

  if (withHits.length === 0) {
    lines.push(`## ✅ Nenhuma página com inglês detectado pela heurística.`);
    lines.push("");
    lines.push(
      `> A heurística é estatística (stopwords EN vs PT). Frases curtas ou termos técnicos podem passar batido — confira manualmente os screenshots em \`.claude/i18n-screenshots/\`.`,
    );
  } else {
    lines.push(`## Páginas com possível inglês`);
    lines.push("");
    for (const r of withHits) {
      lines.push(`### ${r.url}`);
      lines.push(`- Title: \`${r.title}\``);
      lines.push(`- Status: ${r.status}`);
      lines.push(`- Screenshot: \`.claude/${r.screenshot}\``);
      lines.push("");
      for (const h of r.hits) {
        lines.push(`- Trecho: ${JSON.stringify(h.block)}`);
        lines.push(`  - Stopwords EN: \`${h.enWords.slice(0, 8).join(", ")}\``);
        lines.push(`  - Stopwords PT: \`${h.ptWords.slice(0, 8).join(", ")}\``);
      }
      lines.push("");
    }
  }

  if (errors.length > 0) {
    lines.push(`## Erros de navegação`);
    lines.push("");
    for (const r of errors) {
      lines.push(`- \`${r.url}\` — ${r.error}`);
    }
    lines.push("");
  }

  lines.push(`## Todas as páginas visitadas`);
  lines.push("");
  for (const r of reports) {
    const flag = r.error ? "❌" : r.hits.length > 0 ? "🟡" : "✅";
    lines.push(
      `- ${flag} [${r.status}] \`${r.url}\` — ${r.title || "(sem título)"} ${r.hits.length > 0 ? `— ${r.hits.length} bloco(s) suspeito(s)` : ""}`,
    );
  }
  lines.push("");
  return lines.join("\n");
}

async function main() {
  console.log(`[i18n-audit] base: ${BASE_URL}`);
  const seeds = await loadSeedUrls();
  console.log(`[i18n-audit] sementes do banco: ${seeds.length}`);

  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ locale: "pt-BR", viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();

  const visited = new Set<string>();
  const queue: string[] = [...seeds];
  const reports: PageReport[] = [];
  let idx = 0;

  while (queue.length > 0 && reports.length < MAX_PAGES) {
    const next = normalizeUrl(queue.shift()!);
    if (visited.has(next) || !sameOrigin(next)) continue;
    visited.add(next);
    idx++;
    process.stdout.write(`[${String(idx).padStart(3, "0")}/${MAX_PAGES}] ${next} ... `);
    const r = await auditPage(page, next, idx);
    reports.push(r);
    process.stdout.write(`${r.error ? `ERR ${r.error.slice(0, 60)}` : `${r.status} (${r.hits.length} hits)`}\n`);

    if (!r.error) {
      const links = await discoverLinks(page);
      for (const l of links) {
        const n = normalizeUrl(l);
        if (sameOrigin(n) && !visited.has(n) && !n.includes("/dashboard")) {
          queue.push(n);
        }
      }
    }
  }

  await browser.close();
  await mkdir(dirname(REPORT_PATH), { recursive: true });
  const md = renderReport(reports);
  await writeFile(REPORT_PATH, md, "utf8");
  console.log(`\n[i18n-audit] relatório: ${REPORT_PATH}`);
  console.log(`[i18n-audit] páginas: ${reports.length}, com hits: ${reports.filter((r) => r.hits.length > 0).length}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
