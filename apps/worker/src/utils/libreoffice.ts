import path from "node:path";
import { execFile } from "node:child_process";
import fs from "node:fs/promises";

async function optimizePdf(inputPath: string): Promise<string> {
  const optimizedPath = inputPath.replace(".pdf", "_opt.pdf");

  return new Promise((resolve) => {
    // 60s timeout for optimization
    const timeout = 60000;

    const args = [
      "-sDEVICE=pdfwrite",
      "-dNOPAUSE",
      "-dBATCH",
      "-dSAFER",
      "-dPDFSETTINGS=/printer", // Balances quality and simplification
      `-sOutputFile=${optimizedPath}`,
      inputPath,
    ];

    execFile("gs", args, { timeout }, (error) => {
      if (error) {
        // If optimization fails, log it but return original path (fallback)
        console.warn("Ghostscript optimization failed or timed out, proceeding with original file:", error);
        return resolve(inputPath);
      }
      resolve(optimizedPath);
    });
  });
}

export async function convertToPdf(inputPath: string, outputDir: string): Promise<string> {
  // Security: Ensure input path is absolute and exists
  // The execute function itself doesn't need to check too much if the worker is isolated,
  // but it's good practice.

  // We expect inputPath like /tmp/123-input.docx
  // soffice --headless --convert-to pdf --outdir /tmp /tmp/123-input.docx

  return new Promise((resolve, reject) => {
    // 30 second timeout
    const timeout = 30000;

    // Command: soffice --headless --convert-to pdf --outdir <outputDir> <inputPath>
    const userProfileDir = `/tmp/LibreOffice_Conversion_${path.basename(inputPath)}`;
    const args = [
      `-env:UserInstallation=file://${userProfileDir}`,
      "--headless",
      "--convert-to",
      "pdf",
      "--outdir",
      outputDir,
      inputPath,
    ];

    execFile("soffice", args, { timeout }, (error) => {
      if (error) {
        // Check for timeout
        if (error instanceof Error && "signal" in error && error.signal === "SIGTERM") {
          return reject(new Error("Conversion timed out"));
        }
        return reject(error);
      }

      // LibreOffice usually names the output file same as input but with .pdf extension
      const filename = path.basename(inputPath, path.extname(inputPath));
      const expectedOutputPath = path.join(outputDir, `${filename}.pdf`);

      resolve(expectedOutputPath);
    });
  });
}

export async function convertToWord(inputPath: string, outputDir: string): Promise<string> {
  // 1. Optimize PDF first using Ghostscript
  console.log("Optimizing PDF with Ghostscript...");
  const processingPath = await optimizePdf(inputPath);

  // We expect inputPath like /tmp/123-input.pdf
  // soffice --headless --convert-to docx --outdir /tmp /tmp/123-input.pdf

  return new Promise((resolve, reject) => {
    // 60s timeout - fail fast as recommended
    const timeout = 60000;

    // Command: soffice -env:UserInstallation=file:///tmp/LibreOffice_Conversion_${unique_id} --headless --infilter="writer_pdf_import" --convert-to docx --outdir <outputDir> <inputPath>
    const userProfileDir = `/tmp/LibreOffice_Conversion_${path.basename(processingPath)}`;
    const args = [
      `-env:UserInstallation=file://${userProfileDir}`,
      "--headless",
      "--infilter=writer_pdf_import",
      "--convert-to",
      "docx",
      "--outdir",
      outputDir,
      processingPath,
    ];

    execFile("soffice", args, { timeout }, (error) => {
      // Cleanup optimized file if different
      if (processingPath !== inputPath) {
        fs.unlink(processingPath).catch(() => {});
      }

      if (error) {
        // Check for timeout
        if (error instanceof Error && "signal" in error && error.signal === "SIGTERM") {
          return reject(new Error("Conversion timed out - File too complex for LibreOffice"));
        }
        return reject(error);
      }

      // LibreOffice usually names the output file same as input but with .docx extension
      const filename = path.basename(processingPath, path.extname(processingPath));
      const expectedOutputPath = path.join(outputDir, `${filename}.docx`);
      resolve(expectedOutputPath);
    });
  });
}
