import { describe, expect, it, vi, beforeEach } from "vitest";

const convertToWordMock = vi.hoisted(() => vi.fn());
vi.mock("../../utils/libreoffice.js", () => ({ convertToWord: convertToWordMock }));

const downloadFileMock = vi.hoisted(() => vi.fn(async () => undefined));
const uploadFromFileMock = vi.hoisted(() => vi.fn(async () => undefined));
vi.mock("@workspace/storage", () => ({
  downloadFile: downloadFileMock,
  uploadFromFile: uploadFromFileMock,
  getDownloadUrl: vi.fn(async () => "https://signed.example/x"),
}));

const findByIdAndUpdateMock = vi.hoisted(() => vi.fn(async () => undefined));
vi.mock("@workspace/database", () => ({
  JobModel: { findByIdAndUpdate: findByIdAndUpdateMock },
}));

const fsMocks = vi.hoisted(() => ({
  access: vi.fn(),
  unlink: vi.fn(async () => undefined),
}));
vi.mock("node:fs/promises", () => ({ default: fsMocks }));

import { pdfToWord } from "./pdf-to-word.js";

function makeJob(overrides: Record<string, unknown> = {}) {
  return {
    id: "bull-4",
    data: {
      jobId: "mongo-4",
      inputFile: "uploads/contrato.pdf",
      tool: "PDF_TO_WORD",
      ...overrides,
    },
    updateProgress: vi.fn(async () => undefined),
    // biome-ignore lint/suspicious/noExplicitAny: minimal Job stub
  } as any;
}

describe("pdfToWord handler", () => {
  beforeEach(() => {
    convertToWordMock.mockReset();
    downloadFileMock.mockReset();
    uploadFromFileMock.mockReset();
    findByIdAndUpdateMock.mockReset();
    fsMocks.access.mockReset();
    fsMocks.unlink.mockReset();

    downloadFileMock.mockResolvedValue(undefined);
    uploadFromFileMock.mockResolvedValue(undefined);
    findByIdAndUpdateMock.mockResolvedValue(undefined);
  });

  it("happy path: download → convertToWord → upload → COMPLETED", async () => {
    convertToWordMock.mockResolvedValue("/tmp/mongo-4-input.docx");
    fsMocks.access.mockResolvedValue(undefined);

    const job = makeJob();
    const result = await pdfToWord(job);

    expect(downloadFileMock).toHaveBeenCalledWith("uploads/contrato.pdf", "/tmp/mongo-4-input.pdf");
    expect(convertToWordMock).toHaveBeenCalledWith("/tmp/mongo-4-input.pdf", "/tmp");
    expect(uploadFromFileMock).toHaveBeenCalledWith("/tmp/mongo-4-input.docx", "converted/contrato.docx");
    expect(findByIdAndUpdateMock).toHaveBeenCalledWith(
      "mongo-4",
      expect.objectContaining({ status: "COMPLETED", outputFile: "converted/contrato.docx" }),
    );
    expect(result).toEqual({ status: "completed", outputFile: "converted/contrato.docx" });
  });

  it("conversão lança → marca FAILED e propaga", async () => {
    convertToWordMock.mockRejectedValueOnce(new Error("LibreOffice crashed"));

    const job = makeJob();
    await expect(pdfToWord(job)).rejects.toThrow("LibreOffice crashed");

    expect(findByIdAndUpdateMock).toHaveBeenCalledWith(
      "mongo-4",
      expect.objectContaining({ status: "FAILED", error: "LibreOffice crashed" }),
    );
    expect(uploadFromFileMock).not.toHaveBeenCalled();
  });

  it("arquivo de saída não existe → erro 'Output file not found'", async () => {
    convertToWordMock.mockResolvedValue("/tmp/inexistente.docx");
    fsMocks.access.mockRejectedValueOnce(new Error("ENOENT"));

    const job = makeJob();
    await expect(pdfToWord(job)).rejects.toThrow("Output file not found");
  });

  it("upload falha → marca FAILED", async () => {
    convertToWordMock.mockResolvedValue("/tmp/mongo-4-input.docx");
    fsMocks.access.mockResolvedValue(undefined);
    uploadFromFileMock.mockRejectedValueOnce(new Error("S3 timeout"));

    const job = makeJob();
    await expect(pdfToWord(job)).rejects.toThrow("S3 timeout");

    expect(findByIdAndUpdateMock).toHaveBeenCalledWith(
      "mongo-4",
      expect.objectContaining({ status: "FAILED", error: "S3 timeout" }),
    );
  });

  it("cleanup remove input e resultPath após sucesso", async () => {
    convertToWordMock.mockResolvedValue("/tmp/mongo-4-input.docx");
    fsMocks.access.mockResolvedValue(undefined);

    const job = makeJob();
    await pdfToWord(job);

    expect(fsMocks.unlink).toHaveBeenCalledWith("/tmp/mongo-4-input.pdf");
    expect(fsMocks.unlink).toHaveBeenCalledWith("/tmp/mongo-4-input.docx");
  });
});
