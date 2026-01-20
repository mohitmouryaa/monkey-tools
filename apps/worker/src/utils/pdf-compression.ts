import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

export type CompressionPreset = "low" | "medium" | "high";

export class AdvancedPdfCompressor {
  private async runCommand(command: string, args: string[]): Promise<void> {
    return new Promise((resolve, reject) => {
      const proc = spawn(command, args);
      const stderr: Buffer[] = [];

      proc.stderr.on("data", (data) => stderr.push(data));

      proc.on("error", (err) => reject(err));
      proc.on("close", (code) => {
        if (code === 0) resolve();
        else reject(new Error(`${command} failed with code ${code}: ${Buffer.concat(stderr).toString()}`));
      });
    });
  }

  private async getFileSize(filePath: string): Promise<number> {
    const stat = await fs.stat(filePath);
    return stat.size;
  }

  // Step 1: Ghostscript Aggressive Reconstruction
  private async step1Reconstruct(inputPath: string, outputPath: string) {
    const args = [
      "-sDEVICE=pdfwrite",
      "-dCompatibilityLevel=1.4",
      "-dNOPAUSE",
      "-dBATCH",
      "-dSAFER",
      "-dPDFSETTINGS=/screen",
      "-dDetectDuplicateImages=true",
      "-dDownsampleColorImages=true",
      "-dDownsampleGrayImages=true",
      "-dDownsampleMonoImages=true",
      "-dColorImageResolution=72",
      "-dGrayImageResolution=72",
      "-dMonoImageResolution=150",
      "-dColorImageDownsampleType=/Bicubic",
      "-dGrayImageDownsampleType=/Bicubic",
      "-dMonoImageDownsampleType=/Subsample",
      "-dEmbedAllFonts=false", // Aggressive font optimization
      "-dSubsetFonts=true",
      "-dCompressFonts=true",
      "-dAutoRotatePages=/None",
      `-sOutputFile=${outputPath}`,
      inputPath,
    ];

    await this.runCommand("gs", args);
  }

  // Step 2: QPDF Structural Optimization
  private async step2Optimize(inputPath: string, outputPath: string) {
    const args = [
      inputPath,
      outputPath,
      "--stream-data=compress",
      "--object-streams=generate",
      "--compression-level=9",
      "--optimize-images",
    ];

    await this.runCommand("qpdf", args);
  }

  // Step 3: Extreme Image Recompression (Ghostscript) - Only for High compression
  private async step3Extreme(inputPath: string, outputPath: string) {
    const args = [
      "-sDEVICE=pdfwrite",
      "-dPDFSETTINGS=/screen",
      "-dColorImageFilter=/DCTEncode",
      "-dGrayImageFilter=/DCTEncode",
      "-dJPEGQ=40", // Very aggressive JPEG compression
      "-dNOPAUSE",
      "-dBATCH",
      "-dSAFER",
      `-sOutputFile=${outputPath}`,
      inputPath,
    ];

    await this.runCommand("gs", args);
  }

  // Post-processing: Remove metadata with ExifTool
  private async removeMetadata(inputPath: string): Promise<void> {
    const args = ["-all:all=", "-overwrite_original", inputPath];
    try {
      await this.runCommand("exiftool", args);
    } catch (e) {
      // Exiftool is optional but recommended
      console.warn("Exiftool failed to strip metadata:", e);
    }
  }

  async compress(inputPath: string, outputPath: string, preset: CompressionPreset = "medium"): Promise<void> {
    // Temp files for multi-pass
    const dir = path.dirname(outputPath);
    const id = randomUUID();
    const step1Path = path.join(dir, `step1-${id}.pdf`);
    const step2Path = path.join(dir, `step2-${id}.pdf`);
    const initialSize = await this.getFileSize(inputPath);

    try {
      // Always run Step 1 (Reconstruct) + Step 2 (Structure)
      await this.step1Reconstruct(inputPath, step1Path);
      await this.step2Optimize(step1Path, step2Path);

      let finalTmpPath = step2Path;

      // If "high" preset (Extreme), run Step 3
      if (preset === "high") {
        const step3Path = path.join(dir, `step3-${id}.pdf`);
        await this.step3Extreme(step2Path, step3Path);
        finalTmpPath = step3Path;
      }

      // Cleanup metadata (Privacy + Bytes)
      await this.removeMetadata(finalTmpPath);

      // Validation: Ensure we actually reduced the size.
      // If we made it bigger (rare but possible), just fallback to Step 1 or even input if everything failed (unlikely with this pipeline).
      const finalSize = await this.getFileSize(finalTmpPath);

      if (finalSize >= initialSize) {
        console.warn(`Compression made file larger (${initialSize} -> ${finalSize}). Using Step 1 result.`);
        // Try checking step 1 size
        const s1Size = await this.getFileSize(step1Path);
        if (s1Size < initialSize) {
          await fs.copyFile(step1Path, outputPath);
        } else {
          // Worst case: just copy input
          await fs.copyFile(inputPath, outputPath);
        }
      } else {
        await fs.copyFile(finalTmpPath, outputPath);
      }
    } finally {
      // Cleanup temp files
      /* eslint-disable no-empty */
      try {
        await fs.unlink(step1Path);
      } catch {}
      try {
        await fs.unlink(step2Path);
      } catch {}
      if (preset === "high") {
        try {
          await fs.unlink(path.join(dir, `step3-${id}.pdf`));
        } catch {}
      }
      /* eslint-enable no-empty */
    }
  }
}
