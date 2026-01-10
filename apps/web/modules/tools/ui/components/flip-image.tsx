"use client";

import React from "react";
import { toast } from "sonner";
import Image from "next/image";
import { useState, useCallback, useRef } from "react";
import { Button } from "@workspace/ui/components/button";
import { Label } from "@workspace/ui/components/label";
import { Progress } from "@workspace/ui/components/progress";
import { FileUpload } from "@/modules/common/ui/components/file-upload";
import { Alert, AlertTitle, AlertDescription } from "@workspace/ui/components/alert";
import { BackgroundElements } from "@/modules/common/ui/components/background-elements";
import { Download, Loader2, ImageIcon, Trash2, FlipHorizontal, FlipVertical, RotateCcw, CheckCircle } from "lucide-react";

interface FlippedImage {
  blob: Blob;
  url: string;
  fileName: string;
  flipType: "horizontal" | "vertical" | "both";
}

export default function FlipImage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [flipType, setFlipType] = useState<"horizontal" | "vertical" | "both">("horizontal");
  const [flippedImage, setFlippedImage] = useState<FlippedImage | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
  };

  const cleanup = useCallback(() => {
    if (imageSrc) {
      URL.revokeObjectURL(imageSrc);
      setImageSrc(null);
    }
    if (flippedImage) {
      URL.revokeObjectURL(flippedImage.url);
      setFlippedImage(null);
    }
  }, [imageSrc, flippedImage]);

  const handleFileSelect = useCallback(
    (files: File[]) => {
      if (files.length === 0) return;

      const file = files[0];
      if (!file) return;

      // Check if it's an image
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file.");
        return;
      }

      cleanup();
      setSelectedFile(file);
      setFlippedImage(null);

      const url = URL.createObjectURL(file);
      setImageSrc(url);
    },
    [cleanup],
  );

  const flipImage = useCallback(async (imageSrc: string, flipType: "horizontal" | "vertical" | "both"): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const image = new window.Image();
      image.crossOrigin = "anonymous";
      image.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) {
          reject(new Error("Canvas not available"));
          return;
        }

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Canvas context not available"));
          return;
        }

        canvas.width = image.width;
        canvas.height = image.height;

        // Save the context state
        ctx.save();

        // Apply flip transformations
        if (flipType === "horizontal" || flipType === "both") {
          ctx.scale(-1, 1);
          ctx.translate(-canvas.width, 0);
        }
        if (flipType === "vertical" || flipType === "both") {
          ctx.scale(1, -1);
          ctx.translate(0, -canvas.height);
        }

        // Draw the image
        ctx.drawImage(image, 0, 0);

        // Restore the context state
        ctx.restore();

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("Failed to create blob"));
            }
          },
          "image/jpeg",
          0.95,
        );
      };
      image.onerror = () => reject(new Error("Failed to load image"));
      image.src = imageSrc;
    });
  }, []);

  const handleFlip = useCallback(async () => {
    if (!imageSrc || !selectedFile) return;

    setIsProcessing(true);

    try {
      const flippedBlob = await flipImage(imageSrc, flipType);
      const flippedUrl = URL.createObjectURL(flippedBlob);

      const fileName = `${selectedFile.name.replace(/\.[^/.]+$/, "")}_flipped_${flipType}.jpg`;

      setFlippedImage({
        blob: flippedBlob,
        url: flippedUrl,
        fileName,
        flipType,
      });

      toast.success(`Image flipped ${flipType === "both" ? "horizontally and vertically" : flipType}!`);
    } catch (error) {
      console.error("Error flipping image:", error);
      toast.error("Failed to flip image. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }, [imageSrc, selectedFile, flipType, flipImage]);

  const downloadFlippedImage = useCallback(() => {
    if (!flippedImage) return;

    const link = document.createElement("a");
    link.href = flippedImage.url;
    link.download = flippedImage.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Image downloaded!");
  }, [flippedImage]);

  const resetFlip = useCallback(() => {
    cleanup();
    setSelectedFile(null);
    setFlipType("horizontal");
  }, [cleanup]);

  const flipOptions = [
    {
      type: "horizontal" as const,
      label: "Horizontal",
      icon: FlipHorizontal,
      description: "Flip left to right",
    },
    {
      type: "vertical" as const,
      label: "Vertical",
      icon: FlipVertical,
      description: "Flip top to bottom",
    },
    {
      type: "both" as const,
      label: "Both",
      icon: RotateCcw,
      description: "Flip both directions",
    },
  ];

  return (
    <div className="relative w-full overflow-hidden bg-background text-foreground">
      <BackgroundElements />

      <div className="container relative z-10 px-4 mx-auto">
        {/* Show upload interface only when no file selected */}
        {!selectedFile && (
          <section className="max-w-4xl mx-auto mb-8">
            <div className="space-y-4">
              <FileUpload
                onFilesSelected={handleFileSelect}
                acceptedFileTypes={["image/*"]}
                maxFiles={1}
                maxFileSize={50} // 50MB
              />
            </div>
          </section>
        )}

        {/* Main flipping interface with sidebar */}
        {selectedFile && !flippedImage && (
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Image Area */}
              <div className="lg:col-span-2 space-y-6">
                {/* File Info Header */}
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <ImageIcon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{selectedFile.name}</span>
                  <span className="text-sm text-muted-foreground">({formatFileSize(selectedFile.size)})</span>
                </div>

                {/* Image Preview */}
                {imageSrc && (
                  <div className="relative h-96 lg:h-125 bg-muted rounded-lg overflow-hidden">
                    <Image
                      src={imageSrc}
                      alt="Original"
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 100vw, 66vw"
                    />
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 justify-center">
                  <Button size="lg" onClick={handleFlip} disabled={isProcessing}>
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Flipping...
                      </>
                    ) : (
                      <>
                        {React.createElement(flipOptions.find((opt) => opt.type === flipType)?.icon || FlipHorizontal, {
                          className: "w-4 h-4",
                        })}
                        Flip {flipType === "both" ? "Both Ways" : flipType.charAt(0).toUpperCase() + flipType.slice(1)}
                      </>
                    )}
                  </Button>
                  <Button size="lg" variant="outline" onClick={resetFlip}>
                    <Trash2 className="size-4" />
                    Reset
                  </Button>
                </div>

                {/* Processing Progress */}
                {isProcessing && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Processing image...</span>
                    </div>
                    <Progress value={100} className="w-full h-2" />
                  </div>
                )}
              </div>

              {/* Sidebar Controls */}
              <div className="lg:col-span-1">
                <div className="sticky top-8 space-y-6">
                  {/* Flip Settings */}
                  <div className="bg-card border rounded-lg p-6 space-y-6">
                    <div className="flex items-center gap-2">
                      <FlipHorizontal className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-semibold">Flip Settings</h3>
                    </div>

                    {/* Flip Direction Selection */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Flip Direction</Label>
                      <div className="space-y-2">
                        {flipOptions.map((option) => {
                          const Icon = option.icon;
                          return (
                            <Button
                              key={option.type}
                              variant={flipType === option.type ? "default" : "outline"}
                              className="w-full justify-start gap-3 h-auto p-3"
                              onClick={() => setFlipType(option.type)}
                            >
                              <Icon className="w-4 h-4 shrink-0" />
                              <div className="text-left">
                                <div className="font-medium">{option.label}</div>
                                <div className="text-xs opacity-70">{option.description}</div>
                              </div>
                            </Button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Preview Info */}
                    <div className="space-y-2 p-3 bg-muted rounded-lg">
                      <h4 className="text-sm font-medium">Selected Flip</h4>
                      <div className="text-xs text-muted-foreground">
                        {flipOptions.find((opt) => opt.type === flipType)?.description}
                      </div>
                    </div>
                  </div>

                  {/* Tips */}
                  <Alert>
                    <CheckCircle className="w-4 h-4" />
                    <AlertTitle>Flipping Tips</AlertTitle>
                    <AlertDescription className="text-sm">
                      <ul className="mt-2 space-y-1">
                        <li>• Horizontal flip mirrors left to right</li>
                        <li>• Vertical flip mirrors top to bottom</li>
                        <li>• Both flips both directions</li>
                        <li>• Original file remains unchanged</li>
                      </ul>
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results - Always show when available */}
        {flippedImage && (
          <section className="max-w-4xl mx-auto my-8">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <h2 className="text-xl font-semibold">Flipped Image</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Original */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Original</h3>
                  <div className="relative min-h-50 max-h-100 bg-muted rounded-lg overflow-hidden">
                    <Image
                      src={imageSrc || ""}
                      alt="Original"
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>

                {/* Flipped */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Flipped ({flippedImage.flipType.charAt(0).toUpperCase() + flippedImage.flipType.slice(1)})
                  </h3>
                  <div className="relative min-h-50 max-h-100 bg-muted rounded-lg overflow-hidden">
                    <Image
                      src={flippedImage.url}
                      alt="Flipped"
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <ImageIcon className="w-4 h-4 text-muted-foreground shrink-0" />
                  <div className="min-w-0 flex-1">
                    <span className="text-sm font-medium block truncate">{flippedImage.fileName}</span>
                    <span className="text-sm text-muted-foreground">({formatFileSize(flippedImage.blob.size)})</span>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button onClick={downloadFlippedImage} className="gap-2">
                    <Download className="size-4" />
                    Download
                  </Button>
                  <Button variant="secondary" onClick={resetFlip} className="gap-2">
                    <Trash2 className="size-4" />
                    Reset
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Hidden Canvas for Processing */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}
