"use client";

import { toast } from "sonner";
import Link from "next/link";
import { useState } from "react";
import { JOB_TYPES } from "@workspace/types";
import { Button } from "@workspace/ui/components/button";
import { Progress } from "@workspace/ui/components/progress";
import { useFileUpload } from "@/modules/common/hooks/use-file-upload";
import { useCreateJob } from "@/modules/dashboard/hooks/use-create-job";
import { useJob } from "@/modules/dashboard/hooks/use-job";
import { FileUpload } from "@/modules/common/ui/components/file-upload";
import { Alert, AlertDescription, AlertTitle } from "@workspace/ui/components/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Loader2, Download, FileIcon, RefreshCw, CheckCircle, AlertTriangle } from "lucide-react";

export default function AdvancedPdfCompressor() {
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

    setFile(selectedFile);
    setFileKey(null);
    setJobId(null);

    try {
      const { fileKey } = await uploadFile(selectedFile);
      setFileKey(fileKey);
      toast.success("File uploaded successfully");
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to upload file");
      setFile(null);
      setFileKey(null);
    }
  };

  const handleCompress = async () => {
    if (!fileKey) return;

    try {
      const result = await createJobMutation.mutateAsync({
        tool: JOB_TYPES.ADVANCED_COMPRESS_PDF,
        inputFile: fileKey,
        metadata: {},
      });
      setJobId(result.jobId);
    } catch (error) {
      console.error("Job creation failed:", error);
      toast.error("Failed to start compression");
    }
  };

  const handleReset = () => {
    setFile(null);
    setFileKey(null);
    setJobId(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Warning Alert */}
      <Alert
        variant="destructive"
        className="text-orange-900 border-orange-200 bg-orange-50 dark:bg-orange-950 dark:text-orange-200 dark:border-orange-900"
      >
        <AlertTriangle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
        <AlertTitle className="font-semibold text-orange-800 dark:text-orange-300">Irreversible Quality Loss</AlertTitle>
        <AlertDescription className="font-semibold">
          This tool uses aggressive algorithms to minimize file size. Images will be downsampled and fonts may be subset.
          <span className="font-bold"> Not recommended for professional printing.</span>
        </AlertDescription>
      </Alert>

      {status === "idle" && (
        <FileUpload
          onFilesSelected={handleFilesSelected}
          acceptedFileTypes={["application/pdf"]}
          maxFiles={1}
          maxFileSize={50}
          label="Upload PDF for Maximum Compression"
          description="Drag and drop your PDF here (Up to 50MB). Best for sharing large docs via email."
        />
      )}

      {status === "uploading" && (
        <div className="py-10 space-y-4 text-center">
          <div className="flex items-center justify-center p-4 mx-auto rounded-full bg-primary/10 w-fit">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Uploading...</h3>
            <p className="text-sm text-muted-foreground">Please wait while we secure your file</p>
          </div>
          <Progress value={uploadProgress} className="h-2 max-w-md mx-auto" />
        </div>
      )}

      {status === "uploaded" && file && (
        <div className="grid gap-8">
          <div className="max-w-4xl md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm tracking-wide uppercase text-muted-foreground">Target File</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <FileIcon className="w-8 h-8 text-red-500 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="max-w-4xl space-y-6 md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Maximum Compression Enabled</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  The file will be processed using our most aggressive multi-pass algorithm (Ghostscript + qpdf + Image
                  Optimization).
                </p>
                <div className="flex flex-col mt-6 space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <Button variant="outline" onClick={handleReset} className="flex-1" size={"lg"}>
                    Cancel
                  </Button>
                  <Button onClick={handleCompress} className="flex-1" size="lg">
                    Compress PDF Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {status === "compressing" && (
        <div className="py-10 space-y-6 text-center">
          <div className="relative flex items-center justify-center mx-auto w-fit">
            <div className="absolute inset-0 rounded-full animate-ping bg-primary/20"></div>
            <div className="relative p-4 rounded-full bg-primary/10">
              <RefreshCw className="w-8 h-8 animate-spin text-primary" />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Crunching your PDF...</h3>
            <p className="mt-2 text-sm text-muted-foreground">Running extreme multi-pass optimization algorithm.</p>
            <p className="mt-1 text-xs text-muted-foreground">This might take a minute.</p>
          </div>
        </div>
      )}

      {status === "completed" && (
        <div className="py-6 space-y-8 text-center">
          <div className="flex items-center justify-center p-4 mx-auto bg-green-100 rounded-full dark:bg-green-900/20 w-fit">
            <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-500" />
          </div>

          <div>
            <h3 className="text-2xl font-bold">Optimization Complete!</h3>
            <p className="mt-2 text-muted-foreground">Your file is ready for download.</p>
          </div>

          {jobData?.metadata?.reductionPercentage && (
            <div className="grid max-w-sm grid-cols-2 gap-4 mx-auto">
              <div className="p-4 border border-green-100 rounded-lg bg-green-50 dark:bg-green-900/10 dark:border-green-800">
                <p className="text-xs tracking-wider text-green-700 uppercase dark:text-green-400">New Size</p>
                <p className="text-xl font-bold text-green-600 dark:text-green-500">
                  {(Number(jobData.metadata.compressedSize) / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <div className="p-4 border border-green-100 rounded-lg bg-green-50 dark:bg-green-900/10 dark:border-green-800">
                <p className="text-xs tracking-wider text-green-700 uppercase dark:text-green-400">Saved</p>
                <p className="text-xl font-bold text-green-600 dark:text-green-500">{jobData.metadata.reductionPercentage}%</p>
              </div>
            </div>
          )}

          <div className="flex flex-col max-w-sm mx-auto space-y-3">
            {jobData?.downloadUrl && (
              <Button asChild className="w-full h-12 text-lg shadow-lg" size="lg">
                <Link href={jobData.downloadUrl} download="compressed.pdf" rel="noopener noreferrer">
                  <Download className="w-5 h-5 mr-2" />
                  Download Result
                </Link>
              </Button>
            )}
            <Button size={"lg"} variant="ghost" onClick={handleReset} className="w-full">
              Compress Another File
            </Button>
          </div>
        </div>
      )}

      {status === "failed" && (
        <div className="py-10 space-y-6 text-center">
          <div className="flex items-center justify-center p-4 mx-auto rounded-full bg-destructive/10 w-fit">
            <AlertTriangle className="w-8 h-8 text-destructive" />
          </div>
          <h3 className="text-xl font-semibold text-destructive">Optimization Failed</h3>
          <p className="max-w-md mx-auto text-sm text-muted-foreground">
            {jobData?.error || "We expected the file to be smaller, but it wasn't. The original file has been preserved."}
          </p>
          <Button onClick={handleReset} className="w-full max-w-xs mx-auto">
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
}
