export type CompressionPreset = "low" | "medium" | "high";
export declare class AdvancedPdfCompressor {
    private runCommand;
    private getFileSize;
    private step1Reconstruct;
    private step2Optimize;
    private step3Extreme;
    private removeMetadata;
    compress(inputPath: string, outputPath: string, preset?: CompressionPreset): Promise<void>;
}
//# sourceMappingURL=pdf-compression.d.ts.map