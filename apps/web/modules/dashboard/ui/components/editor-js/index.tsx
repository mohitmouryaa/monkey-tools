"use client";

import EditorJS, { type BlockToolConstructable, type OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import EditorjsList from "@editorjs/list";
import Quote from "@editorjs/quote";
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
// @editorjs/checklist e @editorjs/embed não expõem tipos via package.json#exports;
// shim local em ./editor-js-plugins.d.ts os tipa como `unknown` (cast abaixo).
import Checklist from "@editorjs/checklist";
import ImageTool from "@editorjs/image";
import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { usePostFileUpload } from "@/modules/dashboard/hooks/use-post-file-upload";
import { useTRPC } from "@/trpc/client";
import { ToolEmbedBlock } from "@/modules/dashboard/ui/components/editor-js/tool-embed-block";

interface EditorJsProps {
  value?: OutputData | object;
  onChange: (data: OutputData) => void;
  holderId?: string;
}

// @editorjs/list v2 exige `meta` em cada item; posts antigos foram salvos
// no formato v1 (items: string[]) ou intermediário (sem meta). Normalizamos
// no read pra evitar "Block «list» skipped because of plugins error".
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

function normalizeEditorData(data: OutputData | object | undefined): OutputData {
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

export const EditorJsWrapper = ({ value, onChange, holderId }: EditorJsProps) => {
  const ref = useRef<EditorJS | null>(null);
  const queryClient = useQueryClient();
  const trpc = useTRPC();
  const { uploadFile } = usePostFileUpload();
  // useState lazy: holder único por mount físico. useId retornaria o mesmo
  // valor no double-mount do Strict Mode, causando colisão.
  const [generatedId] = useState(() => Math.random().toString(36).slice(2));
  const effectiveHolderId = holderId ?? `post-editor-${generatedId}`;

  // biome-ignore lint/correctness/useExhaustiveDependencies: Editor.js DOM imperativo precisa init única; listar deps causaria reinit em loop
  useEffect(() => {
    // Adia o init pra próxima task: em React 19 Strict Mode dev o effect roda
    // mount→cleanup→mount na mesma frame; o setTimeout permite que o cleanup
    // cancele o primeiro init antes de o EditorJS ser criado, evitando que
    // o destroy assíncrono da primeira instância apague o conteúdo da segunda.
    let cancelled = false;
    let localEditor: EditorJS | null = null;

    const timer = setTimeout(() => {
      if (cancelled) return;
      const editor = new EditorJS({
        holder: effectiveHolderId,
        data: normalizeEditorData(value),
        // Tipos upstream do Editor.js exigem `BlockToolConstructable` exato; os plugins
        // oficiais têm constructor mais estrito (config obrigatório), então fazemos cast.
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
              // P7 (C): plugin chama callback que usa fetchQuery do TanStack Query
              // com queryOptions geradas pelo tRPC — evita reconstruir queryKey manualmente.
              fetchTools: () => queryClient.fetchQuery(trpc.tools.getMany.queryOptions({ pageSize: 100 })),
            },
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
      // Editor.js destroy é assíncrono; ignorar erros em hot reload / unmount race.
      toDestroy?.isReady.then(() => toDestroy.destroy()).catch(() => {});
    };
  }, []);

  return <div id={effectiveHolderId} className="min-h-[400px] border rounded-lg p-4 bg-background" />;
};

export default EditorJsWrapper;
