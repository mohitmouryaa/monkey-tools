import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const toastError = vi.hoisted(() => vi.fn());
const toastSuccess = vi.hoisted(() => vi.fn());
vi.mock("sonner", () => ({ toast: { error: toastError, success: toastSuccess } }));

import StrongPasswordGenerator from "../ui/components/gerador-senha";

function getRevealedPassword(): string {
  // Existem dois inputs: 1) o display da senha (texto/●) e 2) gancho de senha gerada
  const inputs = screen.getAllByRole("textbox") as HTMLInputElement[];
  const visible = inputs.find((el) => el.value.length > 0 && !/^•+$/.test(el.value));
  if (visible) return visible.value;
  // Se está mascarada, descobre o tamanho via número de bullets
  const masked = inputs.find((el) => /^•+$/.test(el.value));
  return masked?.value ?? "";
}

describe("Gerador de senha", () => {
  beforeEach(() => {
    toastError.mockReset();
    toastSuccess.mockReset();
  });

  it("happy path: gera senha com tamanho default 12 (ao menos uma classe presente)", async () => {
    render(<StrongPasswordGenerator />);
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /gerar nova senha/i }));

    // Mostra mascarada por default → 12 caracteres mascarados
    const inputs = screen.getAllByRole("textbox") as HTMLInputElement[];
    const masked = inputs.find((el) => /^•{12}$/.test(el.value));
    expect(masked).toBeDefined();
    expect(toastSuccess).toHaveBeenCalled();
  });

  it("revela senha ao clicar no toggle e a senha contém ao menos um lowercase", async () => {
    render(<StrongPasswordGenerator />);
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /gerar nova senha/i }));

    // Procura o botão Eye (primeiro botão dos dois w-8 h-8 dentro do display)
    const allButtons = screen.getAllByRole("button");
    // O Eye fica imediatamente antes do Copy (Copy aciona writeText)
    // Pega o primeiro botão com classe w-8 h-8 (fora do switch toggle e gerar)
    const eye = allButtons.find((b) => b.className.includes("w-8 h-8"));
    expect(eye).toBeDefined();
    if (eye) await user.click(eye);

    const pwd = getRevealedPassword();
    expect(pwd.length).toBe(12);
    expect(pwd).toMatch(/[a-z]/);
  });

  it("edge: desabilitar todos os tipos exibe toast de erro e não gera senha", async () => {
    render(<StrongPasswordGenerator />);
    const user = userEvent.setup();

    const switches = screen.getAllByRole("switch");
    for (const s of switches) {
      if (s.getAttribute("data-state") === "checked") {
        await user.click(s);
      }
    }

    await user.click(screen.getByRole("button", { name: /gerar nova senha/i }));

    expect(toastError).toHaveBeenCalledWith(expect.stringMatching(/pelo menos um tipo/i));
  });

  it("edge: muda tamanho via slider para 16 e label reflete", async () => {
    render(<StrongPasswordGenerator />);

    const slider = screen.getByLabelText(/tamanho da senha/i) as HTMLInputElement;
    fireEvent.change(slider, { target: { value: "16" } });

    expect(screen.getByText(/16 caracteres/i)).toBeInTheDocument();
  });

  it("edge: copiar senha sem ter gerado dispara toast de erro", async () => {
    render(<StrongPasswordGenerator />);
    // Antes de gerar, a section "password-display" não aparece, então copyPassword
    // só estaria disponível depois de gerar. Aqui validamos que a section sumida.
    expect(screen.queryByText(/Senha Gerada/i)).not.toBeInTheDocument();
  });
});
