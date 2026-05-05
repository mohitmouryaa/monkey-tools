import { describe, expect, it, vi, beforeEach } from "vitest";
import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";

const uploadFile = vi.hoisted(() => vi.fn(async () => ({ url: "https://signed", fileKey: "uploads/x.pdf" })));
const mutateAsync = vi.hoisted(() => vi.fn(async () => ({ jobId: "job-1" })));
const useJobReturn = vi.hoisted(() => ({ data: null as { status?: string; outputUrl?: string } | null, isLoading: false }));

vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn(), info: vi.fn() } }));
vi.mock("next/link", () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) =>
    React.createElement("a", { href }, children),
}));
vi.mock("@/modules/common/hooks/use-file-upload", () => ({
  useFileUpload: () => ({ uploadFile, uploadProgress: 100, isUploading: false }),
}));
vi.mock("@/modules/dashboard/hooks/use-create-job", () => ({
  useCreateJob: () => ({ mutateAsync, mutate: vi.fn(), isPending: false, isLoading: false }),
}));
vi.mock("@/modules/dashboard/hooks/use-job", () => ({
  useJob: () => useJobReturn,
}));
vi.mock("@/modules/common/ui/components/file-upload", () => ({
  FileUpload: ({ onFilesSelected, onFileSelected }: { onFilesSelected?: (f: File[]) => void; onFileSelected?: (f: File) => void }) =>
    React.createElement("button", {
      "data-testid": "fake-upload",
      onClick: () => {
        const file = new File(["dummy"], "test.pdf", { type: "application/pdf" });
        if (onFilesSelected) onFilesSelected([file]);
        if (onFileSelected) onFileSelected(file);
      },
    }, "Selecionar arquivo"),
}));

import CompressPdf from "../ui/components/comprimir-pdf";
import AdvancedCompressPdf from "../ui/components/compressor-avancado-pdf";
import WordToPdf from "../ui/components/word-para-pdf";
import PdfToWord from "../ui/components/pdf-para-word";

import { JOB_TYPES } from "@workspace/types";

const tools = [
  { name: "comprimir-pdf", Component: CompressPdf, jobType: JOB_TYPES.COMPRESS_PDF, actionLabel: /^Comprimir PDF$/ },
  {
    name: "compressor-avancado-pdf",
    Component: AdvancedCompressPdf,
    jobType: JOB_TYPES.ADVANCED_COMPRESS_PDF,
    actionLabel: /Comprimir PDF Agora/i,
  },
  { name: "word-para-pdf", Component: WordToPdf, jobType: JOB_TYPES.WORD_TO_PDF, actionLabel: /Converter para PDF/i },
  { name: "pdf-para-word", Component: PdfToWord, jobType: JOB_TYPES.PDF_TO_WORD, actionLabel: /Converter para Word/i },
];

describe.each(tools)("Server-side tool: $name", ({ Component, jobType, actionLabel }) => {
  beforeEach(() => {
    uploadFile.mockClear();
    mutateAsync.mockClear();
    useJobReturn.data = null;
  });

  it("happy path: monta sem erro", () => {
    const { container } = render(<Component />);
    expect(container.firstChild).toBeTruthy();
  });

  it("seleção de arquivo dispara uploadFile com o File correto", async () => {
    render(<Component />);
    fireEvent.click(screen.getByTestId("fake-upload"));
    await waitFor(() => expect(uploadFile).toHaveBeenCalled());
    const arg = uploadFile.mock.calls[0][0] as File;
    expect(arg.name).toBe("test.pdf");
  });

  it("após upload, ao processar cria job com tool correto", async () => {
    render(<Component />);
    fireEvent.click(screen.getByTestId("fake-upload"));
    await waitFor(() => expect(uploadFile).toHaveBeenCalled());

    const action = await screen.findByRole("button", { name: actionLabel });
    fireEvent.click(action);

    await waitFor(() => expect(mutateAsync).toHaveBeenCalled());
    const payload = mutateAsync.mock.calls[0][0] as { tool: string };
    expect(payload.tool).toBe(jobType);
  });

  it("edge: upload falha → componente sobrevive (sem crash)", async () => {
    uploadFile.mockRejectedValueOnce(new Error("boom"));
    const { container } = render(<Component />);
    fireEvent.click(screen.getByTestId("fake-upload"));
    await waitFor(() => expect(uploadFile).toHaveBeenCalled());
    // Espera o componente reassentar após o catch + setState assíncrono
    await waitFor(() => expect(container.firstChild).toBeTruthy());
    // O componente continua montado e o FileUpload mockado pode ou não ter sido
    // re-renderizado; o critério é apenas que não houve crash
    expect(container.firstChild).toBeTruthy();
  });

  it("edge: jobData COMPLETED é refletido na UI sem quebrar", async () => {
    useJobReturn.data = { status: "COMPLETED", outputUrl: "https://download/x" };
    await act(async () => {
      render(<Component />);
    });
    expect(screen.queryByTestId("fake-upload")).toBeTruthy();
  });
});
