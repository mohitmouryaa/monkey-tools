import { afterEach, beforeAll, beforeEach, vi } from "vitest";

const isDom = typeof window !== "undefined" && typeof navigator !== "undefined";

if (isDom) {
  await import("@testing-library/jest-dom/vitest");
  const { cleanup } = await import("@testing-library/react");
  afterEach(() => {
    cleanup();
  });
}

beforeAll(() => {
  if (!isDom) return;

  if (!globalThis.URL.createObjectURL) {
    Object.defineProperty(globalThis.URL, "createObjectURL", {
      value: vi.fn(() => "blob:fake"),
      writable: true,
      configurable: true,
    });
  }
  if (!globalThis.URL.revokeObjectURL) {
    Object.defineProperty(globalThis.URL, "revokeObjectURL", {
      value: vi.fn(),
      writable: true,
      configurable: true,
    });
  }

  if (!window.matchMedia) {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(() => false),
    }));
  }

  if (!globalThis.ResizeObserver) {
    globalThis.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  }
});

beforeEach(() => {
  if (!isDom) return;
  // Sempre redefine clipboard.writeText como mock antes de cada teste
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText: vi.fn().mockResolvedValue(undefined) },
    configurable: true,
    writable: true,
  });
});
