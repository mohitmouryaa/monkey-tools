import { describe, expect, it, vi, beforeEach } from "vitest";

const execFileMock = vi.hoisted(() => vi.fn());
const execMock = vi.hoisted(() => vi.fn());
vi.mock("node:child_process", () => ({ execFile: execFileMock, exec: execMock }));

const fsMocks = vi.hoisted(() => ({
  access: vi.fn(),
  readFile: vi.fn(),
  writeFile: vi.fn(async () => undefined),
  unlink: vi.fn(async () => undefined),
  rename: vi.fn(async () => undefined),
}));
vi.mock("node:fs/promises", () => ({ default: fsMocks }));

const packerToBufferMock = vi.hoisted(() => vi.fn());
vi.mock("docx", () => ({
  Document: vi.fn(function (this: object, opts: unknown) {
    Object.assign(this, opts);
  }),
  Packer: { toBuffer: packerToBufferMock },
  Paragraph: vi.fn(function (this: object, opts: unknown) {
    Object.assign(this, opts);
  }),
  TextRun: vi.fn(function (this: object, opts: unknown) {
    Object.assign(this, opts);
  }),
}));

import { convertToPdf, convertToWord } from "./libreoffice.js";

function execFileResolves() {
  execFileMock.mockImplementation((_bin: string, _args: string[], _opts: object, cb: (e: unknown) => void) => {
    queueMicrotask(() => cb(null));
  });
}

function execFileRejects(error: unknown) {
  execFileMock.mockImplementation((_bin: string, _args: string[], _opts: object, cb: (e: unknown) => void) => {
    queueMicrotask(() => cb(error));
  });
}

function makeTimeoutError() {
  const err = new Error("timeout") as Error & { signal: string };
  err.signal = "SIGTERM";
  return err;
}

describe("convertToPdf", () => {
  beforeEach(() => {
    execFileMock.mockReset();
  });

  it("happy path: chama soffice com flags certas e devolve path esperado", async () => {
    execFileResolves();

    const out = await convertToPdf("/tmp/abc-input.docx", "/tmp");

    expect(out).toBe("/tmp/abc-input.pdf");
    expect(execFileMock).toHaveBeenCalledTimes(1);
    const [bin, args] = execFileMock.mock.calls[0]!;
    expect(bin).toBe("soffice");
    expect(args).toContain("--headless");
    expect(args).toContain("--convert-to");
    expect(args).toContain("pdf");
    expect(args).toContain("--outdir");
    expect(args).toContain("/tmp");
    expect(args).toContain("/tmp/abc-input.docx");
  });

  it("traduz timeout (SIGTERM) em erro descritivo", async () => {
    execFileRejects(makeTimeoutError());
    await expect(convertToPdf("/tmp/abc-input.docx", "/tmp")).rejects.toThrow("Conversion timed out");
  });

  it("propaga erro genérico do soffice", async () => {
    execFileRejects(new Error("soffice crashed"));
    await expect(convertToPdf("/tmp/abc-input.docx", "/tmp")).rejects.toThrow("soffice crashed");
  });
});

