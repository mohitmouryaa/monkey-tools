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
import { BackgroundElements } from "@/modules/common/ui/components/background-elements";
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
      <BackgroundElements />

      <div className="container relative z-10 px-4 py-10 mx-auto">
        <div className="max-w-3xl mx-auto space-y-8">
          <Card className="p-6 border shadow-xl bg-card/50 backdrop-blur-sm">
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
                <div className="flex items-center p-4 border rounded-lg bg-muted/50">
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
                  <div className="relative overflow-hidden">
                    {/* Background gradient */}
                    <div className="absolute inset-0 opacity-50 bg-linear-to-br from-emerald-50 via-green-50 to-teal-50"></div>
                    <div className="absolute inset-0 bg-linear-to-t from-white/80 to-transparent"></div>

                    <div className="relative p-8 space-y-8 text-center">
                      {/* Success Icon with enhanced animation */}
                      <div className="flex justify-center">
                        <div className="relative">
                          {/* Outer glow rings */}
                          <div className="absolute inset-0 rounded-full bg-emerald-400/30 animate-ping"></div>
                          <div className="absolute rounded-full inset-2 bg-emerald-300/40 animate-pulse"></div>

                          {/* Main icon container */}
                          <div className="relative p-6 border-2 rounded-full shadow-lg bg-linear-to-br from-emerald-100 to-green-100 border-emerald-200">
                            <Hash className="w-12 h-12 text-emerald-600 drop-shadow-sm" />
                          </div>

                          {/* Success checkmark overlay */}
                          <div className="absolute flex items-center justify-center w-6 h-6 rounded-full shadow-md -top-1 -right-1 bg-emerald-500">
                            <svg
                              className="w-4 h-4 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              aria-label="Success checkmark"
                            >
                              <title>Success checkmark</title>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Success Message */}
                      <div className="space-y-3">
                        <h3 className="text-3xl font-bold text-transparent bg-linear-to-r from-emerald-700 to-green-700 bg-clip-text">
                          Page Numbers Added Successfully!
                        </h3>
                        <p className="max-w-md mx-auto leading-relaxed text-slate-600">
                          Your PDF has been processed and page numbers have been added according to your settings.
                        </p>
                      </div>

                      {/* File Info Card */}
                      <div className="max-w-sm mx-auto">
                        <div className="p-5 border shadow-sm bg-white/70 backdrop-blur-sm border-emerald-200/50 rounded-xl">
                          <div className="flex items-center justify-center gap-3 mb-2 text-emerald-700">
                            <div className="p-2 rounded-lg bg-emerald-100">
                              <FileIcon className="w-5 h-5" />
                            </div>
                            <span className="text-lg font-semibold">Ready for Download</span>
                          </div>
                          <p className="text-sm font-medium truncate text-emerald-600">
                            {file?.name.replace(".pdf", "_numbered.pdf")}
                          </p>
                          <div className="flex items-center justify-center gap-1 mt-3 text-xs text-emerald-500">
                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                            File processed and ready
                          </div>
                        </div>
                      </div>

                      {/* Download Button */}
                      <div className="space-y-4">
                        {jobData?.downloadUrl && (
                          <Button
                            onClick={() => {
                              const link = document.createElement("a");
                              link.href = jobData.downloadUrl;
                              link.download = file?.name.replace(".pdf", "_numbered.pdf") || "numbered_pdf.pdf";
                              link.style.display = "none";
                              document.body.appendChild(link);
                              link.click();
                              document.body.removeChild(link);
                              toast.success("Download started!");
                            }}
                            className="w-full max-w-xs mx-auto h-12 bg-linear-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 rounded-xl"
                            size="lg"
                          >
                            <Download className="w-5 h-5 mr-3" />
                            Download PDF
                          </Button>
                        )}

                        <p className="text-xs text-slate-500">Click to start download</p>
                      </div>

                      {/* Additional Actions */}
                      <div className="pt-4 border-t border-emerald-200/30">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleReset}
                          className="transition-colors duration-200 text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50"
                        >
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Process Another PDF
                        </Button>
                      </div>
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
    </div>
  );
}
