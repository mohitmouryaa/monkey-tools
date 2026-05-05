import type { CardsBlockData } from "@workspace/types";

interface CardsPluginConfig {
  openEditor: (currentData: CardsBlockData, onSave: (next: CardsBlockData) => void) => void;
}

const DEFAULT_DATA: CardsBlockData = { cards: [] };

const PREVIEW_EMPTY = "(vazio — clique em Editar)";

const ICON_SVG =
  "<svg width='17' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect x='3' y='3' width='7' height='7'/><rect x='14' y='3' width='7' height='7'/><rect x='14' y='14' width='7' height='7'/><rect x='3' y='14' width='7' height='7'/></svg>";

export class CardsPlugin {
  private data: CardsBlockData;
  private config: CardsPluginConfig;
  private previewEl: HTMLElement | null = null;

  constructor({ data, config }: { data: CardsBlockData; config: CardsPluginConfig }) {
    this.data = normalize(data);
    this.config = config;
  }

  static get toolbox() {
    return {
      title: "Cards",
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
    label.textContent = "Cards";
    const body = document.createElement("div");
    body.className = "text-sm font-medium truncate";
    const count = this.data.cards.length;
    if (count === 0) {
      body.textContent = this.data.title || PREVIEW_EMPTY;
    } else {
      const titlePart = this.data.title ? `${this.data.title} · ` : "";
      body.textContent = `${titlePart}${count} ${count === 1 ? "card" : "cards"}`;
    }
    frag.appendChild(label);
    frag.appendChild(body);
    return frag;
  }

  private refreshPreview(): void {
    if (!this.previewEl) return;
    this.previewEl.replaceChildren(this.renderPreviewContent());
  }

  save(): CardsBlockData {
    return this.data;
  }

  validate(saved: CardsBlockData): boolean {
    return Boolean(saved) && typeof saved === "object" && Array.isArray(saved.cards);
  }
}

function normalize(data: CardsBlockData | undefined): CardsBlockData {
  if (!data || typeof data !== "object") return { ...DEFAULT_DATA };
  return {
    title: data.title,
    subtitle: data.subtitle,
    cards: Array.isArray(data.cards) ? data.cards : [],
  };
}
