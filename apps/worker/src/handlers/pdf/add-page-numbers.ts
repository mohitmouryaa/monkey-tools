import path from "node:path";
import type { Job } from "bullmq";
import fs from "node:fs/promises";
import { JobModel, Status } from "@workspace/database";
import { downloadFile, uploadFromFile } from "@workspace/storage";

interface JobData {
  inputFile: string;
  jobId: string;
  metadata: {
    position: "bottom-center" | "bottom-right" | "bottom-left" | "top-center" | "top-left" | "top-right";
    startFrom: number;
    format: "n" | "page-n" | "page-n-of-m"; // n=1, page-n=Page 1, page-n-of-m=Page 1 of 10
    fontSize: number;
    margin: number;
  };
}

export async function addPageNumbersPdf(job: Job) {
  const { inputFile: fileKey, metadata } = job.data as JobData;
  const { position = "bottom-center", startFrom = 1, format = "n", fontSize = 12, margin = 30 } = metadata || {};

  const jobId = job.data.jobId;
  const inputPath = path.join("/tmp", `${jobId}-input.pdf`);
  // Used for overlay PS file
  const overlayPath = path.join("/tmp", `${jobId}-overlay.ps`);
  const outputPath = path.join("/tmp", `${jobId}-output.pdf`);
  const uploadKey = `page-numbers/${path.basename(fileKey)}`;

  try {
    await job.updateProgress(10);
    await downloadFile(fileKey, inputPath);

    await job.updateProgress(20);

    // Generate PostScript Overlay
    const psContent = generatePostScript({
      position,
      startFrom,
      format,
      fontSize,
      margin,
    });

    await fs.writeFile(overlayPath, psContent, "utf-8");

    await job.updateProgress(30);

    // Run Ghostscript
    // We need to pass the overlay file + input file.
    // runGhostscript util takes inputPath and outputPath.
    // We might need to call spawn manually or modify the util.
    // For now, I'll copy the spawn logic here to be custom,
    // as the util is tailored for compression (specific args).

    await runGhostscriptCustom(inputPath, outputPath, overlayPath);

    await job.updateProgress(80);
    await uploadFromFile(outputPath, uploadKey);

    await job.updateProgress(100);

    await JobModel.findByIdAndUpdate(jobId, {
      status: Status.COMPLETED,
      outputFile: uploadKey,
    });

    return {
      status: "completed",
    };
    // biome-ignore lint/suspicious/noExplicitAny: <Transient Error>
  } catch (error: any) {
    console.error(`[${job.id}] Failed:`, error);
    await JobModel.findByIdAndUpdate(jobId, {
      status: Status.FAILED,
      error: error.message,
    });
    throw error;
  } finally {
    // Cleanup
    try {
      await fs.unlink(inputPath).catch(() => {});
      await fs.unlink(outputPath).catch(() => {});
      await fs.unlink(overlayPath).catch(() => {});
    } catch (e) {
      console.error("Cleanup failed:", e);
    }
  }
}

function generatePostScript({ position, startFrom, format, fontSize, margin }: JobData["metadata"]): string {
  // Parsing logic
  // 'startFrom' offset: if startFrom=5, and we are on page 1, we show 5.
  // effectiveNum = pagenum + startFrom - 1
  // Adjust logic to handle integer math in PS
  const offset = startFrom - 1;

  // Formatting logic: Check format to decide if we prepend "Page "
  // format can be "n" (1), "page-n" (Page 1), or "page-n-of-m" (fallback to Page 1 for single-pass)

  // Alignment helper
  const alignment = position.includes("center") ? "center" : position.includes("right") ? "right" : "left";

  return `
%!
/Helvetica findfont
${fontSize} scalefont
setfont

% String concatenation helper
/concatstrings {
  exch /strA exch def
  /strB exch def
  strA length strB length add string
  dup 0 strA putinterval
  dup strA length strB putinterval
} bind def

/pagenumstr 20 string def

/printText {
    % Stack: (Text)
    dup stringwidth pop % Get width
    
    ${alignment === "center" ? "2 div neg 0 rmoveto" : ""}
    ${alignment === "right" ? "neg 0 rmoveto" : ""}
    ${alignment === "left" ? "pop" : ""}
    
    show
} def

<<
  /BeginPage {
    /pagenum exch def
    
    gsave
      0.5 setgray
      
      % Get Page Size
      currentpagedevice /PageSize get aload pop
      /h exch def
      /w exch def
      
      /margin ${margin} def
      
      % Move to anchor point
      ${position.includes("bottom") ? "margin" : "h margin sub"} 
      ${position.includes("left") ? "margin" : position.includes("right") ? "w margin sub" : "w 2 div"} 
      exch % Stack: x y
      moveto
      
      % Build the string to print
      % We simplify construction by creating a small string buffer or just printing segments if alignment wasn't an issue.
      % With alignment, we best construct the full string.
      
      % For now, let's use a simpler approach that works for typical "Page X"
      % Construct string on stack
      
      (Page ) 
      ${format === "n" ? "pop ()" : ""} % Remove (Page ) if format is n
      
      pagenum ${offset} add pagenumstr cvs
      
      concatstrings
      
      printText
      
    grestore
  } bind
>>
setpagedevice

    `;
}

// Minimal implementation of runGhostscriptCustom
import { spawn } from "node:child_process";

function runGhostscriptCustom(inputPath: string, outputPath: string, overlayPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const args = [
      "-sDEVICE=pdfwrite",
      "-dCompatibilityLevel=1.4",
      "-dNOPAUSE",
      "-dQUIET",
      "-dBATCH",
      `-sOutputFile=${outputPath}`,
      overlayPath, // Overlay defined first (or via -c?) - usually overlay files containing BeginPage hook are loaded *before* input or as part of job
      inputPath,
    ];

    // Note: For setpagedevice to affect the input PDF, the PS file usually needs to be processed *while* reading the PDF?
    // Actually, passing `overlay.ps input.pdf` to GS works because GS executes them in order.
    // The overlay sets up the BeginPage hook, which triggers for subsequent pages (from input.pdf).

    const gs = spawn("gs", args);

    // Capture stderr for debugging
    let stderr = "";
    gs.stderr.on("data", (d) => {
      stderr += d;
    });

    gs.on("error", (err) => reject(err));
    gs.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Ghostscript exited with code ${code}: ${stderr}`));
    });
  });
}
