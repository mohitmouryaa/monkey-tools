import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

import WordCounter from "../ui/components/contador-palavras";

function getStat(label: RegExp): string {
  const span = screen.getByText(label);
  const card = span.closest("div.p-4");
  if (!card) throw new Error("card not found");
  const numberDiv = card.querySelector("div.text-2xl");
  return numberDiv?.textContent?.trim() ?? "";
}

describe("Contador de palavras", () => {
  it("happy path: conta palavras corretamente", async () => {
    render(<WordCounter />);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText(/digite ou cole seu texto/i), "Olá mundo bonito");
    expect(getStat(/^Total de Palavras$/)).toBe("3");
  });

  it("palavras únicas case-insensitive", async () => {
    render(<WordCounter />);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText(/digite ou cole seu texto/i), "casa Casa CASA");
    expect(getStat(/^Total de Palavras$/)).toBe("3");
    expect(getStat(/^Palavras Únicas$/)).toBe("1");
  });

  it("edge: texto vazio NÃO renderiza a seção de estatísticas", () => {
    render(<WordCounter />);
    expect(screen.queryByText(/^Total de Palavras$/)).not.toBeInTheDocument();
  });

  it("clear: limpa o textarea", async () => {
    render(<WordCounter />);
    const user = userEvent.setup();

    const ta = screen.getByPlaceholderText(/digite ou cole seu texto/i) as HTMLTextAreaElement;
    await user.type(ta, "abc");
    await user.click(screen.getByRole("button", { name: /limpar/i }));
    expect(ta.value).toBe("");
  });

  it("edge: pontuação não conta como palavra", async () => {
    render(<WordCounter />);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText(/digite ou cole seu texto/i), "a, b! c?");
    expect(getStat(/^Total de Palavras$/)).toBe("3");
  });
});
