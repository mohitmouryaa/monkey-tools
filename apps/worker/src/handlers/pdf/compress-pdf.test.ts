import { describe, expect, it, vi, beforeEach } from "vitest";

const runGhostscriptMock = vi.hoisted(() => vi.fn());
vi.mock("../../utils/ghostscript.js", () => ({ runGhostscript: runGhostscriptMock }));

const downloadFileMock = vi.hoisted(() => vi.fn(async () => undefined));
const uploadFromFileMock = vi.hoisted(() => vi.fn(async () => undefined));
vi.mock("@workspace/storage", () => ({
  downloadFile: downloadFileMock,
  uploadFromFile: uploadFromFileMock,
  getDownloadUrl: vi.fn(async () => "https://signed.example/file"),
}));

const findByIdAndUpdateMock = vi.hoisted(() => vi.fn(async () => undefined));
vi.mock("@workspace/database", () => ({
  JobModel: { findByIdAndUpdate: findByIdAndUpdateMock },
}));

const fsMocks = vi.hoisted(() => ({
  stat: vi.fn(),
  unlink: vi.fn(async () => undefined),
}));
vi.mock("node:fs/promises", () => ({ default: fsMocks }));

import { compressPdf } from "./compress-pdf.js";

function makeJob(overrides: Record<string, unknown> = {}) {
  return {
    id: "bull-1",
    data: {
      jobId: "mongo-1",
      inputFile: "uploads/foo.pdf",
      tool: "COMPRESS_PDF",
      ...overrides,
    },
    updateProgress: vi.fn(async () => undefined),
    // biome-ignore lint/suspicious/noExplicitAny: minimal Job stub
  } as any;
}

describe("compressPdf handler", () => {
  beforeEach(() => {
    runGhostscriptMock.mockReset();
    downloadFileMock.mockReset();
    uploadFromFileMock.mockReset();
    findByIdAndUpdateMock.mockReset();
    fsMocks.stat.mockReset();
    fsMocks.unlink.mockReset();

    downloadFileMock.mockResolvedValue(undefined);
    uploadFromFileMock.mockResolvedValue(undefined);
    findByIdAndUpdateMock.mockResolvedValue(undefined);
  });

  it("happy path: download → compress → upload → marca COMPLETED com stats", async () => {
    runGhostscriptMock.mockResolvedValue(undefined);
    fsMocks.stat
      .mockResolvedValueOnce({ size: 1000 }) // input
      .mockResolvedValueOnce({ size: 400 }); // output

    const job = makeJob();
    const result = await compressPdf(job);

    expect(downloadFileMock).toHaveBeenCalledWith("uploads/foo.pdf", "/tmp/mongo-1-input.pdf");
    expect(runGhostscriptMock).toHaveBeenCalledWith("/tmp/mongo-1-input.pdf", "/tmp/mongo-1-output.pdf", "screen");
    expect(uploadFromFileMock).toHaveBeenCalledWith("/tmp/mongo-1-output.pdf", "compressed/foo.pdf");
    expect(findByIdAndUpdateMock).toHaveBeenCalledWith("mongo-1", expect.objectContaining({ status: "COMPLETED", outputFile: "compressed/foo.pdf" }));
    expect(result).toEqual({ status: "completed", originalSize: 1000, compressedSize: 400, savedBytes: 600 });
    expect(job.updateProgress).toHaveBeenCalledWith(100);
  });

  it("download falha → marca FAILED, propaga erro e roda cleanup", async () => {
    downloadFileMock.mockRejectedValueOnce(new Error("S3 down"));

    const job = makeJob();
    await expect(compressPdf(job)).rejects.toThrow("S3 down");

    expect(runGhostscriptMock).not.toHaveBeenCalled();
    expect(findByIdAndUpdateMock).toHaveBeenCalledWith(
      "mongo-1",
      expect.objectContaining({ status: "FAILED", error: "S3 down" }),
    );
    expect(fsMocks.unlink).toHaveBeenCalled();
  });

  it("ghostscript falha → marca FAILED", async () => {
    runGhostscriptMock.mockRejectedValueOnce(new Error("gs exit 1"));

    const job = makeJob();
    await expect(compressPdf(job)).rejects.toThrow("gs exit 1");

    expect(findByIdAndUpdateMock).toHaveBeenCalledWith(
      "mongo-1",
      expect.objectContaining({ status: "FAILED", error: "gs exit 1" }),
    );
  });

  it("upload falha → marca FAILED mesmo após compressão bem-sucedida", async () => {
    runGhostscriptMock.mockResolvedValue(undefined);
    fsMocks.stat.mockResolvedValue({ size: 100 });
    uploadFromFileMock.mockRejectedValueOnce(new Error("403"));

    const job = makeJob();
    await expect(compressPdf(job)).rejects.toThrow("403");

    expect(findByIdAndUpdateMock).toHaveBeenCalledWith(
      "mongo-1",
      expect.objectContaining({ status: "FAILED" }),
    );
  });

  it("preserva o basename do fileKey ao gerar o uploadKey", async () => {
    runGhostscriptMock.mockResolvedValue(undefined);
    fsMocks.stat.mockResolvedValue({ size: 1 });

    const job = makeJob({ inputFile: "uploads/nested/dir/relatorio-2026.pdf" });
    await compressPdf(job);

    expect(uploadFromFileMock).toHaveBeenCalledWith(expect.any(String), "compressed/relatorio-2026.pdf");
  });
});
