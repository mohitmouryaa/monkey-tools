import path from "node:path";
import { execFile, exec } from "node:child_process";
import fs from "node:fs/promises";
import { promisify } from "node:util";
import { Document, Packer, Paragraph, TextRun } from "docx";

const execAsync = promisify(exec);

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

async function fallbackToPdfToText(inputPath: string, outputPath: string): Promise<void> {
  // Fallback: Use pdftotext to recover text content when LibreOffice crashes
  try {
    // -layout maintains physical layout of text
    const { stdout } = await execAsync(`pdftotext -layout "${inputPath}" -`);

    // Sanitize control characters that XML/DOCX might hate (optional but safe)
    // Keep tabs, newlines, carriage returns
    // Biome/ESLint safe regex construction
    // biome-ignore lint/complexity/useRegexLiterals: <No complex regex literals>
    const controlCharsRegex = new RegExp("[\\x00-\\x08\\x0B\\x0C\\x0E-\\x1F\\x7F]", "g");
    const cleanText = stdout.replace(controlCharsRegex, "");

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: cleanText.split("\n").map(
            (line) =>
              new Paragraph({
                children: [
                  new TextRun({
                    text: line,
                    font: "Courier New", // Monospace helps preserve layout from pdftotext -layout
                    size: 20, // 10pt
                  }),
                ],
              }),
          ),
        },
      ],
    });

    const buffer = await Packer.toBuffer(doc);
    await fs.writeFile(outputPath, buffer);
  } catch (e) {
    throw new Error(`Fallback conversion failed: ${e instanceof Error ? e.message : String(e)}`);
  }
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

    // Isolate user profile for parallel execution safety
    const userProfileDir = `/tmp/LibreOffice_Conversion_${path.basename(processingPath)}`;
    const args = [
      `-env:UserInstallation=file://${userProfileDir}`,
      "--headless",
      "--norestore",
      "--infilter=writer_pdf_import",
      "--convert-to",
      "docx",
      "--outdir",
      outputDir,
      processingPath,
    ];

    execFile("soffice", args, { timeout }, async (error) => {
      // Expected output filename
      const filename = path.basename(processingPath, path.extname(processingPath));
      const expectedOutputPath = path.join(outputDir, `${filename}.docx`);

      const cleanup = () => {
        if (processingPath !== inputPath) {
          fs.unlink(processingPath).catch(() => {});
        }
      };

      if (error) {
        const errorCode = (error as NodeJS.ErrnoException).code || "unknown";
        console.warn(`LibreOffice conversion failed (code ${errorCode}). Attempting text-only fallback...`);

        try {
          await fallbackToPdfToText(inputPath, expectedOutputPath);
          cleanup();
          return resolve(expectedOutputPath);
        } catch (fallbackError) {
          cleanup();
          // Check for timeout
          if (error instanceof Error && "signal" in error && error.signal === "SIGTERM") {
            return reject(new Error("Conversion timed out - File too complex for LibreOffice"));
          }
          console.error("Fallback failed:", fallbackError);
          return reject(error);
        }
      }

      cleanup();
      resolve(expectedOutputPath);
    });
  });
}
