import { describe, expect, it, vi, beforeEach } from "vitest";

const convertToPdfMock = vi.hoisted(() => vi.fn());
vi.mock("../../utils/libreoffice.js", () => ({ convertToPdf: convertToPdfMock }));

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

import { wordToPdf } from "./word-to-pdf.js";

function makeJob(overrides: Record<string, unknown> = {}) {
  return {
    id: "bull-3",
    data: {
      jobId: "mongo-3",
      inputFile: "uploads/curriculo.docx",
      tool: "WORD_TO_PDF",
      ...overrides,
    },
    updateProgress: vi.fn(async () => undefined),
    // biome-ignore lint/suspicious/noExplicitAny: minimal Job stub
  } as any;
}

describe("wordToPdf handler", () => {
  beforeEach(() => {
    convertToPdfMock.mockReset();
    downloadFileMock.mockReset();
    uploadFromFileMock.mockReset();
    findByIdAndUpdateMock.mockReset();
    fsMocks.access.mockReset();
    fsMocks.unlink.mockReset();

    downloadFileMock.mockResolvedValue(undefined);
    uploadFromFileMock.mockResolvedValue(undefined);
    findByIdAndUpdateMock.mockResolvedValue(undefined);
  });

  it("happy path: download → convertToPdf → upload → COMPLETED", async () => {
    convertToPdfMock.mockResolvedValue("/tmp/mongo-3-input.pdf");
    fsMocks.access.mockResolvedValue(undefined);

    const job = makeJob();
    const result = await wordToPdf(job);

    expect(downloadFileMock).toHaveBeenCalledWith("uploads/curriculo.docx", "/tmp/mongo-3-input.docx");
    expect(convertToPdfMock).toHaveBeenCalledWith("/tmp/mongo-3-input.docx", "/tmp");
    expect(uploadFromFileMock).toHaveBeenCalledWith("/tmp/mongo-3-input.pdf", "converted/curriculo.pdf");
    expect(findByIdAndUpdateMock).toHaveBeenCalledWith(
      "mongo-3",
      expect.objectContaining({ status: "COMPLETED", outputFile: "converted/curriculo.pdf" }),
    );
    expect(result).toEqual({ status: "completed", outputFile: "converted/curriculo.pdf" });
  });

  it("preserva extensão .odt no inputPath quando o fileKey é .odt", async () => {
    convertToPdfMock.mockResolvedValue("/tmp/mongo-3-input.pdf");
    fsMocks.access.mockResolvedValue(undefined);

    const job = makeJob({ inputFile: "uploads/relatorio.odt" });
    await wordToPdf(job);

    expect(downloadFileMock).toHaveBeenCalledWith("uploads/relatorio.odt", "/tmp/mongo-3-input.odt");
    expect(uploadFromFileMock).toHaveBeenCalledWith(expect.any(String), "converted/relatorio.pdf");
  });

  it("fileKey sem extensão usa fallback .docx", async () => {
    convertToPdfMock.mockResolvedValue("/tmp/mongo-3-input.pdf");
    fsMocks.access.mockResolvedValue(undefined);

    const job = makeJob({ inputFile: "uploads/sem-extensao" });
    await wordToPdf(job);

    expect(downloadFileMock).toHaveBeenCalledWith(
      "uploads/sem-extensao",
      "/tmp/mongo-3-input.docx",
    );
  });

  it("conversão falha → marca FAILED e propaga", async () => {
    convertToPdfMock.mockRejectedValueOnce(new Error("Conversion timed out"));

    const job = makeJob();
    await expect(wordToPdf(job)).rejects.toThrow("Conversion timed out");

    expect(findByIdAndUpdateMock).toHaveBeenCalledWith(
      "mongo-3",
      expect.objectContaining({ status: "FAILED", error: "Conversion timed out" }),
    );
  });

  it("arquivo de saída não existe após conversão → erro 'Output file not found'", async () => {
    convertToPdfMock.mockResolvedValue("/tmp/inexistente.pdf");
    fsMocks.access.mockRejectedValueOnce(new Error("ENOENT"));

    const job = makeJob();
    await expect(wordToPdf(job)).rejects.toThrow("Output file not found");

    expect(findByIdAndUpdateMock).toHaveBeenCalledWith(
      "mongo-3",
      expect.objectContaining({ status: "FAILED" }),
    );
  });

  it("erro não-Error é stringificado no campo error", async () => {
    convertToPdfMock.mockRejectedValueOnce("plain string");

    const job = makeJob();
    await expect(wordToPdf(job)).rejects.toBeTruthy();

    expect(findByIdAndUpdateMock).toHaveBeenCalledWith(
      "mongo-3",
      expect.objectContaining({ status: "FAILED", error: "plain string" }),
    );
  });
});