describe("convertToWord", () => {
  beforeEach(() => {
    execFileMock.mockReset();
    execMock.mockReset();
    fsMocks.access.mockReset();
    fsMocks.readFile.mockReset();
    fsMocks.writeFile.mockReset();
    fsMocks.unlink.mockReset();
    fsMocks.rename.mockReset();
    packerToBufferMock.mockReset();
  });

  it("happy path: optimize + soffice OK + acha .pdf.docx e renomeia para .docx", async () => {
    // 1ª chamada execFile: gs (optimize) → OK
    // 2ª chamada execFile: soffice → OK
    let call = 0;
    execFileMock.mockImplementation((_bin: string, _args: string[], _opts: object, cb: (e: unknown) => void) => {
      call++;
      queueMicrotask(() => cb(null));
    });

    // fs.access: 1ª chamada (libreOfficeOutputPath = .pdf.docx) resolve
    fsMocks.access.mockResolvedValueOnce(undefined);

    const result = await convertToWord("/tmp/abc-input.pdf", "/tmp");

    expect(result).toBe("/tmp/abc-input.docx");
    expect(call).toBe(2);
    expect(fsMocks.rename).toHaveBeenCalled();
  });

  it("happy path: acha output em path normal (.docx) quando .pdf.docx não existe", async () => {
    execFileMock.mockImplementation((_bin: string, _args: string[], _opts: object, cb: (e: unknown) => void) => {
      queueMicrotask(() => cb(null));
    });

    // 1ª access (.pdf.docx) falha, 2ª access (.docx) OK
    fsMocks.access
      .mockRejectedValueOnce(new Error("not found"))
      .mockResolvedValueOnce(undefined);

    const result = await convertToWord("/tmp/abc-input.pdf", "/tmp");

    expect(result).toBe("/tmp/abc-input.docx");
  });

  it("optimize (gs) falha → segue com original e ainda assim entrega o resultado", async () => {
    let nth = 0;
    execFileMock.mockImplementation((bin: string, _args: string[], _opts: object, cb: (e: unknown) => void) => {
      nth++;
      queueMicrotask(() => {
        if (bin === "gs") cb(new Error("gs busted"));
        else cb(null);
      });
    });

    fsMocks.access.mockResolvedValueOnce(undefined);

    const result = await convertToWord("/tmp/abc-input.pdf", "/tmp");
    expect(result).toBe("/tmp/abc-input.docx");
    expect(nth).toBe(2);
  });

  it("soffice falha → fallback pdftotext + docx em buffer", async () => {
    // gs: OK, soffice: falha
    execFileMock.mockImplementation((bin: string, _args: string[], _opts: object, cb: (e: unknown) => void) => {
      queueMicrotask(() => {
        if (bin === "soffice") cb(Object.assign(new Error("soffice"), { code: 139 }));
        else cb(null);
      });
    });

    // pdftotext exec
    execMock.mockImplementation((_cmd: string, cb?: (e: unknown) => void) => {
      // execAsync via util.promisify usa o callback assinado de forma especial,
      // mas no caminho que o código usa (execAsync), retornar um cb funciona porque
      // promisify lê o último argumento. Guardamos como compatível:
      if (cb) queueMicrotask(() => cb(null));
      return { on: vi.fn() };
    });

    fsMocks.readFile.mockResolvedValue("Linha 1\n\nLinha 2 com  PUA char\n");
    packerToBufferMock.mockResolvedValue(Buffer.from("FAKE-DOCX"));

    const result = await convertToWord("/tmp/abc-input.pdf", "/tmp");

    expect(result).toBe("/tmp/abc-input.docx");
    expect(packerToBufferMock).toHaveBeenCalled();
    expect(fsMocks.writeFile).toHaveBeenCalled();
    // Cleanup do arquivo de texto extraído
    expect(fsMocks.unlink).toHaveBeenCalled();
  });

  it("soffice timeout (SIGTERM) → fallback falha → erro 'Conversion timed out'", async () => {
    execFileMock.mockImplementation((bin: string, _args: string[], _opts: object, cb: (e: unknown) => void) => {
      queueMicrotask(() => {
        if (bin === "soffice") cb(makeTimeoutError());
        else cb(null);
      });
    });

    execMock.mockImplementation((_cmd: string, cb?: (e: unknown) => void) => {
      if (cb) queueMicrotask(() => cb(new Error("pdftotext also failed")));
      return { on: vi.fn() };
    });

    await expect(convertToWord("/tmp/abc-input.pdf", "/tmp")).rejects.toThrow(/timed out|complex/i);
  });

  it("soffice OK mas arquivo não aparece → erro 'did not produce expected output file'", async () => {
    execFileMock.mockImplementation((_bin: string, _args: string[], _opts: object, cb: (e: unknown) => void) => {
      queueMicrotask(() => cb(null));
    });

    fsMocks.access.mockRejectedValue(new Error("nope"));

    await expect(convertToWord("/tmp/abc-input.pdf", "/tmp")).rejects.toThrow(/did not produce expected output file/);
  });

  it("fallback rejeita quando packer gera buffer vazio", async () => {
    execFileMock.mockImplementation((bin: string, _args: string[], _opts: object, cb: (e: unknown) => void) => {
      queueMicrotask(() => {
        if (bin === "soffice") cb(new Error("crash"));
        else cb(null);
      });
    });

    execMock.mockImplementation((_cmd: string, cb?: (e: unknown) => void) => {
      if (cb) queueMicrotask(() => cb(null));
      return { on: vi.fn() };
    });

    fsMocks.readFile.mockResolvedValue("texto");
    packerToBufferMock.mockResolvedValue(Buffer.alloc(0));

    await expect(convertToWord("/tmp/abc-input.pdf", "/tmp")).rejects.toThrow();
  });
});
