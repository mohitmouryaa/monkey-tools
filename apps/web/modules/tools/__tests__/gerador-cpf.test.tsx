import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

import CpfGenerator from "../ui/components/gerador-cpf";

function isValidCPFAlgo(cpf: string) {
  const cleaned = cpf.replace(/\D/g, "");
  if (cleaned.length !== 11) return false;
  if (/^(\d)\1+$/.test(cleaned)) return false;
  const calc = (len: number) =>
    11 -
    (cleaned
      .slice(0, len)
      .split("")
      .reduce((sum, d, i) => sum + Number(d) * (len + 1 - i), 0) %
      11);
  const d1 = calc(9);
  const d2 = calc(10);
  return Number(cleaned[9]) === (d1 >= 10 ? 0 : d1) && Number(cleaned[10]) === (d2 >= 10 ? 0 : d2);
}

describe("Gerador de CPF", () => {
  it("happy path: clicar em 'Gerar CPF' produz CPF formatado e válido", async () => {
    render(<CpfGenerator />);
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /gerar cpf/i }));

    const input = screen.getByPlaceholderText(/clique em gerar/i) as HTMLInputElement;
    expect(input.value).toMatch(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/);
    expect(isValidCPFAlgo(input.value)).toBe(true);
  });

  it("toggle de formato gera CPF apenas com dígitos quando desligado", async () => {
    render(<CpfGenerator />);
    const user = userEvent.setup();

    await user.click(screen.getByRole("switch"));
    await user.click(screen.getByRole("button", { name: /gerar cpf/i }));

    const input = screen.getByPlaceholderText(/clique em gerar/i) as HTMLInputElement;
    expect(input.value).toMatch(/^\d{11}$/);
    expect(isValidCPFAlgo(input.value)).toBe(true);
  });

  it("validador: rejeita CPF com todos dígitos iguais (111.111.111-11)", async () => {
    render(<CpfGenerator />);
    const user = userEvent.setup();

    const validateInput = screen.getByLabelText(/insira o cpf/i);
    await user.type(validateInput, "11111111111");

    expect(await screen.findByText(/CPF Inválido/i)).toBeInTheDocument();
  });

  it("validador: aceita CPF gerado pelo próprio gerador", async () => {
    render(<CpfGenerator />);
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /gerar cpf/i }));
    const generated = (screen.getByPlaceholderText(/clique em gerar/i) as HTMLInputElement).value;

    const validateInput = screen.getByLabelText(/insira o cpf/i);
    await user.type(validateInput, generated);

    const matches = await screen.findAllByText(/CPF Válido/i);
    expect(matches.length).toBeGreaterThan(0);
  });

  it("edge: validador rejeita string com menos de 11 dígitos", async () => {
    render(<CpfGenerator />);
    const user = userEvent.setup();

    const validateInput = screen.getByLabelText(/insira o cpf/i);
    await user.type(validateInput, "123");

    expect(await screen.findByText(/CPF Inválido/i)).toBeInTheDocument();
  });
});
