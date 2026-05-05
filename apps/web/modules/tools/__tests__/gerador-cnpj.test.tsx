import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

import CnpjGenerator from "../ui/components/gerador-cnpj";

function isValidCNPJ(cnpj: string) {
  const cleaned = cnpj.replace(/\D/g, "");
  if (cleaned.length !== 14) return false;
  if (/^(\d)\1+$/.test(cleaned)) return false;
  const nums = cleaned.split("").map(Number);
  const calc = (slice: number[], weights: number[]) => {
    const sum = slice.reduce((acc, n, i) => acc + n * (weights[i] ?? 0), 0);
    const mod = sum % 11;
    return mod < 2 ? 0 : 11 - mod;
  };
  const w1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const w2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  return nums[12] === calc(nums.slice(0, 12), w1) && nums[13] === calc(nums.slice(0, 13), w2);
}

describe("Gerador de CNPJ", () => {
  it("happy path: gera CNPJ formatado e válido com filial /0001", async () => {
    render(<CnpjGenerator />);
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /gerar cnpj/i }));

    const input = screen.getByPlaceholderText(/clique em gerar/i) as HTMLInputElement;
    expect(input.value).toMatch(/^\d{2}\.\d{3}\.\d{3}\/0001-\d{2}$/);
    expect(isValidCNPJ(input.value)).toBe(true);
  });

  it("toggle formato: gera apenas dígitos quando off", async () => {
    render(<CnpjGenerator />);
    const user = userEvent.setup();

    await user.click(screen.getByRole("switch"));
    await user.click(screen.getByRole("button", { name: /gerar cnpj/i }));

    const input = screen.getByPlaceholderText(/clique em gerar/i) as HTMLInputElement;
    expect(input.value).toMatch(/^\d{14}$/);
    expect(isValidCNPJ(input.value)).toBe(true);
  });

  it("validador rejeita string com todos dígitos iguais", async () => {
    render(<CnpjGenerator />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/insira o cnpj/i), "11111111111111");
    expect(await screen.findByText(/CNPJ Inválido/i)).toBeInTheDocument();
  });

  it("validador aceita CNPJ gerado pelo próprio gerador", async () => {
    render(<CnpjGenerator />);
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /gerar cnpj/i }));
    const generated = (screen.getByPlaceholderText(/clique em gerar/i) as HTMLInputElement).value;

    await user.type(screen.getByLabelText(/insira o cnpj/i), generated);
    const matches = await screen.findAllByText(/CNPJ Válido/i);
    expect(matches.length).toBeGreaterThan(0);
  });

  it("edge: validador rejeita string menor que 14 dígitos", async () => {
    render(<CnpjGenerator />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/insira o cnpj/i), "12345");
    expect(await screen.findByText(/CNPJ Inválido/i)).toBeInTheDocument();
  });
});
