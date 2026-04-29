import type { HeroBlockData } from "@workspace/types";

interface HeroPluginConfig {
  openEditor: (currentData: HeroBlockData, onSave: (next: HeroBlockData) => void) => void;
}

const DEFAULT_DATA: HeroBlockData = { heading: "" };

const PREVIEW_EMPTY = "(vazio — clique em Editar)";

const ICON_SVG =
  "<svg width='17' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polygon points='13 2 3 14 12 14 11 22 21 10 12 10 13 2'/></svg>";

export class HeroPlugin {
  private data: HeroBlockData;
  private config: HeroPluginConfig;
  private previewEl: HTMLElement | null = null;

  constructor({ data, config }: { data: HeroBlockData; config: HeroPluginConfig }) {
    this.data = data && typeof data === "object" ? { ...DEFAULT_DATA, ...data } : { ...DEFAULT_DATA };
    this.config = config;
  }

  static get toolbox() {
    return {
      title: "Hero",
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
    label.textContent = "Hero";
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

  save(): HeroBlockData {
    return this.data;
  }

  validate(saved: HeroBlockData): boolean {
    return Boolean(saved) && typeof saved === "object";
  }
}
