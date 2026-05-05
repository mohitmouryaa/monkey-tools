export const JOB_TYPES = {
    COMPRESS_PDF: "COMPRESS_PDF",
    ADVANCED_COMPRESS_PDF: "ADVANCED_COMPRESS_PDF",
    ADD_PAGE_NUMBERS_PDF: "ADD_PAGE_NUMBERS_PDF",
    WORD_TO_PDF: "WORD_TO_PDF",
    PDF_TO_WORD: "PDF_TO_WORD",
    // Add other job types here
};
export var Status;
(function (Status) {
    Status["IN_PROGRESS"] = "IN_PROGRESS";
    Status["COMPLETED"] = "COMPLETED";
    Status["FAILED"] = "FAILED";
})(Status || (Status = {}));
