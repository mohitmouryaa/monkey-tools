// SPIKE — Fase 0.7. Plugin descartável que prova o padrão de bridge
// plugin → modal React via callback `openEditor` no `config`. Apaga depois.

interface SpikeHelloData {
  text: string;
}

interface SpikeHelloConfig {
  openEditor: (currentData: SpikeHelloData, onSave: (next: SpikeHelloData) => void) => void;
}

export class SpikeHelloPlugin {
  private data: SpikeHelloData;
  private config: SpikeHelloConfig;
  private previewEl: HTMLElement | null = null;

  constructor({ data, config }: { data: SpikeHelloData; config: SpikeHelloConfig }) {
    this.data = data && typeof data.text === "string" ? data : { text: "" };
    this.config = config;
  }

  static get toolbox() {
    return {
      title: "Spike Hello",
      icon: "<svg width='17' height='15'><circle cx='8.5' cy='7.5' r='6' fill='none' stroke='currentColor' stroke-width='2'/></svg>",
    };
  }

  render(): HTMLElement {
    const wrapper = document.createElement("div");
    wrapper.className = "p-4 border border-dashed rounded-md bg-muted/30 flex items-center justify-between gap-3";

    const preview = document.createElement("div");
    preview.className = "flex-1 text-sm text-foreground";
    preview.textContent = this.data.text || "(vazio — clique em Editar)";
    this.previewEl = preview;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "px-3 py-1 text-sm rounded-md bg-primary text-primary-foreground hover:bg-primary/90";
    button.textContent = "Editar";
    button.addEventListener("click", () => {
      this.config.openEditor(this.data, (next) => {
        this.data = next;
        if (this.previewEl) {
          this.previewEl.textContent = next.text || "(vazio — clique em Editar)";
        }
      });
    });

    wrapper.appendChild(preview);
    wrapper.appendChild(button);
    return wrapper;
  }

  save(): SpikeHelloData {
    return this.data;
  }

  validate(saved: SpikeHelloData): boolean {
    return typeof saved?.text === "string";
  }
}
