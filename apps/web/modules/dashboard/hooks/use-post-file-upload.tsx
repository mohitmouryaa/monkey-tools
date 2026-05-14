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
      // 1. Get presigned POST (com prefix "cms")
      const { data } = await axios.post("/api/upload", {
        filename: file.name,
        contentType: file.type,
        prefix: "cms",
      });

      const { url, fields, fileKey, publicUrl } = data as {
        url: string;
        fields: Record<string, string>;
        fileKey: string;
        publicUrl: string;
      };

      // 2. POST multipart direto pro S3. Sem header Content-Type explícito —
      // axios injeta multipart/form-data com boundary, que é "simple request"
      // e não dispara preflight CORS (ver packages/storage/src/index.ts).
      const formData = new FormData();
      for (const [k, v] of Object.entries(fields)) formData.append(k, v);
      formData.append("file", file);

      await axios.post(url, formData, {
        onUploadProgress: (p) => {
          const percent = Math.round((p.loaded * 100) / (p.total || 1));
          setUploadProgress(percent);
        },
      });

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
