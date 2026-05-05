export declare const JOB_TYPES: {
    readonly COMPRESS_PDF: "COMPRESS_PDF";
    readonly ADVANCED_COMPRESS_PDF: "ADVANCED_COMPRESS_PDF";
    readonly ADD_PAGE_NUMBERS_PDF: "ADD_PAGE_NUMBERS_PDF";
    readonly WORD_TO_PDF: "WORD_TO_PDF";
    readonly PDF_TO_WORD: "PDF_TO_WORD";
};
export type JobType = (typeof JOB_TYPES)[keyof typeof JOB_TYPES];
export declare enum Status {
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED"
}
//# sourceMappingURL=job-types.d.ts.map