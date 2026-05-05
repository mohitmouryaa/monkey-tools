"use client";

import EditorJS, { type BlockToolConstructable, type OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import EditorjsList from "@editorjs/list";
import Quote from "@editorjs/quote";
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import Checklist from "@editorjs/checklist";
import ImageTool from "@editorjs/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { usePostFileUpload } from "@/modules/dashboard/hooks/use-post-file-upload";
import { useTRPC } from "@/trpc/client";
import { ToolEmbedBlock } from "@/modules/dashboard/ui/components/editor-js/tool-embed-block";
import { CardsPlugin } from "@/modules/dashboard/ui/components/editorjs-plugins/cards.plugin";
import { CtaPlugin } from "@/modules/dashboard/ui/components/editorjs-plugins/cta.plugin";
import { FaqPlugin } from "@/modules/dashboard/ui/components/editorjs-plugins/faq.plugin";
import { HeroPlugin } from "@/modules/dashboard/ui/components/editorjs-plugins/hero.plugin";
import { RawHtmlPlugin } from "@/modules/dashboard/ui/components/editorjs-plugins/raw-html.plugin";
import { StepsPlugin } from "@/modules/dashboard/ui/components/editorjs-plugins/steps.plugin";
import { BlockEditDialog } from "./block-edit-dialog";
import type { BlockDataByType, EditableBlockType, EditingBlock } from "./types";

interface EditorJSFieldProps {
  value?: OutputData;
  onChange: (data: OutputData) => void;
  holderId?: string;
}

// TODO(post-fase-11): extrair normalize* para util compartilhado se Blog/Pages divergirem.
type AnyListItem = string | { content?: string; text?: string; checked?: boolean; items?: AnyListItem[]; meta?: unknown };

function normalizeListItems(items: AnyListItem[] | undefined, style: string | undefined): unknown[] {
  if (!Array.isArray(items)) return [];
  return items.map((item) => {
    if (typeof item === "string") {
      return { content: item, meta: style === "checklist" ? { checked: false } : {}, items: [] };
    }
    const content = item.content ?? item.text ?? "";
    const meta = item.meta ?? (style === "checklist" ? { checked: !!item.checked } : {});
    return { content, meta, items: normalizeListItems(item.items, style) };
  });
}

function normalizeEditorData(data: OutputData | undefined): OutputData {
  const safe = (data ?? {}) as OutputData;
  return {
    ...safe,
    blocks: (safe.blocks ?? []).map((block) => {
      if (block?.type !== "list") return block;
      // biome-ignore lint/suspicious/noExplicitAny: shape varia entre versões antigas
      const d = block.data as any;
      return { ...block, data: { ...d, items: normalizeListItems(d?.items, d?.style) } };
    }),
  };
}

export const EditorJSField = ({ value, onChange, holderId }: EditorJSFieldProps) => {
  const ref = useRef<EditorJS | null>(null);
  const queryClient = useQueryClient();
  const trpc = useTRPC();
  const { uploadFile } = usePostFileUpload();

  // Holder único por mount — useId colide no double-mount do Strict Mode (decisão herdada
  // da Fase 0.7 / commit 76a5176).
  const [generatedId] = useState(() => Math.random().toString(36).slice(2));
  const effectiveHolderId = holderId ?? `page-editor-${generatedId}`;

  const [editingBlock, setEditingBlock] = useState<EditingBlock | null>(null);

  // Ref estável para o callback que os plugins recebem em `config.openEditor`. Sem isso,
  // toda mudança de `setEditingBlock` reinitaria o Editor.js no useEffect.
  const openEditorRef = useRef<
    <T extends EditableBlockType>(type: T, data: BlockDataByType[T], onSave: (next: BlockDataByType[T]) => void) => void
  >(() => {});
  openEditorRef.current = useCallback(
    <T extends EditableBlockType>(type: T, data: BlockDataByType[T], onSave: (next: BlockDataByType[T]) => void) => {
      setEditingBlock({ type, data, onSave } as EditingBlock);
    },
    [],
  );

  const makePluginConfig = useCallback(<T extends EditableBlockType>(type: T) => {
    return {
      openEditor: (currentData: BlockDataByType[T], onSave: (next: BlockDataByType[T]) => void) => {
        openEditorRef.current(type, currentData, onSave);
      },
    };
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Editor.js init única — ver editor-js/index.tsx
  useEffect(() => {
    let cancelled = false;
    let localEditor: EditorJS | null = null;

    const timer = setTimeout(() => {
      if (cancelled) return;
      const editor = new EditorJS({
        holder: effectiveHolderId,
        data: normalizeEditorData(value),
        tools: {
          header: { class: Header as unknown as BlockToolConstructable, inlineToolbar: true },
          list: { class: EditorjsList as unknown as BlockToolConstructable, inlineToolbar: true },
          quote: { class: Quote as unknown as BlockToolConstructable, inlineToolbar: true },
          embed: Embed as BlockToolConstructable,
          table: Table as unknown as BlockToolConstructable,
          checklist: Checklist as BlockToolConstructable,
          image: {
            class: ImageTool as unknown as BlockToolConstructable,
            config: {
              uploader: {
                uploadByFile: async (file: File) => {
                  const { url } = await uploadFile(file);
                  return { success: 1, file: { url } };
                },
              },
            },
          },
          toolEmbed: {
            class: ToolEmbedBlock as unknown as BlockToolConstructable,
            config: {
              fetchTools: () => queryClient.fetchQuery(trpc.tools.getMany.queryOptions({ pageSize: 100 })),
            },
          },
          hero: { class: HeroPlugin as unknown as BlockToolConstructable, config: makePluginConfig("hero") },
          steps: { class: StepsPlugin as unknown as BlockToolConstructable, config: makePluginConfig("steps") },
          cards: { class: CardsPlugin as unknown as BlockToolConstructable, config: makePluginConfig("cards") },
          faq: { class: FaqPlugin as unknown as BlockToolConstructable, config: makePluginConfig("faq") },
          cta: { class: CtaPlugin as unknown as BlockToolConstructable, config: makePluginConfig("cta") },
          // NOTE: raw-html visível na toolbox (decisão P3=A); criação manual permitida.
          "raw-html": {
            class: RawHtmlPlugin as unknown as BlockToolConstructable,
            config: makePluginConfig("raw-html"),
          },
        },
        async onChange(api) {
          const saved = await api.saver.save();
          onChange(saved);
        },
      });
      localEditor = editor;
      ref.current = editor;
    }, 0);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      const toDestroy = localEditor;
      localEditor = null;
      if (ref.current === toDestroy) ref.current = null;
      toDestroy?.isReady.then(() => toDestroy.destroy()).catch(() => {});
    };
  }, []);

  return (
    <>
      <div id={effectiveHolderId} className="min-h-[400px] border rounded-lg p-4 bg-background" />
      <BlockEditDialog editing={editingBlock} onClose={() => setEditingBlock(null)} />
    </>
  );
};

export default EditorJSField;
