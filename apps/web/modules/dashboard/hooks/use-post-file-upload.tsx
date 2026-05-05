"use client";

import axios from "axios";
import { useState } from "react";

interface UploadResult {
  url: string; // URL pública final do S3 (para usar em src/img)
  fileKey: string; // path no bucket (p.ex. cms/uuid-name.png)
}

/**
 * Hook dedicado de upload para o admin de posts (CMS Blog).
 * NÃO reusa `useFileUpload` (público) por decisão P1 do plano fase-3.
 * Hardcoded `prefix: "cms"` no body do POST /api/upload.
 */
export const usePostFileUpload = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (file: File): Promise<UploadResult> => {
    setIsUploading(true);
    setUploadProgress(0);
    setError(null);

    try {
      // 1. Get presigned URL (com prefix "cms")
      const { data } = await axios.post("/api/upload", {
        filename: file.name,
        contentType: file.type,
        prefix: "cms",
      });

      const { url, fileKey } = data as { url: string; fileKey: string };

      // 2. PUT direto no S3
      await axios.put(url, file, {
        headers: { "Content-Type": file.type },
        onUploadProgress: (p) => {
          const percent = Math.round((p.loaded * 100) / (p.total || 1));
          setUploadProgress(percent);
        },
      });

      // 3. URL pública final
      // Estratégia: o bucket é configurado public-read (ACL no PutObjectCommand
      // em packages/storage e `mc anonymous set public` em docker-compose), e o
      // S3Client usa `forcePathStyle: true`. Logo, a presigned URL tem o shape
      // `${endpoint}/${bucket}/${key}?X-Amz-...` e remover a query string
      // retorna exatamente a URL pública canônica do objeto.
      const publicUrl = url.split("?")[0] ?? url;

      setIsUploading(false);
      return { url: publicUrl, fileKey };
    } catch (err) {
      console.error("Upload failed:", err);
      const msg = err instanceof Error ? err.message : "Upload failed";
      setError(msg);
      setIsUploading(false);
      throw err;
    }
  };

  return {
    uploadProgress,
    isUploading,
    error,
    uploadFile,
  };
};
