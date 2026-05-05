import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

import AddressGenerator from "../ui/components/gerador-endereco";

describe("Gerador de endereço", () => {
  it("happy path: ao montar já há um endereço com CEP formatado válido", () => {
    render(<AddressGenerator />);

    const cepInput = screen.getAllByRole("textbox")[0] as HTMLInputElement;
    expect(cepInput.value).toMatch(/^\d{5}-\d{3}$/);
  });

  it("estado UF é uma sigla de 2 letras maiúsculas", () => {
    render(<AddressGenerator />);
    const stateInput = screen.getAllByRole("textbox").find((el) => /^[A-Z]{2}$/.test((el as HTMLInputElement).value));
    expect(stateInput).toBeDefined();
  });

  it("toggle formato off: CEP perde o hífen", async () => {
    render(<AddressGenerator />);
    const user = userEvent.setup();

    await user.click(screen.getByRole("switch"));
    const cepInput = screen.getAllByRole("textbox")[0] as HTMLInputElement;
    expect(cepInput.value).toMatch(/^\d{8}$/);
  });

  it("regenerar: novo clique troca o endereço (CEP muda quase sempre)", async () => {
    render(<AddressGenerator />);
    const user = userEvent.setup();

    const before = (screen.getAllByRole("textbox")[0] as HTMLInputElement).value;
    // Várias tentativas pra fugir do raríssimo caso de igual
    let after = before;
    for (let i = 0; i < 5 && after === before; i++) {
      await user.click(screen.getByRole("button", { name: /gerar novo endereço/i }));
      after = (screen.getAllByRole("textbox")[0] as HTMLInputElement).value;
    }
    expect(after).not.toBe(before);
  });

  it("copiar texto chama clipboard com formato 'CEP:'", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true, writable: true });
    render(<AddressGenerator />);

    fireEvent.click(screen.getByRole("button", { name: /copiar texto/i }));
    await Promise.resolve();
    await Promise.resolve();

    expect(writeText).toHaveBeenCalled();
    expect(writeText.mock.calls[0][0]).toMatch(/CEP:/);
  });

  it("copiar JSON envia objeto JSON parseável com cep/state/city", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true, writable: true });
    render(<AddressGenerator />);

    fireEvent.click(screen.getByRole("button", { name: /copiar json/i }));
    await Promise.resolve();
    await Promise.resolve();

    const arg = writeText.mock.calls.at(-1)?.[0] as string;
    const parsed = JSON.parse(arg);
    expect(parsed).toMatchObject({ cep: expect.any(String), state: expect.any(String), city: expect.any(String) });
  });
});
