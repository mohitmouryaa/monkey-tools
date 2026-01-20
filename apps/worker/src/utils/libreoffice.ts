import path from "node:path";
import { execFile, exec } from "node:child_process";
import fs from "node:fs/promises";
import { promisify } from "node:util";
import { Document, Packer, Paragraph, TextRun } from "docx";

const execAsync = promisify(exec);

async function optimizePdf(inputPath: string): Promise<string> {
  const dir = path.dirname(inputPath);
  const baseName = path.basename(inputPath, path.extname(inputPath));
  const optimizedPath = path.join(dir, `${baseName}_opt.pdf`);

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
  // Write to temp file instead of stdout to handle large PDFs (avoid maxBuffer exceeded)
  const tempTextPath = inputPath.replace(".pdf", "_extracted.txt");

  try {
    // -layout maintains physical layout of text, write to file instead of stdout
    await execAsync(`pdftotext -layout "${inputPath}" "${tempTextPath}"`);

    // Read the extracted text from file
    const rawText = await fs.readFile(tempTextPath, "utf-8");

    // Sanitize control characters that XML/DOCX might hate (optional but safe)
    // Keep tabs, newlines, carriage returns
    // biome-ignore lint/complexity/useRegexLiterals: <No complex regex literals>
    const controlCharsRegex = new RegExp("[\\x00-\\x08\\x0B\\x0C\\x0E-\\x1F\\x7F]", "g");
    const cleanText = rawText.replace(controlCharsRegex, "");

    // Split into lines and process in chunks to avoid memory issues with huge docs
    const lines = cleanText.split("\n");
    const MAX_LINES_PER_SECTION = 5000; // Process in chunks for memory efficiency

    const sections = [];
    for (let i = 0; i < lines.length; i += MAX_LINES_PER_SECTION) {
      const chunk = lines.slice(i, i + MAX_LINES_PER_SECTION);
      sections.push({
        properties: {},
        children: chunk.map(
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
      });
    }

    const doc = new Document({ sections });

    const buffer = await Packer.toBuffer(doc);
    await fs.writeFile(outputPath, buffer);
  } catch (e) {
    throw new Error(`Fallback conversion failed: ${e instanceof Error ? e.message : String(e)}`);
  } finally {
    // Clean up temp text file
    await fs.unlink(tempTextPath).catch(() => {});
  }
}

export async function convertToWord(inputPath: string, outputDir: string): Promise<string> {
  // 1. Optimize PDF first using Ghostscript
  console.log("Optimizing PDF with Ghostscript...");
  const processingPath = await optimizePdf(inputPath);

  // Get the original filename (without _opt suffix) for final output naming
  const originalBaseName = path.basename(inputPath, ".pdf");
  const finalOutputPath = path.join(outputDir, `${originalBaseName}.docx`);

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
      // LibreOffice with PDF import creates output as: basename.pdf.docx (keeps .pdf in name)
      const processingBaseName = path.basename(processingPath, ".pdf");
      const libreOfficeOutputPath = path.join(outputDir, `${processingBaseName}.pdf.docx`);
      // Also check for the expected normal output (without .pdf in name)
      const normalOutputPath = path.join(outputDir, `${processingBaseName}.docx`);

      const cleanup = () => {
        if (processingPath !== inputPath) {
          fs.unlink(processingPath).catch(() => {});
        }
      };

      // Helper to find and rename the actual output file
      const findAndRenameOutput = async (): Promise<string> => {
        // Check both possible output locations
        for (const possiblePath of [libreOfficeOutputPath, normalOutputPath]) {
          try {
            await fs.access(possiblePath);
            // Found the file - rename it to our desired final path if different
            if (possiblePath !== finalOutputPath) {
              await fs.rename(possiblePath, finalOutputPath);
            }
            return finalOutputPath;
          } catch {
            // File doesn't exist at this path, try next
          }
        }
        throw new Error("LibreOffice did not produce expected output file");
      };

      if (error) {
        const errorCode = (error as NodeJS.ErrnoException).code || "unknown";
        console.warn(`LibreOffice conversion failed (code ${errorCode}). Attempting text-only fallback...`);

        try {
          await fallbackToPdfToText(inputPath, finalOutputPath);
          cleanup();
          return resolve(finalOutputPath);
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

      try {
        const outputPath = await findAndRenameOutput();
        cleanup();
        resolve(outputPath);
      } catch (renameError) {
        cleanup();
        reject(renameError);
      }
    });
  });
}
