import { describe, it, expect } from "vitest";
import { withUtm } from "./seo";

describe("withUtm", () => {
  it("encodes the canonical URL with utm_source, utm_medium and utm_campaign", () => {
    const url = withUtm("/ferramentas/conversao/comprimir-pdf", {
      source: "youtube",
      campaign: "tutorial-2026",
    });

    expect(url).toMatch(/^https?:\/\//);
    expect(url).toContain("/ferramentas/conversao/comprimir-pdf");
    expect(url).toContain("utm_source=youtube");
    expect(url).toContain("utm_medium=descricao");
    expect(url).toContain("utm_campaign=tutorial-2026");
  });

  it("respects a custom medium", () => {
    const url = withUtm("/", { source: "newsletter", medium: "email", campaign: "drop-2026-q1" });
    expect(url).toContain("utm_medium=email");
  });

  it("escapa caracteres especiais nos valores UTM", () => {
    const url = withUtm("/", {
      source: "campanha+especial",
      campaign: "promo & sale",
    });
    expect(url).toContain("utm_source=campanha%2Bespecial");
    expect(url).toContain("utm_campaign=promo%20%26%20sale");
  });
});
