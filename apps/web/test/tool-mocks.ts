import React from "react";
import { vi } from "vitest";

vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn(), info: vi.fn(), warning: vi.fn() } }));

vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) =>
    React.createElement("a", { href, ...rest }, children),
}));

vi.mock("@/modules/common/lib/lazy-load-libs", () => ({
  lazyLoadPdfLib: vi.fn(async () => ({
    PDFDocument: {
      load: vi.fn(async () => ({
        getPageCount: () => 1,
        getPages: () => [{ getSize: () => ({ width: 595, height: 842 }), drawText: vi.fn(), drawImage: vi.fn(), setRotation: vi.fn() }],
        copyPages: vi.fn(async () => [{}]),
        addPage: vi.fn(),
        save: vi.fn(async () => new Uint8Array([1, 2, 3])),
        embedFont: vi.fn(async () => ({})),
        embedJpg: vi.fn(async () => ({ scale: () => ({ width: 100, height: 100 }) })),
        embedPng: vi.fn(async () => ({ scale: () => ({ width: 100, height: 100 }) })),
        registerFontkit: vi.fn(),
      })),
      create: vi.fn(async () => ({
        addPage: vi.fn(() => ({ drawText: vi.fn() })),
        copyPages: vi.fn(async () => [{}]),
        save: vi.fn(async () => new Uint8Array([1, 2, 3])),
        embedFont: vi.fn(async () => ({})),
      })),
    },
    StandardFonts: { Helvetica: "Helvetica" },
    rgb: vi.fn(),
    degrees: vi.fn((d: number) => d),
  })),
  lazyLoadXlsx: vi.fn(async () => ({
    utils: {
      json_to_sheet: vi.fn(() => ({})),
      sheet_to_json: vi.fn(() => []),
      book_new: vi.fn(() => ({})),
      book_append_sheet: vi.fn(),
    },
    write: vi.fn(() => new Uint8Array([1])),
    read: vi.fn(() => ({ SheetNames: ["Sheet1"], Sheets: { Sheet1: {} } })),
    writeFile: vi.fn(),
  })),
  lazyLoadJsPdf: vi.fn(async () => ({
    default: vi.fn().mockImplementation(() => ({
      addImage: vi.fn(),
      addPage: vi.fn(),
      save: vi.fn(),
      output: vi.fn(() => new Uint8Array([1])),
    })),
  })),
  lazyLoadJsZip: vi.fn(async () => {
    return vi.fn().mockImplementation(() => ({
      file: vi.fn(),
      generateAsync: vi.fn(async () => new Blob(["zip"])),
      loadAsync: vi.fn(async () => ({ files: {} })),
    }));
  }),
}));

vi.mock("@/modules/common/ui/components/file-upload", () => ({
  FileUpload: ({ onFilesSelected, accept }: { onFilesSelected?: (f: File[]) => void; accept?: string }) =>
    React.createElement(
      "div",
      {
        "data-testid": "file-upload",
        "data-accept": accept,
      },
      React.createElement("input", {
        "data-testid": "file-upload-input",
        type: "file",
        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
          onFilesSelected?.(e.target.files ? Array.from(e.target.files) : []),
      }),
    ),
}));

vi.mock("@/modules/common/ui/components/selectable-pdf-grid", () => ({
  SelectablePDFGrid: () => React.createElement("div", { "data-testid": "selectable-pdf-grid" }),
}));

vi.mock("@/modules/common/ui/components/sortable-pdf-grid", () => ({
  SortablePDFGrid: () => React.createElement("div", { "data-testid": "sortable-pdf-grid" }),
}));

vi.mock("@/modules/common/hooks/use-pdf-manager", () => ({
  usePdfManager: () => ({
    files: [],
    setFiles: vi.fn(),
    pages: [],
    setPages: vi.fn(),
    isProcessing: false,
    handleFilesSelected: vi.fn(),
    removePage: vi.fn(),
    rotatePage: vi.fn(),
    rotatePages: vi.fn(),
    reset: vi.fn(),
  }),
}));

vi.mock("@/modules/common/hooks/use-file-upload", () => ({
  useFileUpload: () => ({
    uploadFile: vi.fn(async () => ({ key: "uploads/fake.pdf", uploadProgress: 100 })),
    uploadProgress: 0,
    isUploading: false,
  }),
}));

vi.mock("@/modules/dashboard/hooks/use-create-job", () => ({
  useCreateJob: () => ({
    mutateAsync: vi.fn(async () => ({ _id: "job-1" })),
    mutate: vi.fn(),
    isPending: false,
    isLoading: false,
  }),
}));

vi.mock("@/modules/dashboard/hooks/use-job", () => ({
  useJob: () => ({ data: null, isLoading: false }),
}));

vi.mock("@/modules/common/constants", () => ({
  MAX_FILE_SIZE: 50 * 1024 * 1024,
  MAX_FILES: 10,
}));

vi.mock("pdfjs-dist", () => ({
  getDocument: vi.fn(() => ({
    promise: Promise.resolve({
      numPages: 1,
      getPage: vi.fn(async () => ({
        getViewport: () => ({ width: 100, height: 100 }),
        render: () => ({ promise: Promise.resolve() }),
        getTextContent: async () => ({ items: [] }),
      })),
    }),
  })),
  GlobalWorkerOptions: { workerSrc: "" },
}));

vi.mock("@imgly/background-removal", () => ({
  default: vi.fn(async () => new Blob(["x"])),
  removeBackground: vi.fn(async () => new Blob(["x"])),
}));

vi.mock("browser-image-compression", () => ({
  default: vi.fn(async (file: File) => file),
}));

vi.mock("heic2any", () => ({
  default: vi.fn(async () => new Blob(["jpg"], { type: "image/jpeg" })),
}));

vi.mock("@pdfsmaller/pdf-encrypt-lite", () => ({
  default: { encrypt: vi.fn(async () => new Uint8Array([1])) },
  encrypt: vi.fn(async () => new Uint8Array([1])),
  decrypt: vi.fn(async () => new Uint8Array([1])),
}));
