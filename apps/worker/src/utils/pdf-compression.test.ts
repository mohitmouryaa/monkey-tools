import { describe, expect, it, vi, beforeEach } from "vitest";
import { EventEmitter } from "node:events";

const spawnMock = vi.hoisted(() => vi.fn());
vi.mock("node:child_process", () => ({ spawn: spawnMock }));

vi.mock("node:fs/promises", () => ({
  default: {
    stat: vi.fn(),
    copyFile: vi.fn(async () => undefined),
    unlink: vi.fn(async () => undefined),
  },
}));

import { AdvancedPdfCompressor } from "./pdf-compression.js";

function makeProc() {
  const proc = new EventEmitter() as EventEmitter & { stdout: EventEmitter; stderr: EventEmitter };
  proc.stdout = new EventEmitter();
  proc.stderr = new EventEmitter();
  return proc;
}

type ScriptedResult = { code: number; stderr?: string };

function scriptSpawn(decide: (cmd: string, args: string[]) => ScriptedResult) {
  spawnMock.mockImplementation((cmd: string, args: string[]) => {
    const proc = makeProc();
    const result = decide(cmd, args);
    queueMicrotask(() => {
      if (result.stderr) proc.stderr.emit("data", Buffer.from(result.stderr));
      proc.emit("close", result.code);
    });
    return proc;
  });
}

describe("AdvancedPdfCompressor.compress", () => {
  beforeEach(() => {
    spawnMock.mockReset();
  });

  it("preset medium roda gs + qpdf + exiftool e escolhe candidato menor", async () => {
    const input = "/tmp/in.pdf";
    const output = "/tmp/out.pdf";

    scriptSpawn(() => ({ code: 0 }));

    const fs = await import("node:fs/promises");
    (fs.default.stat as ReturnType<typeof vi.fn>).mockImplementation(async (p: string) => {
      if (p === input) return { size: 1_000_000 };
      if (p.includes("step1-")) return { size: 800_000 };
      if (p.includes("step2-")) return { size: 600_000 };
      return { size: 500_000 };
    });

    const compressor = new AdvancedPdfCompressor();
    await compressor.compress(input, output, "medium");

    expect(spawnMock.mock.calls.find((c) => c[0] === "gs")).toBeDefined();
    expect(spawnMock.mock.calls.find((c) => c[0] === "qpdf")).toBeDefined();
    expect(spawnMock.mock.calls.find((c) => c[0] === "exiftool")).toBeDefined();
    // step3 (high) NÃO deve rodar com preset medium
    const gsCalls = spawnMock.mock.calls.filter((c) => c[0] === "gs");
    expect(gsCalls.find((c) => (c[1] as string[]).includes("-dJPEGQ=20"))).toBeUndefined();
    expect(fs.default.copyFile).toHaveBeenCalled();
  });

  it("preset high roda step3 (extreme) adicional", async () => {
    const input = "/tmp/in.pdf";
    const output = "/tmp/out.pdf";

    scriptSpawn(() => ({ code: 0 }));

    const fs = await import("node:fs/promises");
    (fs.default.stat as ReturnType<typeof vi.fn>).mockResolvedValue({ size: 100 });

    const compressor = new AdvancedPdfCompressor();
    await compressor.compress(input, output, "high");

    const gsCalls = spawnMock.mock.calls.filter((c) => c[0] === "gs");
    expect(gsCalls.length).toBeGreaterThanOrEqual(2);
    expect(gsCalls.find((c) => (c[1] as string[]).includes("-dJPEGQ=20"))).toBeDefined();
  });

  it("fallback ao original quando compressão piora o tamanho", async () => {
    const input = "/tmp/in.pdf";
    const output = "/tmp/out.pdf";

    scriptSpawn(() => ({ code: 0 }));

    const fs = await import("node:fs/promises");
    (fs.default.stat as ReturnType<typeof vi.fn>).mockImplementation(async (p: string) => {
      if (p === input) return { size: 100 };
      return { size: 500 };
    });

    const compressor = new AdvancedPdfCompressor();
    await compressor.compress(input, output, "medium");

    expect(fs.default.copyFile).toHaveBeenCalledWith(input, output);
  });

  it("continua mesmo se exiftool falhar (stripping é opcional)", async () => {
    const input = "/tmp/in.pdf";
    const output = "/tmp/out.pdf";

    scriptSpawn((cmd) => (cmd === "exiftool" ? { code: 1, stderr: "ouch" } : { code: 0 }));

    const fs = await import("node:fs/promises");
    (fs.default.stat as ReturnType<typeof vi.fn>).mockImplementation(async (p: string) => {
      if (p === input) return { size: 1000 };
      return { size: 500 };
    });

    const compressor = new AdvancedPdfCompressor();
    await expect(compressor.compress(input, output, "medium")).resolves.toBeUndefined();
  });

  it("rejeita quando gs (step1) falha", async () => {
    const input = "/tmp/in.pdf";
    const output = "/tmp/out.pdf";

    scriptSpawn((cmd) => (cmd === "gs" ? { code: 2, stderr: "fatal" } : { code: 0 }));

    const fs = await import("node:fs/promises");
    (fs.default.stat as ReturnType<typeof vi.fn>).mockResolvedValue({ size: 1000 });

    const compressor = new AdvancedPdfCompressor();
    await expect(compressor.compress(input, output, "medium")).rejects.toThrow(/gs failed/);
  });

  it("limpa arquivos temporários mesmo em sucesso", async () => {
    const input = "/tmp/in.pdf";
    const output = "/tmp/out.pdf";

    scriptSpawn(() => ({ code: 0 }));

    const fs = await import("node:fs/promises");
    (fs.default.stat as ReturnType<typeof vi.fn>).mockResolvedValue({ size: 100 });

    const compressor = new AdvancedPdfCompressor();
    await compressor.compress(input, output, "high");

    expect(fs.default.unlink).toHaveBeenCalled();
  });
});
