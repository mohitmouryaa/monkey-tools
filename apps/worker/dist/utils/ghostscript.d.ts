type CompressionLevel = "screen" | "ebook" | "printer" | "prepress";
/**
 * /screen  = 72 dpi (Smallest size, lower quality)
 * /ebook   = 150 dpi (Best balance for general use)
 * /printer = 300 dpi (High quality)
 */
export declare function runGhostscript(inputPath: string, outputPath: string, level?: CompressionLevel): Promise<void>;
export {};
//# sourceMappingURL=ghostscript.d.ts.map