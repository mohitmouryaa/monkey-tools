interface ToolEmbedData {
  toolId: string;
}

interface ToolItem {
  _id: string;
  title: string;
}

interface ToolsListResponse {
  items: ToolItem[];
}

interface ToolEmbedConfig {
  fetchTools: () => Promise<ToolsListResponse>;
}

export class ToolEmbedBlock {
  private data: ToolEmbedData;
  private config: ToolEmbedConfig;

  constructor({
    data,
    config,
  }: {
    data: ToolEmbedData;
    config: ToolEmbedConfig;
  }) {
    this.data = data ?? { toolId: "" };
    this.config = config;
  }

  static get toolbox() {
    return {
      title: "Tool Embed",
      icon: "<svg width='17' height='15'><path d='M2 5h13M2 10h13' stroke='currentColor' stroke-width='2'/></svg>",
    };
  }

  render(): HTMLElement {
    const wrapper = document.createElement("div");
    wrapper.className = "p-3 border rounded-md bg-muted/30";

    const select = document.createElement("select");
    select.className = "w-full p-2 border rounded bg-background text-foreground";
    select.disabled = true;
    select.innerHTML = '<option value="">Loading tools...</option>';

    select.addEventListener("change", () => {
      this.data.toolId = select.value;
    });

    wrapper.appendChild(select);

    this.loadTools(select).catch((err) => {
      console.error("ToolEmbedBlock: failed to load tools", err);
      select.innerHTML = '<option value="">Failed to load tools</option>';
    });

    return wrapper;
  }

  private async loadTools(select: HTMLSelectElement): Promise<void> {
    const data = await this.config.fetchTools();

    select.disabled = false;
    select.innerHTML = '<option value="">— Select a tool —</option>';
    for (const tool of data.items) {
      const opt = document.createElement("option");
      opt.value = tool._id;
      opt.textContent = tool.title;
      if (tool._id === this.data.toolId) opt.selected = true;
      select.appendChild(opt);
    }
  }

  save(blockContent: HTMLElement): ToolEmbedData {
    const select = blockContent.querySelector("select");
    return { toolId: select?.value ?? this.data.toolId };
  }

  validate(savedData: ToolEmbedData): boolean {
    return Boolean(savedData?.toolId);
  }
}
