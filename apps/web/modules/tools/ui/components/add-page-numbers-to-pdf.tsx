"use client";

import { toast } from "sonner";
import { useState } from "react";
import { JOB_TYPES } from "@workspace/types";
import { Card } from "@workspace/ui/components/card";
import { Label } from "@workspace/ui/components/label";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { useJob } from "@/modules/dashboard/hooks/use-job";
import { Progress } from "@workspace/ui/components/progress";
import { useFileUpload } from "@/modules/common/hooks/use-file-upload";
import { useCreateJob } from "@/modules/dashboard/hooks/use-create-job";
import { FileUpload } from "@/modules/common/ui/components/file-upload";
import { Loader2, Download, FileIcon, RefreshCw, Hash, AlertCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";

interface PageNumberSettings {
  position: string;
  startFrom: number;
  format: string;
  fontSize: number;
  margin: number;
}

export default function AddPageNumbersToPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [fileKey, setFileKey] = useState<string | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);

  const [settings, setSettings] = useState<PageNumberSettings>({
    position: "bottom-center",
    startFrom: 1,
    format: "page-n",
    fontSize: 12,
    margin: 20,
  });

  const { uploadFile, uploadProgress } = useFileUpload();
  const createJobMutation = useCreateJob();
  const { data: jobData, isLoading: isJobLoading } = useJob(jobId);

  // Derive status
  const getStatus = () => {
    if (!file && !fileKey) return "idle";
    if (uploadProgress < 100) return "uploading";
    if (uploadProgress === 100 && !jobId) return "uploaded";
    if (jobData?.status === "COMPLETED") return "completed";
    if (jobData?.status === "FAILED") return "failed";
    if (jobId && (isJobLoading || jobData?.status === "IN_PROGRESS")) return "processing";
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

  const handleStartJob = async () => {
    if (!fileKey) return;

    try {
      const result = await createJobMutation.mutateAsync({
        tool: JOB_TYPES.ADD_PAGE_NUMBERS_PDF,
        inputFile: fileKey,
        metadata: settings,
      });
      setJobId(result.jobId);
    } catch (error) {
      console.error("Job creation failed:", error);
      toast.error("Failed to process PDF");
    }
  };

  const handleReset = () => {
    setFile(null);
    setFileKey(null);
    setJobId(null);
  };

  return (
    <div className="relative w-full min-h-screen bg-background text-foreground">

        <div className="max-w-3xl mx-auto space-y-8">
          <Card className="p-6 border shadow-xl bg-card">
            {status === "idle" && (
              <FileUpload
                onFilesSelected={handleFilesSelected}
                acceptedFileTypes={["application/pdf"]}
                maxFiles={1}
                maxFileSize={50}
                label="Upload PDF"
                description="Drag and drop your PDF here"
              />
            )}

            {status === "uploading" && (
              <div className="py-8 space-y-6">
                <div className="flex justify-center">
                  <div className="p-4 rounded-full bg-primary/10">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                </div>
                <div className="space-y-2 text-center">
                  <h3 className="text-xl font-semibold">Uploading...</h3>
                  <p className="text-sm text-muted-foreground">Please wait while we upload your file.</p>
                </div>
                <Progress value={uploadProgress} className="h-2 max-w-sm mx-auto" />
              </div>
            )}

            {(status === "uploaded" || status === "processing" || status === "completed" || status === "failed") && file && (
              <div className="space-y-6">
                {/* File Info */}
                <div className="flex items-center p-4 border rounded-lg bg-secondary">
                  <FileIcon className="w-8 h-8 mr-4 text-red-500" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{file.name}</p>
                    <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleReset} disabled={status === "processing"}>
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>

                {/* Settings Form - Only show if not completed/failed */}
                {(status === "uploaded" || status === "processing") && (
                  <div className="grid gap-6 p-4 border rounded-lg md:grid-cols-2 bg-background/50">
                    <div className="space-y-2">
                      <Label>Position</Label>
                      <Select
                        value={settings.position}
                        onValueChange={(v) => setSettings({ ...settings, position: v })}
                        disabled={status === "processing"}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bottom-center">Bottom Center</SelectItem>
                          <SelectItem value="bottom-right">Bottom Right</SelectItem>
                          <SelectItem value="bottom-left">Bottom Left</SelectItem>
                          <SelectItem value="top-center">Top Center</SelectItem>
                          <SelectItem value="top-right">Top Right</SelectItem>
                          <SelectItem value="top-left">Top Left</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Format</Label>
                      <Select
                        value={settings.format}
                        onValueChange={(v) => setSettings({ ...settings, format: v })}
                        disabled={status === "processing"}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="n">1</SelectItem>
                          <SelectItem value="page-n">Page 1</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Start Numbering From</Label>
                      <Input
                        type="number"
                        min={1}
                        value={settings.startFrom}
                        onChange={(e) => setSettings({ ...settings, startFrom: parseInt(e.target.value, 10) || 1 })}
                        disabled={status === "processing"}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Margin (px)</Label>
                      <Input
                        type="number"
                        min={0}
                        max={100}
                        value={settings.margin}
                        onChange={(e) => setSettings({ ...settings, margin: parseInt(e.target.value, 10) || 0 })}
                        disabled={status === "processing"}
                      />
                    </div>
                  </div>
                )}

                {/* Actions */}
                {status === "uploaded" && (
                  <Button size="lg" className="w-full" onClick={handleStartJob}>
                    <Hash className="w-4 h-4 mr-2" />
                    Add Page Numbers
                  </Button>
                )}

                {status === "processing" && (
                  <div className="py-4 space-y-4 text-center">
                    <Loader2 className="w-8 h-8 mx-auto animate-spin text-primary" />
                    <p className="text-muted-foreground">Processing your PDF...</p>
                  </div>
                )}

                {status === "completed" && jobData?.outputFile && (
                  <div className="py-6 space-y-6">
                    {/* Success Icon - Minimal & Clean */}
                    <div className="flex justify-center">
                      <div className="relative">
                        <div className="p-4 rounded-2xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
                          <Hash className="w-10 h-10 text-green-600 dark:text-green-500" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Success Message - Clean Typography */}
                    <div className="text-center space-y-2">
                      <h3 className="text-2xl font-semibold text-foreground">Page Numbers Added!</h3>
                      <p className="text-sm text-muted-foreground max-w-md mx-auto">Your PDF has been processed successfully</p>
                    </div>

                    {/* File Info - Minimal Card */}
                    <div className="flex items-center gap-3 p-4 rounded-lg border bg-muted/30">
                      <div className="p-2 rounded-lg bg-background border">
                        <FileIcon className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{file?.name.replace(".pdf", "_numbered.pdf")}</p>
                        <p className="text-xs text-muted-foreground">Ready to download</p>
                      </div>
                    </div>

                    {/* Download Button - Simple & Effective */}
                    <div className="space-y-3">
                      {jobData?.downloadUrl && (
                        <Button asChild size="lg" className="w-full">
                          <a
                            href={jobData.downloadUrl}
                            download={file?.name.replace(".pdf", "_numbered.pdf")}
                            onClick={() => toast.success("Downloading PDF...")}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download PDF
                          </a>
                        </Button>
                      )}

                      <Button variant="outline" size="sm" onClick={handleReset} className="w-full">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Process Another PDF
                      </Button>
                    </div>
                  </div>
                )}

                {status === "failed" && (
                  <div className="flex flex-col items-center justify-center p-6 space-y-4 text-center duration-200 border border-red-200 rounded-lg bg-red-50/50 animate-in fade-in zoom-in-95">
                    <div className="p-3 bg-red-100 rounded-full">
                      <AlertCircle className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-red-900">Processing Failed</h3>
                      <p className="text-sm text-red-700 max-w-62.5 mx-auto wrap-break-word">
                        {jobData?.error || "Something went wrong while processing your PDF."}
                      </p>
                    </div>
                    <div className="pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleReset}
                        className="text-red-700 transition-colors bg-white border-red-200 hover:bg-red-50 hover:border-red-300"
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Try Again
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </Card>
        </div>
    </div>
  );
}
