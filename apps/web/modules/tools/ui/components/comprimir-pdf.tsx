"use client";

import { toast } from "sonner";
import Link from "next/link";
import { useState, useEffect } from "react";
import { JOB_TYPES } from "@workspace/types";
import { Button } from "@workspace/ui/components/button";
import { Progress } from "@workspace/ui/components/progress";
import { useFileUpload } from "@/modules/common/hooks/use-file-upload";
import { useCreateJob } from "@/modules/dashboard/hooks/use-create-job";
import { useJob } from "@/modules/dashboard/hooks/use-job";
import { FileUpload } from "@/modules/common/ui/components/file-upload";
import { Loader2, Download, FileIcon, RefreshCw, CheckCircle } from "lucide-react";

export default function CompressPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [fileKey, setFileKey] = useState<string | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);

  const { uploadFile, uploadProgress } = useFileUpload();
  const createJobMutation = useCreateJob();
  const { data: jobData, isLoading: isJobLoading } = useJob(jobId);

  // Derive status from job data
  const getStatus = () => {
    if (!file && !fileKey) return "idle";
    if (uploadProgress < 100) return "uploading";
    if (uploadProgress === 100 && !jobId) return "uploaded";
    if (jobData?.status === "COMPLETED") return "completed";
    if (jobData?.status === "FAILED") return "failed";
    if (jobId && (isJobLoading || jobData?.status === "IN_PROGRESS")) return "compressing";
    return "idle";
  };

  const status = getStatus();

  const handleFilesSelected = async (files: File[]) => {
    if (files.length === 0) return;
    const selectedFile = files[0];
    if (!selectedFile) return;

    // Reset state for new file
    setFile(selectedFile);
    setFileKey(null);
    setJobId(null);

    try {
      const { fileKey } = await uploadFile(selectedFile);

      setFileKey(fileKey);
      toast.success("Arquivo enviado com sucesso");
    } catch (error) {
      console.error("Falha no upload:", error);
      toast.error("Falha ao enviar arquivo");
      setFile(null);
      setFileKey(null);
    }
  };

  const handleCompress = async () => {
    if (!fileKey) return;

    try {
      const result = await createJobMutation.mutateAsync({
        tool: JOB_TYPES.COMPRESS_PDF,
        inputFile: fileKey,
        metadata: {
          compressionLevel: "medium",
        },
      });
      setJobId(result.jobId);
    } catch (error) {
      console.error("Job creation failed:", error);
      toast.error("Falha ao iniciar compressão");
    }
  };

  // Handle job completion notifications
  useEffect(() => {
    if (jobData?.status === "COMPLETED") {
      toast.success("Compressão concluída!");
    } else if (jobData?.status === "FAILED") {
      toast.error("Falha na compressão");
    }
  }, [jobData?.status]);

  const handleReset = () => {
    setFile(null);
    setFileKey(null);
    setJobId(null);
  };

  return (
    <div className="w-full">
      {status === "idle" && (
        <FileUpload
          onFilesSelected={handleFilesSelected}
          acceptedFileTypes={["application/pdf"]}
          maxFiles={1}
          maxFileSize={50}
          label="Enviar PDF"
          description="Arraste e solte seu PDF aqui"
        />
      )}

      {status === "uploading" && (
        <div className="space-y-4 text-center">
          <div className="flex items-center justify-center p-4 rounded-full bg-primary/10 mx-auto w-fit">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
          <h3 className="text-xl font-semibold">Enviando...</h3>
          <Progress value={uploadProgress} className="h-2" />
          <p className="text-sm text-muted-foreground">{uploadProgress}% enviado</p>
        </div>
      )}

      {status === "uploaded" && file && (
        <div className="space-y-6">
          <div className="flex items-center max-w-full p-4 space-x-4 border rounded-lg border-border bg-secondary">
            <FileIcon className="w-8 h-8 text-red-500 shrink-0" />
            <div className="flex-1 min-w-0 text-left">
              <p className="font-medium truncate">{file.name}</p>
              <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          </div>

          <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Button variant="outline" onClick={handleReset} className="flex-1">
              Cancelar
            </Button>
            <Button onClick={handleCompress} className="flex-1">
              Comprimir PDF
            </Button>
          </div>
        </div>
      )}

      {status === "compressing" && (
        <div className="space-y-4 text-center">
          <div className="flex items-center justify-center p-4 rounded-full bg-primary/10 mx-auto w-fit">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
          <h3 className="text-xl font-semibold">Comprimindo PDF...</h3>
          <p className="text-sm text-muted-foreground">Isso pode levar alguns instantes</p>
        </div>
      )}

      {status === "completed" && (
        <div className="space-y-6 text-center">
          <div className="flex items-center justify-center p-4 rounded-full bg-primary/10 mx-auto w-fit">
            <CheckCircle className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">Compressão Concluída!</h3>

          <div className="flex flex-col space-y-3">
            {jobData?.downloadUrl && (
              <Button asChild className="w-full" size="lg">
                <Link href={jobData.downloadUrl} download="compress-pdf.pdf" rel="noopener noreferrer">
                  <Download className="w-4 h-4 mr-2" />
                  Baixar PDF Comprimido
                </Link>
              </Button>
            )}
            <Button variant="outline" onClick={handleReset} className="w-full">
              <RefreshCw className="w-4 h-4 mr-2" />
              Comprimir Outro Arquivo
            </Button>
          </div>
        </div>
      )}

      {status === "failed" && (
        <div className="space-y-6 text-center">
          <div className="flex items-center justify-center p-4 rounded-full bg-destructive/10 mx-auto w-fit">
            <RefreshCw className="w-8 h-8 text-destructive" />
          </div>
          <h3 className="text-xl font-semibold text-destructive">Algo deu errado</h3>
          <p className="text-sm text-muted-foreground">Falha ao processar seu arquivo. Tente novamente.</p>
          <Button onClick={handleReset} className="w-full">
            Tentar Novamente
          </Button>
        </div>
      )}
    </div>
  );
}
