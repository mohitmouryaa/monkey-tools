import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FONT_INTER_REGULAR =
  "https://cdn.jsdelivr.net/npm/@fontsource/inter@5.2.8/files/inter-latin-400-normal.woff";
const FONT_INTER_SEMIBOLD =
  "https://cdn.jsdelivr.net/npm/@fontsource/inter@5.2.8/files/inter-latin-600-normal.woff";
const FONT_INTER_BOLD =
  "https://cdn.jsdelivr.net/npm/@fontsource/inter@5.2.8/files/inter-latin-700-normal.woff";

const TYPE_LABEL: Record<string, string> = {
  tool: "Ferramenta",
  page: "Guia",
  blog: "Artigo",
  category: "Categoria",
};

const DEFAULT_TITLE = "Ferramentas online gratuitas para PDF, imagens e textos";
const DEFAULT_SUBTITLE = "Comprima, converta, mescle e divida arquivos em segundos — sem cadastro.";

const TITLE_MAX = 80;
const SUBTITLE_MAX = 110;

const truncate = (value: string, max: number) => {
  if (value.length <= max) return value;
  return `${value.slice(0, max - 1).trimEnd()}…`;
};

async function loadFont(url: string) {
  const res = await fetch(url, { cache: "force-cache" });
  if (!res.ok) throw new Error(`failed to fetch ${url}`);
  return res.arrayBuffer();
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const rawTitle = searchParams.get("title")?.trim();
  const rawSubtitle = searchParams.get("subtitle")?.trim();
  const title = rawTitle ? truncate(rawTitle, TITLE_MAX) : DEFAULT_TITLE;
  const subtitle = rawSubtitle ? truncate(rawSubtitle, SUBTITLE_MAX) : DEFAULT_SUBTITLE;
  const type = searchParams.get("type");
  const badge = type && TYPE_LABEL[type] ? TYPE_LABEL[type] : null;

  const [interRegular, interSemibold, interBold] = await Promise.all([
    loadFont(FONT_INTER_REGULAR),
    loadFont(FONT_INTER_SEMIBOLD),
    loadFont(FONT_INTER_BOLD),
  ]);

  const titleSize =
    title.length > 70 ? 56 : title.length > 55 ? 64 : title.length > 40 ? 76 : title.length > 25 ? 92 : 108;
  const subtitleSize = subtitle.length > 90 ? 24 : subtitle.length > 60 ? 28 : 32;

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
          gap: 20,
          marginBottom: 56,
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: 88,
            height: 88,
            borderRadius: 22,
            backgroundColor: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width="52"
            height="52"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#5088f8"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            <path d="M10 9H8" />
            <path d="M16 13H8" />
            <path d="M16 17H8" />
          </svg>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            lineHeight: 1,
            fontSize: 60,
            fontWeight: 700,
            letterSpacing: "-0.03em",
          }}
        >
          <span>PDFS</span>
          <span
            style={{
              fontSize: 30,
              fontWeight: 600,
              letterSpacing: "-0.02em",
            }}
          >
            .com.br
          </span>
        </div>
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
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 3,
          overflow: "hidden",
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
          fontSize: subtitleSize,
          fontWeight: 400,
          lineHeight: 1.35,
          color: "#7dd3fc",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 3,
          overflow: "hidden",
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
        { name: "Inter", data: interBold, style: "normal", weight: 700 },
      ],
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      },
    },
  );
}
