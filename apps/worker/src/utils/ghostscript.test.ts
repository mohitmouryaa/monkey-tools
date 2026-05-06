import { describe, expect, it, vi, beforeEach } from "vitest";
import { EventEmitter } from "node:events";

const spawnMock = vi.hoisted(() => vi.fn());
vi.mock("node:child_process", () => ({ spawn: spawnMock }));

import { runGhostscript } from "./ghostscript.js";

function makeProc() {
  const proc = new EventEmitter() as EventEmitter & { stdout: EventEmitter; stderr: EventEmitter };
  proc.stdout = new EventEmitter();
  proc.stderr = new EventEmitter();
  return proc;
}

describe("runGhostscript", () => {
  beforeEach(() => {
    spawnMock.mockReset();
  });

  it("resolve quando o gs sai com código 0 e usa nível default 'screen'", async () => {
    const proc = makeProc();
    spawnMock.mockReturnValueOnce(proc);

    const promise = runGhostscript("/tmp/in.pdf", "/tmp/out.pdf");
    proc.emit("close", 0);
    await expect(promise).resolves.toBeUndefined();

    expect(spawnMock).toHaveBeenCalledTimes(1);
    const [cmd, args] = spawnMock.mock.calls[0]!;
    expect(cmd).toBe("gs");
    expect(args).toContain("-dPDFSETTINGS=/screen");
    expect(args).toContain("-sOutputFile=/tmp/out.pdf");
    expect(args).toContain("/tmp/in.pdf");
    expect(args).toContain("-dNOPAUSE");
    expect(args).toContain("-dBATCH");
  });

  it("aceita níveis custom de compressão", async () => {
    const proc = makeProc();
    spawnMock.mockReturnValueOnce(proc);

    const promise = runGhostscript("/tmp/in.pdf", "/tmp/out.pdf", "ebook");
    proc.emit("close", 0);
    await promise;

    const args = spawnMock.mock.calls[0]![1] as string[];
    expect(args).toContain("-dPDFSETTINGS=/ebook");
  });

  it("rejeita quando o gs sai com código != 0", async () => {
    const proc = makeProc();
    spawnMock.mockReturnValueOnce(proc);

    const promise = runGhostscript("/tmp/in.pdf", "/tmp/out.pdf");
    proc.emit("close", 1);
    await expect(promise).rejects.toThrow("Ghostscript exited with code 1");
  });

  it("rejeita quando spawn dispara erro (binário ausente)", async () => {
    const proc = makeProc();
    spawnMock.mockReturnValueOnce(proc);

    const promise = runGhostscript("/tmp/in.pdf", "/tmp/out.pdf");
    proc.emit("error", new Error("ENOENT"));
    await expect(promise).rejects.toThrow("ENOENT");
  });
});
