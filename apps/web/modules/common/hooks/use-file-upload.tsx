"use client";

import axios from "axios";
import { useState } from "react";

export const useFileUpload = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);
    setError(null);

    try {
      // 1. Get presigned POST (url + fields).
      const { data } = await axios.post("/api/upload", {
        filename: file.name,
        contentType: file.type,
      });

      const { url, fields, fileKey } = data as {
        url: string;
        fields: Record<string, string>;
        fileKey: string;
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
      return { url, fileKey };
    } catch (err) {
      console.error("Falha no upload:", err);
      setError(err instanceof Error ? err.message : "Falha no upload");
      setIsUploading(false);
      throw err;
    }
  };

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    await uploadFile(file);
  }

  return {
    uploadProgress,
    isUploading,
    error,
    uploadFile,
    handleUpload,
  };
};
