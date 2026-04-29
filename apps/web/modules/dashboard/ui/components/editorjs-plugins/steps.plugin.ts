import type { StepsBlockData } from "@workspace/types";

interface StepsPluginConfig {
  openEditor: (currentData: StepsBlockData, onSave: (next: StepsBlockData) => void) => void;
}

const DEFAULT_DATA: StepsBlockData = { steps: [] };

const PREVIEW_EMPTY = "(vazio — clique em Editar)";

const ICON_SVG =
  "<svg width='17' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><line x1='8' y1='6' x2='21' y2='6'/><line x1='8' y1='12' x2='21' y2='12'/><line x1='8' y1='18' x2='21' y2='18'/><line x1='3' y1='6' x2='3.01' y2='6'/><line x1='3' y1='12' x2='3.01' y2='12'/><line x1='3' y1='18' x2='3.01' y2='18'/></svg>";

export class StepsPlugin {
  private data: StepsBlockData;
  private config: StepsPluginConfig;
  private previewEl: HTMLElement | null = null;

  constructor({ data, config }: { data: StepsBlockData; config: StepsPluginConfig }) {
    this.data = normalize(data);
    this.config = config;
  }

  static get toolbox() {
    return {
      title: "Steps",
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
    label.textContent = "Steps";
    const body = document.createElement("div");
    body.className = "text-sm font-medium truncate";
    const count = this.data.steps.length;
    if (count === 0) {
      body.textContent = this.data.title || PREVIEW_EMPTY;
    } else {
      const titlePart = this.data.title ? `${this.data.title} · ` : "";
      body.textContent = `${titlePart}${count} ${count === 1 ? "passo" : "passos"}`;
    }
    frag.appendChild(label);
    frag.appendChild(body);
    return frag;
  }

  private refreshPreview(): void {
    if (!this.previewEl) return;
    this.previewEl.replaceChildren(this.renderPreviewContent());
  }

  save(): StepsBlockData {
    return this.data;
  }

  validate(saved: StepsBlockData): boolean {
    return Boolean(saved) && typeof saved === "object" && Array.isArray(saved.steps);
  }
}

function normalize(data: StepsBlockData | undefined): StepsBlockData {
  if (!data || typeof data !== "object") return { ...DEFAULT_DATA };
  return {
    title: data.title,
    subtitle: data.subtitle,
    steps: Array.isArray(data.steps) ? data.steps : [],
  };
}
