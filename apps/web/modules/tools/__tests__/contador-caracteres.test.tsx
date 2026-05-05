import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

import CharacterCounter from "../ui/components/contador-caracteres";

function getStat(label: RegExp): string {
  const span = screen.getByText(label);
  // O bloco do número fica no irmão do container do label
  // Estrutura: <div.p-4>  <div>{label}</div>  <div.text-2xl>{number}</div>  ... </div>
  const card = span.closest("div.p-4");
  if (!card) throw new Error("card not found");
  const numberDiv = card.querySelector("div.text-2xl");
  return numberDiv?.textContent?.trim() ?? "";
}

describe("Contador de caracteres", () => {
  it("happy path: conta caracteres incluindo espaços", async () => {
    render(<CharacterCounter />);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText(/digite ou cole seu texto/i), "abc def");
    expect(getStat(/^Caracteres$/)).toBe("7");
  });

  it("conta linhas (Enter quebra linha)", async () => {
    render(<CharacterCounter />);
    const user = userEvent.setup();

    await user.type(
      screen.getByPlaceholderText(/digite ou cole seu texto/i),
      "linha 1{Enter}{Enter}linha 2",
    );
    expect(getStat(/^Linhas$/)).toBe("3");
  });

  it("conta sentenças via . ! ?", async () => {
    render(<CharacterCounter />);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText(/digite ou cole seu texto/i), "Oi! Tudo bem? Tudo.");
    expect(getStat(/^Frases$/)).toBe("3");
  });

  it("edge: texto vazio = caracteres zero", () => {
    render(<CharacterCounter />);
    expect(getStat(/^Caracteres$/)).toBe("0");
    expect(getStat(/^Palavras$/)).toBe("0");
  });

  it("clear remove o conteúdo do textarea", async () => {
    render(<CharacterCounter />);
    const user = userEvent.setup();

    const ta = screen.getByPlaceholderText(/digite ou cole seu texto/i) as HTMLTextAreaElement;
    await user.type(ta, "x");
    await user.click(screen.getByRole("button", { name: /limpar/i }));
    expect(ta.value).toBe("");
  });
});
