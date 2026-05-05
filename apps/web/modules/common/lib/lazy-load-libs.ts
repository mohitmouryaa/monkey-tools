type PdfLibModule = typeof import("pdf-lib");
type XlsxModule = typeof import("xlsx");
type JsPdfModule = typeof import("jspdf");
type JsZipModule = typeof import("jszip");

let pdfLibPromise: Promise<PdfLibModule> | null = null;
let xlsxPromise: Promise<XlsxModule> | null = null;
let jsPdfPromise: Promise<JsPdfModule> | null = null;
let jsZipPromise: Promise<JsZipModule> | null = null;

/** Lazy-load pdf-lib. Usage: `const { PDFDocument, rgb, degrees, StandardFonts } = await lazyLoadPdfLib();` */
export function lazyLoadPdfLib(): Promise<PdfLibModule> {
  pdfLibPromise ??= import("pdf-lib");
  return pdfLibPromise;
}

/** Lazy-load xlsx. Usage: `const XLSX = await lazyLoadXlsx();` */
export function lazyLoadXlsx(): Promise<XlsxModule> {
  xlsxPromise ??= import("xlsx");
  return xlsxPromise;
}

/** Lazy-load jspdf. Usage: `const { default: jsPDF } = await lazyLoadJsPdf();` */
export function lazyLoadJsPdf(): Promise<JsPdfModule> {
  jsPdfPromise ??= import("jspdf");
  return jsPdfPromise;
}

/**
 * Lazy-load jszip. Returns the JSZip class constructor directly.
 * Usage: `const JSZip = await lazyLoadJsZip(); const zip = new JSZip();`
 */
export function lazyLoadJsZip(): Promise<JsZipModule> {
  jsZipPromise ??= import("jszip").then((mod) => (mod.default ?? mod) as unknown as JsZipModule);
  return jsZipPromise;
}
