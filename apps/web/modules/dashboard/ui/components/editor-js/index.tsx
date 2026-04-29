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
import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { usePostFileUpload } from "@/modules/dashboard/hooks/use-post-file-upload";
import { useTRPC } from "@/trpc/client";
import { ToolEmbedBlock } from "@/modules/dashboard/ui/components/editor-js/tool-embed-block";

interface EditorJsProps {
  value?: OutputData | object;
  onChange: (data: OutputData) => void;
  holderId?: string;
}

export const EditorJsWrapper = ({ value, onChange, holderId = "post-editor-js" }: EditorJsProps) => {
  const ref = useRef<EditorJS | null>(null);
  const queryClient = useQueryClient();
  const trpc = useTRPC();
  const { uploadFile } = usePostFileUpload();

  // biome-ignore lint/correctness/useExhaustiveDependencies: Editor.js DOM imperativo precisa init única; listar deps causaria reinit em loop
  useEffect(() => {
    // React 19 strict mode pode rodar o effect 2x em dev — guard previne dupla init.
    if (ref.current) return;

    const editor = new EditorJS({
      holder: holderId,
      data: (value as OutputData) ?? { blocks: [] },
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

    ref.current = editor;

    return () => {
      // Editor.js destroy é assíncrono; ignorar erros em hot reload / unmount race.
      ref.current?.isReady
        .then(() => {
          ref.current?.destroy();
          ref.current = null;
        })
        .catch(() => {
          ref.current = null;
        });
    };
  }, []);

  return <div id={holderId} className="min-h-[400px] border rounded-lg p-4 bg-background" />;
};

export default EditorJsWrapper;
