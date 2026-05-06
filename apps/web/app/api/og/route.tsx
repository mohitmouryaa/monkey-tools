import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FONT_INTER_REGULAR =
  "https://cdn.jsdelivr.net/npm/@fontsource/inter@5.2.8/files/inter-latin-400-normal.woff";
const FONT_INTER_SEMIBOLD =
  "https://cdn.jsdelivr.net/npm/@fontsource/inter@5.2.8/files/inter-latin-600-normal.woff";

const TYPE_LABEL: Record<string, string> = {
  tool: "Ferramenta",
  page: "Guia",
  blog: "Artigo",
  category: "Categoria",
};

const DEFAULT_TITLE = "Ferramentas online gratuitas para PDF, imagens e textos";
const DEFAULT_SUBTITLE = "Comprima, converta, mescle e divida arquivos em segundos — sem cadastro.";

async function loadFont(url: string) {
  const res = await fetch(url, { cache: "force-cache" });
  if (!res.ok) throw new Error(`failed to fetch ${url}`);
  return res.arrayBuffer();
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const title = searchParams.get("title")?.slice(0, 120) || DEFAULT_TITLE;
  const subtitle = searchParams.get("subtitle")?.slice(0, 160) || DEFAULT_SUBTITLE;
  const type = searchParams.get("type");
  const badge = type && TYPE_LABEL[type] ? TYPE_LABEL[type] : null;

  const [interRegular, interSemibold] = await Promise.all([
    loadFont(FONT_INTER_REGULAR),
    loadFont(FONT_INTER_SEMIBOLD),
  ]);

  const titleSize = title.length > 80 ? 64 : title.length > 50 ? 80 : title.length > 28 ? 96 : 108;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px",
        backgroundColor: "#0a1432",
        backgroundImage: "linear-gradient(180deg, #0a1432 0%, #111d4a 100%)",
        color: "#ffffff",
        fontFamily: "Inter",
        position: "relative",
        textAlign: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -260,
          left: 240,
          right: 240,
          height: 520,
          background:
            "radial-gradient(ellipse at center, rgba(56,189,248,0.32) 0%, rgba(56,189,248,0) 70%)",
          display: "flex",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 56,
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            backgroundColor: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 26,
            color: "#1d4ed8",
            fontWeight: 600,
            letterSpacing: "-0.04em",
          }}
        >
          P
        </div>
        <span
          style={{
            fontSize: 30,
            fontWeight: 600,
            letterSpacing: "-0.02em",
          }}
        >
          pdfs.com.br
        </span>
      </div>

      {badge ? (
        <div
          style={{
            display: "flex",
            marginBottom: 28,
            padding: "8px 18px",
            borderRadius: 999,
            backgroundColor: "rgba(125,211,252,0.12)",
            border: "1px solid rgba(125,211,252,0.35)",
            fontSize: 18,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#7dd3fc",
            zIndex: 1,
          }}
        >
          {badge}
        </div>
      ) : null}

      <div
        style={{
          fontSize: titleSize,
          fontWeight: 600,
          lineHeight: 1.08,
          letterSpacing: "-0.035em",
          display: "flex",
          textAlign: "center",
          maxWidth: 1000,
          zIndex: 1,
        }}
      >
        {title}
      </div>

      <div
        style={{
          marginTop: 28,
          fontSize: 30,
          fontWeight: 400,
          lineHeight: 1.35,
          color: "#7dd3fc",
          display: "flex",
          textAlign: "center",
          maxWidth: 880,
          zIndex: 1,
        }}
      >
        {subtitle}
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Inter", data: interRegular, style: "normal", weight: 400 },
        { name: "Inter", data: interSemibold, style: "normal", weight: 600 },
      ],
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      },
    },
  );
}
