import type { Job } from "bullmq";
import path from "node:path";
import fs from "node:fs/promises";
import { Status } from "@workspace/types";
import { JobModel } from "@workspace/database";
import { getDownloadUrl } from "@workspace/storage";
import { downloadFile, uploadFromFile } from "@workspace/storage";
import { AdvancedPdfCompressor } from "../../utils/pdf-compression.js";

export async function advancedCompressPdf(job: Job) {
  const { inputFile: fileKey } = job.data;

  const jobId = job.data.jobId;
  const inputPath = path.join("/tmp", `${jobId}-input.pdf`);
  const outputPath = path.join("/tmp", `${jobId}-output.pdf`);
  const uploadKey = `advanced-compressed/${path.basename(fileKey)}`;

  try {
    // 1. Download
    await job.updateProgress(10);
    console.log(`[${job.id}] Downloading ${fileKey}...`);
    await downloadFile(fileKey, inputPath);

    // 2. Compress (Multi-pass)
    await job.updateProgress(20);
    console.log(`[${job.id}] Running Advanced Compression (Level: high)...`);

    const compressor = new AdvancedPdfCompressor();
    await compressor.compress(inputPath, outputPath, "high");

    // Stats
    const originalStats = await fs.stat(inputPath);
    const compressedStats = await fs.stat(outputPath);
    const savedBytes = originalStats.size - compressedStats.size;
    const reductionPercentage = ((savedBytes / originalStats.size) * 100).toFixed(1);

    // 3. Upload
    await job.updateProgress(90);
    console.log(`[${job.id}] Uploading result...`);
    await uploadFromFile(outputPath, uploadKey);
    const downloadUrl = await getDownloadUrl(uploadKey);

    await job.updateProgress(100);

    // Update DB with metadata about savings
    await JobModel.findByIdAndUpdate(jobId, {
      status: Status.COMPLETED,
      outputFile: uploadKey,
      metadata: {
        originalSize: originalStats.size,
        compressedSize: compressedStats.size,
        savedBytes,
        reductionPercentage,
      },
    });

    return {
      status: "completed",
      downloadUrl,
      savedBytes,
      reductionPercentage,
    };
    // biome-ignore lint/suspicious/noExplicitAny: <No exact type available>
  } catch (err: any) {
    console.error(`[${job.id}] Job Failed:`, err);
    await JobModel.findByIdAndUpdate(jobId, {
      status: Status.FAILED,
      error: err.message || "Advanced compression failed",
    });
    throw err;
  } finally {
    // Cleanup
    try {
      await fs.unlink(inputPath);
    } catch {}
    try {
      await fs.unlink(outputPath);
    } catch {}
  }
}
