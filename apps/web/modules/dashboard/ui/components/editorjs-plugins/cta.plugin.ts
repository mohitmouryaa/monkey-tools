import type { CtaBlockData } from "@workspace/types";

interface CtaPluginConfig {
  openEditor: (currentData: CtaBlockData, onSave: (next: CtaBlockData) => void) => void;
}

const DEFAULT_DATA: CtaBlockData = {
  heading: "",
  buttonText: "",
  buttonLink: "",
};

const PREVIEW_EMPTY = "(vazio — clique em Editar)";

const ICON_SVG =
  "<svg width='17' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M3 11l18-8v18l-18-8v-2z'/><path d='M11 19l-2 3'/></svg>";

export class CtaPlugin {
  private data: CtaBlockData;
  private config: CtaPluginConfig;
  private previewEl: HTMLElement | null = null;

  constructor({ data, config }: { data: CtaBlockData; config: CtaPluginConfig }) {
    this.data = data && typeof data === "object" ? { ...DEFAULT_DATA, ...data } : { ...DEFAULT_DATA };
    this.config = config;
  }

  static get toolbox() {
    return {
      title: "CTA",
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
        this.data = next;
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
    label.textContent = "CTA";
    const body = document.createElement("div");
    body.className = "text-sm font-medium truncate";
    body.textContent = this.data.heading || PREVIEW_EMPTY;
    frag.appendChild(label);
    frag.appendChild(body);
    return frag;
  }

  private refreshPreview(): void {
    if (!this.previewEl) return;
    this.previewEl.replaceChildren(this.renderPreviewContent());
  }

  save(): CtaBlockData {
    return this.data;
  }

  validate(saved: CtaBlockData): boolean {
    return Boolean(saved) && typeof saved === "object";
  }
}
