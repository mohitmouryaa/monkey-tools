"use client";

import QRCode from "qrcode";
import { toast } from "sonner";
import { useState, useCallback } from "react";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Alert, AlertTitle, AlertDescription } from "@workspace/ui/components/alert";
import { Download, QrCode, Loader2, AlertTriangle, CheckCircle, Link } from "lucide-react";

export default function QRCodeGenerator() {
  const [url, setUrl] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Generate QR Code
  const generateQRCode = useCallback(async () => {
    if (!url.trim()) {
      toast.error("Insira uma URL");
      return;
    }

    // Basic URL validation
    try {
      new URL(url);
    } catch {
      toast.error("Insira uma URL válida (inclua http:// ou https://)");
      return;
    }

    setIsGenerating(true);

    try {
      // Generate QR code as data URL
      const qrDataUrl = await QRCode.toDataURL(url, {
        width: 300,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      });

      setQrCodeUrl(qrDataUrl);
      toast.success("QR code gerado com sucesso!");
    } catch (error) {
      console.error("QR code generation error:", error);
      toast.error("Falha ao gerar QR code");
    } finally {
      setIsGenerating(false);
    }
  }, [url]);

  // Download QR Code
  const downloadQRCode = useCallback(() => {
    if (!qrCodeUrl) return;

    const link = document.createElement("a");
    link.href = qrCodeUrl;
    link.download = `qrcode-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("QR code baixado!");
  }, [qrCodeUrl]);

  // Reset
  const reset = useCallback(() => {
    setUrl("");
    setQrCodeUrl(null);
  }, []);

  return (
    <div className="w-full">
      {/* Input Section */}
      <section aria-labelledby="input-section" className="max-w-2xl mx-auto">
        <div className="space-y-6">
          {/* URL Input */}
          <div className="space-y-2">
            <Label htmlFor="url-input" className="text-sm font-medium">
              Insira a URL
            </Label>
            <div className="relative">
              <Link className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
              <Input
                id="url-input"
                type="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="h-12 pl-10 text-base"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    generateQRCode();
                  }
                }}
              />
            </div>
          </div>

          {/* Generate Button */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              onClick={generateQRCode}
              disabled={isGenerating || !url.trim()}
              size="lg"
              className="flex-1 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Gerando...
                </>
              ) : (
                <>
                  <QrCode className="w-4 h-4 mr-2" />
                  Gerar QR Code
                </>
              )}
            </Button>

            {qrCodeUrl && (
              <Button variant="outline" onClick={reset} size="lg" className="flex-1">
                Limpar
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* QR Code Display */}
      {qrCodeUrl && (
        <section aria-labelledby="qr-display" className="max-w-2xl mx-auto mt-8">
          <div className="space-y-6">
            {/* Success Banner */}
            <div className="p-4 border rounded-lg border-emerald-200 bg-emerald-50 dark:bg-emerald-950/20 dark:border-emerald-800">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                  <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h4 className="font-semibold text-emerald-800 dark:text-emerald-200">QR Code Gerado!</h4>
              </div>
              <div className="flex flex-col gap-3 mt-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-emerald-700 dark:text-emerald-300">
                  Seu QR code está pronto para download e compartilhamento.
                </p>
                <Button
                  onClick={downloadQRCode}
                  size="sm"
                  className="w-full text-white bg-emerald-600 sm:w-auto hover:bg-emerald-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Baixar
                </Button>
              </div>
            </div>

            {/* QR Code Display */}
            <div className="flex justify-center">
              <div className="relative p-6 bg-white shadow-lg rounded-xl dark:bg-gray-900">
                <div className="relative">
                  {/* biome-ignore lint/performance/noImgElement: <Required for QR code display> */}
                  <img src={qrCodeUrl} alt="QR Code gerado" className="w-64 h-64" />
                </div>
                <div className="mt-4 text-center">
                  <p className="text-xs break-all text-muted-foreground">{url}</p>
                </div>
              </div>
            </div>

            {/* Usage Tips */}
            <Alert className="text-blue-800 border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-800 dark:text-blue-200">
              <QrCode className="w-4 h-4 text-blue-600" />
              <AlertTitle>Dicas de QR Code</AlertTitle>
              <AlertDescription className="text-blue-700 dark:text-blue-300">
                <ul className="mt-2 space-y-1 text-sm list-disc list-inside">
                  <li>Escaneie com qualquer app leitor de QR code no seu celular</li>
                  <li>Imprima para uso físico (cartazes, cartões de visita, etc.)</li>
                  <li>Teste o QR code antes de compartilhar para garantir que funciona</li>
                  <li>Mantenha URLs curtas para melhor legibilidade do QR code</li>
                </ul>
              </AlertDescription>
            </Alert>
          </div>
        </section>
      )}

      {/* Warning for empty state */}
      {!qrCodeUrl && (
        <Alert className="max-w-2xl mx-auto mt-6 text-yellow-800 border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20 dark:border-yellow-800 dark:text-yellow-200">
          <AlertTriangle className="w-4 h-4 text-yellow-600" />
          <AlertTitle>Começando</AlertTitle>
          <AlertDescription className="text-yellow-700 dark:text-yellow-300">
            Insira uma URL válida acima e clique em "Gerar QR Code" para criar seu QR code. Certifique-se de incluir o protocolo
            (http:// ou https://).
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
