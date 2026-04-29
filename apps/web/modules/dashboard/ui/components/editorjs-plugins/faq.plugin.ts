import type { FaqBlockData } from "@workspace/types";

interface FaqPluginConfig {
  openEditor: (currentData: FaqBlockData, onSave: (next: FaqBlockData) => void) => void;
}

const DEFAULT_DATA: FaqBlockData = { items: [] };

const PREVIEW_EMPTY = "(vazio — clique em Editar)";

const ICON_SVG =
  "<svg width='17' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='10'/><path d='M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3'/><line x1='12' y1='17' x2='12.01' y2='17'/></svg>";

export class FaqPlugin {
  private data: FaqBlockData;
  private config: FaqPluginConfig;
  private previewEl: HTMLElement | null = null;

  constructor({ data, config }: { data: FaqBlockData; config: FaqPluginConfig }) {
    this.data = normalize(data);
    this.config = config;
  }

  static get toolbox() {
    return {
      title: "FAQ",
      icon: ICON_SVG,
    };
  }

  render(): HTMLElement {
    const wrapper = document.createElement("div");
    wrapper.className = "p-4 border border-dashed rounded-md bg-muted/30 flex items-center justify-between gap-3";

    const preview = document.createElement("div");
    preview.className = "flex-1 text-sm text-foreground min-w-0";
    preview.appendChild(this.renderPreviewContent());
    this.previewEl = preview;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "shrink-0 px-3 py-1 text-sm rounded-md bg-primary text-primary-foreground hover:bg-primary/90";
    button.textContent = "Editar";
    button.addEventListener("click", () => {
      this.config.openEditor(this.data, (next) => {
        this.data = normalize(next);
        this.refreshPreview();
      });
    });

    wrapper.appendChild(preview);
    wrapper.appendChild(button);
    return wrapper;
  }

  private renderPreviewContent(): DocumentFragment {
    const frag = document.createDocumentFragment();
    const label = document.createElement("div");
    label.className = "text-xs uppercase tracking-wide text-muted-foreground mb-1";
    label.textContent = "FAQ";
    const body = document.createElement("div");
    body.className = "text-sm font-medium truncate";
    const count = this.data.items.length;
    if (count === 0) {
      body.textContent = this.data.title || PREVIEW_EMPTY;
    } else {
      const titlePart = this.data.title ? `${this.data.title} · ` : "";
      body.textContent = `${titlePart}${count} ${count === 1 ? "pergunta" : "perguntas"}`;
    }
    frag.appendChild(label);
    frag.appendChild(body);
    return frag;
  }

  private refreshPreview(): void {
    if (!this.previewEl) return;
    this.previewEl.replaceChildren(this.renderPreviewContent());
  }

  save(): FaqBlockData {
    return this.data;
  }

  validate(saved: FaqBlockData): boolean {
    return Boolean(saved) && typeof saved === "object" && Array.isArray(saved.items);
  }
}

function normalize(data: FaqBlockData | undefined): FaqBlockData {
  if (!data || typeof data !== "object") return { ...DEFAULT_DATA };
  return {
    title: data.title,
    items: Array.isArray(data.items) ? data.items : [],
  };
}
