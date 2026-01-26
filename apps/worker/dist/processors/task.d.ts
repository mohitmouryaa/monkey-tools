import type { Job } from "bullmq";
export default function (job: Job): Promise<{
    status: string;
    originalSize: number;
    compressedSize: number;
    savedBytes: number;
} | {
    status: string;
    downloadUrl: string;
    savedBytes: number;
    reductionPercentage: string;
} | {
    status: string;
    outputFile: string;
}>;
//# sourceMappingURL=task.d.ts.map