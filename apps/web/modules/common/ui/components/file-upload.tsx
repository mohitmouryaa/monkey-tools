"use client";

import { cn } from "@workspace/ui/lib/utils";
import { useCallback, useState } from "react";
import { Upload, FileText, AlertCircle, Shield, X } from "lucide-react";

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  acceptedFileTypes?: string[];
  maxFiles?: number;
  maxFileSize?: number; // in MB
  className?: string;
  disabled?: boolean;
  label?: string;
  description?: string;
  disclaimer?: string;
  mode?: "accumulate" | "append";
}

interface FileWithPreview extends File {
  id: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFilesSelected,
  acceptedFileTypes = ["image/*", "application/pdf"],
  maxFiles = 5,
  maxFileSize = 10,
  className,
  disabled = false,
  label = "Arraste seu arquivo aqui",
  description = "ou clique para selecionar",
  disclaimer = "Seus arquivos são criptografados e apagados automaticamente após 1 hora.",
  mode = "accumulate",
}) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string>("");

  const validateFile = useCallback(
    (file: File): string | null => {
      if (file.size > maxFileSize * 1024 * 1024) {
        return `O tamanho do arquivo deve ser menor que ${maxFileSize}MB`;
      }
      const isAccepted = acceptedFileTypes.some((type) => {
        if (type.includes("*")) {
          const baseType = type.split("/")[0] ?? "";
          return file.type.startsWith(baseType);
        }
        return file.type === type;
      });
      if (!isAccepted) {
        return `Tipo de arquivo não suportado. Tipos aceitos: ${acceptedFileTypes.join(", ")}`;
      }
      return null;
    },
    [acceptedFileTypes, maxFileSize],
  );

  const processFiles = useCallback(
    (fileList: FileList) => {
      setError("");
      const newFiles: FileWithPreview[] = [];
      const errors: string[] = [];

      Array.from(fileList).forEach((file) => {
        const validationError = validateFile(file);
        if (validationError) {
          errors.push(`${file.name}: ${validationError}`);
          return;
        }
        if (mode === "accumulate" && files.length + newFiles.length >= maxFiles) {
          errors.push(`Máximo de ${maxFiles} arquivos permitidos`);
          return;
        }
        const fileWithPreview: FileWithPreview = Object.assign(file, {
          id: `${file.name}-${Date.now()}-${Math.random()}`,
        });
        newFiles.push(fileWithPreview);
      });

      if (errors.length > 0) {
        setError(errors.join("; "));
      }

      if (newFiles.length > 0) {
        if (mode === "accumulate") {
          const updatedFiles = [...files, ...newFiles];
          setFiles(updatedFiles);
          onFilesSelected(updatedFiles);
        } else {
          onFilesSelected(newFiles);
        }
      }
    },
    [files, maxFiles, validateFile, onFilesSelected, mode],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      if (disabled) return;
      const droppedFiles = e.dataTransfer.files;
      if (droppedFiles.length > 0) {
        processFiles(droppedFiles);
      }
    },
    [disabled, processFiles],
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (!disabled) setIsDragOver(true);
    },
    [disabled],
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        processFiles(e.target.files);
      }
    },
    [processFiles],
  );

  const removeFile = useCallback(
    (fileId: string) => {
      setFiles((prev) => {
        const updated = prev.filter((f) => f.id !== fileId);
        onFilesSelected(updated);
        return updated;
      });
    },
    [onFilesSelected],
  );

  const formatFileSize = (bytes: number) => {
    if (!bytes || Number.isNaN(bytes) || bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
  };

  return (
    <div className={cn("w-full", className)}>
      <label
        htmlFor="file-upload-input"
        className={cn(
          "upload-zone block",
          isDragOver && "dragging",
          disabled && "opacity-50 cursor-not-allowed",
          error && "border-destructive bg-destructive/5",
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          id="file-upload-input"
          type="file"
          multiple
          accept={acceptedFileTypes.join(",")}
          onChange={handleFileInput}
          disabled={disabled}
          className="hidden"
          aria-describedby="file-upload-description"
        />
        <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
        <p className="text-lg font-medium text-foreground mb-1">{label}</p>
        <p id="file-upload-description" className="text-sm text-muted-foreground">
          {description}
        </p>
      </label>

      {error && (
        <div className="flex items-center gap-2 p-3 mt-4 text-sm border rounded-lg text-destructive bg-destructive/10 border-destructive/20">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {files.length > 0 && (
        <div className="mt-6 space-y-3">
          {files.map((file) => (
            <div key={file.id} className="flex items-center justify-between bg-secondary rounded-xl px-4 py-3">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground truncate max-w-[200px] md:max-w-[400px]">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeFile(file.id)}
                className="p-1 rounded-lg hover:bg-accent transition-colors"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          ))}
        </div>
      )}

      {disclaimer && (
        <div className="flex items-center justify-center gap-2 mt-8 text-xs text-muted-foreground">
          <Shield className="h-4 w-4" />
          <span>{disclaimer}</span>
        </div>
      )}
    </div>
  );
};
