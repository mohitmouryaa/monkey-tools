import type { RawHtmlBlockData } from "@workspace/types";

interface RawHtmlPluginConfig {
  openEditor: (currentData: RawHtmlBlockData, onSave: (next: RawHtmlBlockData) => void) => void;
}

const DEFAULT_DATA: RawHtmlBlockData = { html: "" };

const PREVIEW_EMPTY = "(vazio — clique em Editar)";

const PREVIEW_MAX = 80;

const ICON_SVG =
  "<svg width='17' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='16 18 22 12 16 6'/><polyline points='8 6 2 12 8 18'/></svg>";

export class RawHtmlPlugin {
  private data: RawHtmlBlockData;
  private config: RawHtmlPluginConfig;
  private previewEl: HTMLElement | null = null;

  constructor({ data, config }: { data: RawHtmlBlockData; config: RawHtmlPluginConfig }) {
    this.data = data && typeof data === "object" ? { ...DEFAULT_DATA, ...data } : { ...DEFAULT_DATA };
    this.config = config;
  }

  static get toolbox() {
    return {
      title: "HTML cru",
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
    label.textContent = "HTML cru";
    const body = document.createElement("code");
    body.className = "block text-xs font-mono text-muted-foreground truncate";
    body.textContent = summarize(this.data.html);
    frag.appendChild(label);
    frag.appendChild(body);
    return frag;
  }

  private refreshPreview(): void {
    if (!this.previewEl) return;
    this.previewEl.replaceChildren(this.renderPreviewContent());
  }

  save(): RawHtmlBlockData {
    return this.data;
  }

  validate(saved: RawHtmlBlockData): boolean {
    return Boolean(saved) && typeof saved === "object" && typeof saved.html === "string";
  }
}

function summarize(html: string): string {
  if (!html) return PREVIEW_EMPTY;
  const flat = html.replace(/\s+/g, " ").trim();
  return flat.length > PREVIEW_MAX ? `${flat.slice(0, PREVIEW_MAX)}…` : flat;
}
