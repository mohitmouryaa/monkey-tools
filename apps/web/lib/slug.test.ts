import { describe, it, expect } from "vitest";
import { slugify } from "./slug";

describe("slugify", () => {
  it("converte texto simples para kebab-case", () => {
    expect(slugify("Comprimir PDF")).toBe("comprimir-pdf");
  });

  it("remove acentos PT-BR", () => {
    expect(slugify("Conversão de Áudio")).toBe("conversao-de-audio");
    expect(slugify("Não pôde executar")).toBe("nao-pode-executar");
  });

  it("normaliza camelCase e PascalCase", () => {
    expect(slugify("CompressPDF")).toBe("compresspdf");
    expect(slugify("PDF para JPG")).toBe("pdf-para-jpg");
  });

  it("colapsa múltiplos separadores em um único hífen", () => {
    expect(slugify("PDF   para  JPG")).toBe("pdf-para-jpg");
    expect(slugify("foo___bar")).toBe("foo-bar");
    expect(slugify("foo--bar")).toBe("foo-bar");
  });

  it("descarta hífens nas pontas", () => {
    expect(slugify(" --foo bar-- ")).toBe("foo-bar");
  });

  it("descarta caracteres especiais", () => {
    expect(slugify("foo@bar#baz!")).toBe("foo-bar-baz");
    expect(slugify("R$ 100% OFF")).toBe("r-100-off");
  });

  it("retorna string vazia para input vazio ou só símbolos", () => {
    expect(slugify("")).toBe("");
    expect(slugify("---")).toBe("");
    expect(slugify("@#$%")).toBe("");
  });
});
