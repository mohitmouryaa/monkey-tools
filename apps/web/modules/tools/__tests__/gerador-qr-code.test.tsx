import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const toDataURL = vi.hoisted(() => vi.fn());
vi.mock("qrcode", () => ({ default: { toDataURL } }));

const toastError = vi.hoisted(() => vi.fn());
const toastSuccess = vi.hoisted(() => vi.fn());
vi.mock("sonner", () => ({ toast: { error: toastError, success: toastSuccess } }));

import QRCodeGenerator from "../ui/components/gerador-qr-code";

describe("Gerador de QR code", () => {
  beforeEach(() => {
    toDataURL.mockReset();
    toastError.mockReset();
    toastSuccess.mockReset();
  });

  it("happy path: URL válida gera QR e chama qrcode.toDataURL", async () => {
    toDataURL.mockResolvedValue("data:image/png;base64,FAKE");
    render(<QRCodeGenerator />);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText(/example\.com/i), "https://exemplo.com");
    await user.click(screen.getByRole("button", { name: /gerar qr/i }));

    expect(toDataURL).toHaveBeenCalledWith(
      "https://exemplo.com",
      expect.objectContaining({ width: 300, margin: 2 }),
    );
    const img = await screen.findByAltText(/qr/i);
    expect(img).toHaveAttribute("src", "data:image/png;base64,FAKE");
    expect(toastSuccess).toHaveBeenCalled();
  });

  it("edge: URL inválida não chama toDataURL e mostra toast de erro", async () => {
    render(<QRCodeGenerator />);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText(/example\.com/i), "nao-eh-url");
    await user.click(screen.getByRole("button", { name: /gerar qr/i }));

    expect(toDataURL).not.toHaveBeenCalled();
    expect(toastError).toHaveBeenCalledWith(expect.stringMatching(/url v[áa]lida/i));
  });

  it("edge: botão 'Gerar QR Code' fica desabilitado quando o input está vazio", () => {
    render(<QRCodeGenerator />);
    const button = screen.getByRole("button", { name: /gerar qr/i });
    expect(button).toBeDisabled();
  });

  it("edge: erro do qrcode propaga toast de falha", async () => {
    toDataURL.mockRejectedValue(new Error("oops"));
    render(<QRCodeGenerator />);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText(/example\.com/i), "https://exemplo.com");
    await user.click(screen.getByRole("button", { name: /gerar qr/i }));

    await new Promise((r) => setTimeout(r, 50));
    expect(toastError).toHaveBeenCalledWith(expect.stringMatching(/falha ao gerar/i));
  });
});
