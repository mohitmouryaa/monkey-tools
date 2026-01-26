import type { Job } from "bullmq";
export declare function advancedCompressPdf(job: Job): Promise<{
    status: string;
    downloadUrl: string;
    savedBytes: number;
    reductionPercentage: string;
}>;
//# sourceMappingURL=advanced-compress-pdf.d.ts.map