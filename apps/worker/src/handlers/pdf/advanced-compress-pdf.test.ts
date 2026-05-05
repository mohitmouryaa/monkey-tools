import { describe, expect, it, vi, beforeEach } from "vitest";

const compressFn = vi.hoisted(() => vi.fn());
vi.mock("../../utils/pdf-compression.js", () => ({
  AdvancedPdfCompressor: class {
    compress = compressFn;
  },
}));

const downloadFileMock = vi.hoisted(() => vi.fn(async () => undefined));
const uploadFromFileMock = vi.hoisted(() => vi.fn(async () => undefined));
const getDownloadUrlMock = vi.hoisted(() => vi.fn(async () => "https://signed.example/x"));
vi.mock("@workspace/storage", () => ({
  downloadFile: downloadFileMock,
  uploadFromFile: uploadFromFileMock,
  getDownloadUrl: getDownloadUrlMock,
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

import { advancedCompressPdf } from "./advanced-compress-pdf.js";

function makeJob(overrides: Record<string, unknown> = {}) {
  return {
    id: "bull-2",
    data: {
      jobId: "mongo-2",
      inputFile: "uploads/big.pdf",
      tool: "ADVANCED_COMPRESS_PDF",
      ...overrides,
    },
    updateProgress: vi.fn(async () => undefined),
    // biome-ignore lint/suspicious/noExplicitAny: minimal Job stub
  } as any;
}

describe("advancedCompressPdf handler", () => {
  beforeEach(() => {
    compressFn.mockReset();
    downloadFileMock.mockReset();
    uploadFromFileMock.mockReset();
    findByIdAndUpdateMock.mockReset();
    fsMocks.stat.mockReset();
    fsMocks.unlink.mockReset();

    downloadFileMock.mockResolvedValue(undefined);
    uploadFromFileMock.mockResolvedValue(undefined);
    findByIdAndUpdateMock.mockResolvedValue(undefined);
  });

  it("happy path: download → compress(high) → upload → COMPLETED com metadata", async () => {
    compressFn.mockResolvedValue(undefined);
    fsMocks.stat
      .mockResolvedValueOnce({ size: 2000 }) // input (original)
      .mockResolvedValueOnce({ size: 500 }); // output (comprimido)

    const job = makeJob();
    const result = await advancedCompressPdf(job);

    expect(compressFn).toHaveBeenCalledWith(
      "/tmp/mongo-2-input.pdf",
      "/tmp/mongo-2-output.pdf",
      "high",
    );
    expect(uploadFromFileMock).toHaveBeenCalledWith("/tmp/mongo-2-output.pdf", "advanced-compressed/big.pdf");
    expect(findByIdAndUpdateMock).toHaveBeenCalledWith(
      "mongo-2",
      expect.objectContaining({
        status: "COMPLETED",
        outputFile: "advanced-compressed/big.pdf",
        metadata: expect.objectContaining({
          originalSize: 2000,
          compressedSize: 500,
          savedBytes: 1500,
          reductionPercentage: "75.0",
        }),
      }),
    );
    expect(result).toMatchObject({ status: "completed", savedBytes: 1500, reductionPercentage: "75.0" });
  });

  it("compressor lança → marca FAILED e propaga", async () => {
    compressFn.mockRejectedValueOnce(new Error("multipass crashed"));

    const job = makeJob();
    await expect(advancedCompressPdf(job)).rejects.toThrow("multipass crashed");

    expect(findByIdAndUpdateMock).toHaveBeenCalledWith(
      "mongo-2",
      expect.objectContaining({ status: "FAILED", error: "multipass crashed" }),
    );
  });

  it("erro sem mensagem usa fallback 'Advanced compression failed'", async () => {
    compressFn.mockRejectedValueOnce({});

    const job = makeJob();
    await expect(advancedCompressPdf(job)).rejects.toBeTruthy();

    expect(findByIdAndUpdateMock).toHaveBeenCalledWith(
      "mongo-2",
      expect.objectContaining({ status: "FAILED", error: "Advanced compression failed" }),
    );
  });

  it("cleanup tenta unlink mesmo em sucesso", async () => {
    compressFn.mockResolvedValue(undefined);
    fsMocks.stat.mockResolvedValue({ size: 100 });

    const job = makeJob();
    await advancedCompressPdf(job);

    expect(fsMocks.unlink).toHaveBeenCalledWith("/tmp/mongo-2-input.pdf");
    expect(fsMocks.unlink).toHaveBeenCalledWith("/tmp/mongo-2-output.pdf");
  });
});
