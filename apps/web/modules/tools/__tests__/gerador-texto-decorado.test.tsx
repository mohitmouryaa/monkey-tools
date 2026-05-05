import { describe, expect, it, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

import FancyTextGenerator from "../ui/components/gerador-texto-decorado";

async function flushDeferred() {
  // useDeferredValue agenda atualização — dois ticks são suficientes
  await act(async () => {
    await Promise.resolve();
    await Promise.resolve();
  });
}

describe("Gerador de texto decorado", () => {
  it("happy path: digitar texto exibe estilos transformados (bubble, square…)", async () => {
    render(<FancyTextGenerator />);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText(/digite algo aqui/i), "abc");
    await flushDeferred();

    // Bubble usa caractere ⓐ etc.
    const bubble = await screen.findAllByText(/[ⓐⓑⓒ]/);
    expect(bubble.length).toBeGreaterThan(0);
  });

  it("filtra estilos por nome via campo de busca", async () => {
    render(<FancyTextGenerator />);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText(/digite algo aqui/i), "x");
    await flushDeferred();

    await user.type(screen.getByPlaceholderText(/filtrar estilos/i), "Bubble");
    await flushDeferred();

    expect(screen.getByText(/^Bubble$/)).toBeInTheDocument();
    expect(screen.queryByText(/^Square$/)).not.toBeInTheDocument();
  });

  it("contador de caracteres: bate com tamanho do input", async () => {
    render(<FancyTextGenerator />);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText(/digite algo aqui/i), "Olá Mundo");
    expect(screen.getByText(/9 caracteres/i)).toBeInTheDocument();
  });

  it("edge: sem texto, nenhum estilo é exibido", () => {
    render(<FancyTextGenerator />);
    expect(screen.queryByText(/^Bubble$/)).not.toBeInTheDocument();
  });

  it("edge: caractere fora do alfabeto base é mantido (passa puro pelo mapping)", async () => {
    render(<FancyTextGenerator />);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText(/digite algo aqui/i), "?");
    await flushDeferred();

    // "?" não está no BASE_ALPHABET, então deve aparecer textualmente em algum estilo
    expect(screen.getAllByText("?").length).toBeGreaterThan(0);
  });
});
