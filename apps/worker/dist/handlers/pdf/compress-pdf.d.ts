import type { Job } from "bullmq";
export declare function compressPdf(job: Job): Promise<{
    status: string;
    originalSize: number;
    compressedSize: number;
    savedBytes: number;
}>;
//# sourceMappingURL=compress-pdf.d.ts.map