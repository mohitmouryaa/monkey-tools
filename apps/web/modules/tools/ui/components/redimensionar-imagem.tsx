"use client";

import { toast } from "sonner";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { useState, useRef, useCallback } from "react";
import { Switch } from "@workspace/ui/components/switch";
import { Progress } from "@workspace/ui/components/progress";
import { FileUpload } from "@/modules/common/ui/components/file-upload";
import { Download, RotateCcw, Loader2, AlertTriangle } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@workspace/ui/components/radio-group";
import { Alert, AlertTitle, AlertDescription } from "@workspace/ui/components/alert";

interface ResizeOptions {
  width: number;
  height: number;
  maintainAspectRatio: boolean;
  resizeMode: "fit" | "fill" | "stretch";
}

export default function ResizeImage() {
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resizedUrl, setResizedUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [originalDimensions, setOriginalDimensions] = useState<{ width: number; height: number } | null>(null);
  const [resizeOptions, setResizeOptions] = useState<ResizeOptions>({
    width: 800,
    height: 600,
    maintainAspectRatio: true,
    resizeMode: "fit",
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
  };

  const cleanup = useCallback(() => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (resizedUrl) {
      URL.revokeObjectURL(resizedUrl);
      setResizedUrl(null);
    }
  }, [previewUrl, resizedUrl]);

  const handleFileSelect = useCallback(
    (files: File[]) => {
      if (files.length === 0) return;

      const file = files[0];

      if (!file) return;

      cleanup();
      setSelectedFile(file);
      setError(null);
      setResizedUrl(null);

      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      // Get original dimensions
      const img = new Image();
      img.onload = () => {
        setOriginalDimensions({ width: img.width, height: img.height });
        // Set initial resize dimensions to original if maintaining aspect ratio
        if (resizeOptions.maintainAspectRatio) {
          setResizeOptions((prev) => ({
            ...prev,
            width: img.width,
            height: img.height,
          }));
        }
        URL.revokeObjectURL(url);
      };
      img.src = url;
    },
    [cleanup, resizeOptions.maintainAspectRatio],
  );

  const resizeImage = useCallback(async () => {
    if (!selectedFile || !originalDimensions) return;

    setIsProcessing(true);
    setProgress(0);
    setError(null);

    try {
      const img = new Image();
      const canvas = canvasRef.current;
      if (!canvas) throw new Error("Canvas indisponível");

      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Contexto do canvas indisponível");

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Falha ao carregar a imagem"));
        img.src = URL.createObjectURL(selectedFile);
      });

      setProgress(30);

      const { width: targetWidth, height: targetHeight, resizeMode } = resizeOptions;

      let drawWidth = targetWidth;
      let drawHeight = targetHeight;
      let offsetX = 0;
      let offsetY = 0;

      if (resizeMode === "fit") {
        const scale = Math.min(targetWidth / img.width, targetHeight / img.height);
        drawWidth = img.width * scale;
        drawHeight = img.height * scale;
        offsetX = (targetWidth - drawWidth) / 2;
        offsetY = (targetHeight - drawHeight) / 2;
      } else if (resizeMode === "fill") {
        const scale = Math.max(targetWidth / img.width, targetHeight / img.height);
        drawWidth = img.width * scale;
        drawHeight = img.height * scale;
        offsetX = (targetWidth - drawWidth) / 2;
        offsetY = (targetHeight - drawHeight) / 2;
      }
      // stretch mode uses targetWidth and targetHeight directly

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      setProgress(60);

      // Clear canvas with transparent background
      ctx.clearRect(0, 0, targetWidth, targetHeight);

      // Draw the image
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

      setProgress(90);

      canvas.toBlob(
        (blob: Blob | null) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            setResizedUrl(url);
            setProgress(100);
            toast.success("Imagem redimensionada com sucesso!");
          } else {
            throw new Error("Falha ao gerar a imagem redimensionada");
          }
          setIsProcessing(false);
        },
        selectedFile.type,
        0.9,
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao redimensionar a imagem");
      setIsProcessing(false);
      setProgress(0);
    }
  }, [selectedFile, originalDimensions, resizeOptions]);

  const handleDimensionChange = useCallback(
    (dimension: "width" | "height", value: number) => {
      setResizeOptions((prev) => {
        const newOptions = { ...prev, [dimension]: value };

        if (prev.maintainAspectRatio && originalDimensions) {
          const aspectRatio = originalDimensions.width / originalDimensions.height;
          if (dimension === "width") {
            newOptions.height = Math.round(value / aspectRatio);
          } else {
            newOptions.width = Math.round(value * aspectRatio);
          }
        }

        return newOptions;
      });
    },
    [originalDimensions],
  );

  const handleDownload = useCallback(() => {
    if (!resizedUrl || !selectedFile) return;

    const link = document.createElement("a");
    link.href = resizedUrl;
    link.download = `resized-${selectedFile.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Imagem baixada!");
  }, [resizedUrl, selectedFile]);

  const resetForm = useCallback(() => {
    cleanup();
    setSelectedFile(null);
    setResizedUrl(null);
    setError(null);
    setOriginalDimensions(null);
    setProgress(0);
    setResizeOptions({
      width: 800,
      height: 600,
      maintainAspectRatio: true,
      resizeMode: "fit",
    });
  }, [cleanup]);

  return (
    <div className="w-full">
      {/* Upload Section */}
      <section aria-labelledby="upload-section" className="max-w-3xl mx-auto">
        {selectedFile === null ? (
          <FileUpload
            mode="accumulate"
            maxFiles={1}
            onFilesSelected={handleFileSelect}
            acceptedFileTypes={["image/*"]}
            label="Enviar Imagem"
            description="Selecione uma imagem para redimensionar"
            disclaimer="As imagens são processadas com segurança e não são armazenadas em nossos servidores"
          />
        ) : (
          <div className="space-y-6">
            {/* Files Info */}
            <div className="p-4 border rounded-xl bg-card">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                  <Download className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">1 imagem selecionada</h3>
                  <p className="text-sm text-muted-foreground">Tamanho: {formatFileSize(selectedFile.size)}</p>
                </div>
                <Button variant="outline" size="sm" onClick={resetForm} disabled={isProcessing}>
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Original Dimensions */}
            {originalDimensions && (
              <div className="p-4 border rounded-xl bg-card">
                <h4 className="mb-2 text-sm font-medium text-foreground">Dimensões Originais</h4>
                <p className="text-sm text-muted-foreground">
                  {originalDimensions.width} × {originalDimensions.height} pixels
                </p>
              </div>
            )}

            {/* Resize Options */}
            <div className="p-6 border rounded-xl bg-card">
              <h4 className="mb-4 text-sm font-medium text-foreground">Opções de Redimensionamento</h4>

              {/* Resize Mode */}
              <div className="mb-6 space-y-3">
                <Label className="text-sm font-medium text-foreground">Modo de Redimensionamento</Label>
                <RadioGroup
                  value={resizeOptions.resizeMode}
                  onValueChange={(value: "fit" | "fill" | "stretch") =>
                    setResizeOptions((prev) => ({ ...prev, resizeMode: value }))
                  }
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fit" id="fit" />
                    <Label htmlFor="fit" className="text-sm text-muted-foreground">
                      Ajustar (manter proporção, caber nas dimensões)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fill" id="fill" />
                    <Label htmlFor="fill" className="text-sm text-muted-foreground">
                      Preencher (manter proporção, preencher dimensões)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="stretch" id="stretch" />
                    <Label htmlFor="stretch" className="text-sm text-muted-foreground">
                      Esticar (ignorar proporção)
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Dimensions */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="width" className="text-sm font-medium text-foreground">
                    Largura (px)
                  </Label>
                  <Input
                    id="width"
                    type="number"
                    min="1"
                    max="4096"
                    value={resizeOptions.width}
                    onChange={(e) => handleDimensionChange("width", parseInt(e.target.value, 10) || 1)}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height" className="text-sm font-medium text-foreground">
                    Altura (px)
                  </Label>
                  <Input
                    id="height"
                    type="number"
                    min="1"
                    max="4096"
                    value={resizeOptions.height}
                    onChange={(e) => handleDimensionChange("height", parseInt(e.target.value, 10) || 1)}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Maintain Aspect Ratio */}
              <div className="flex items-center justify-between mb-6">
                <Label htmlFor="aspect-ratio" className="text-sm font-medium text-foreground">
                  Manter Proporção
                </Label>
                <Switch
                  id="aspect-ratio"
                  checked={resizeOptions.maintainAspectRatio}
                  onCheckedChange={(checked) => setResizeOptions((prev) => ({ ...prev, maintainAspectRatio: checked }))}
                />
              </div>

              {/* Action Button */}
              <Button onClick={resizeImage} disabled={!selectedFile || isProcessing} className="w-full">
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Redimensionando...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Redimensionar Imagem
                  </>
                )}
              </Button>

              {isProcessing && (
                <div className="mt-4 space-y-2">
                  <Progress value={progress} className="w-full" />
                  <p className="text-sm text-center text-muted-foreground">Processando... {progress}%</p>
                </div>
              )}
            </div>

            {/* Image Previews */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Original Image */}
              {previewUrl && (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-foreground">Imagem Original</h4>
                  <div className="relative overflow-hidden border-2 rounded-lg aspect-square border-border bg-muted">
                    {/** biome-ignore lint/performance/noImgElement: <Required image preview here> */}
                    <img src={previewUrl} alt="Original" className="absolute inset-0 object-contain" />
                  </div>
                </div>
              )}

              {/* Resized Image */}
              {resizedUrl && (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-foreground">Imagem Redimensionada</h4>
                  <div className="relative overflow-hidden border-2 rounded-lg aspect-square border-border bg-muted">
                    {/** biome-ignore lint/performance/noImgElement: <Required Image preview here> */}
                    <img src={resizedUrl} alt="Imagem redimensionada" className="absolute inset-0 object-contain" />
                  </div>
                  <Button onClick={handleDownload} className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Baixar Imagem Redimensionada
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {error && (
        <div className="max-w-3xl mx-auto mt-6">
          <Alert>
            <AlertTriangle className="w-4 h-4" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )}

      {/* How to Use */}
      <section className="max-w-3xl mx-auto mt-16"></section>

      {/* Hidden canvas for processing */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
