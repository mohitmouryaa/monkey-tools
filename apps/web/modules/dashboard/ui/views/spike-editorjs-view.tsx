"use client";

// SPIKE — Fase 0.7. View descartável que prova bridge plugin → modal React.

import EditorJS, { type BlockToolConstructable, type OutputData } from "@editorjs/editorjs";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { SpikeHelloPlugin } from "@/modules/dashboard/ui/components/editorjs-plugins/_spike-hello.plugin";

interface SpikeHelloData {
  text: string;
}

interface PendingEdit {
  data: SpikeHelloData;
  onSave: (next: SpikeHelloData) => void;
}

const INITIAL_DATA: OutputData = {
  blocks: [
    { type: "paragraph", data: { text: "Spike Editor.js — clique no menu (+) para inserir um bloco Spike Hello." } },
    { type: "spikeHello", data: { text: "primeiro bloco" } },
    { type: "spikeHello", data: { text: "segundo bloco" } },
  ],
};

export const SpikeEditorJsView = () => {
  const editorRef = useRef<EditorJS | null>(null);
  const [pendingEdit, setPendingEdit] = useState<PendingEdit | null>(null);
  const [draft, setDraft] = useState<string>("");
  const [savedOutput, setSavedOutput] = useState<OutputData | null>(null);
  // Holder único por mount físico — useId colide no double-mount do Strict Mode.
  const [generatedId] = useState(() => Math.random().toString(36).slice(2));
  const holderId = `spike-editor-${generatedId}`;

  const openEditor = useCallback((current: SpikeHelloData, onSave: (next: SpikeHelloData) => void) => {
    setDraft(current.text);
    setPendingEdit({ data: current, onSave });
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Editor.js init única — listar deps reinitaria em loop
  useEffect(() => {
    // Padrão herdado de editor-js/index.tsx: setTimeout(0) permite que o cleanup
    // do mount→cleanup→mount do Strict Mode cancele o init antes do new EditorJS.
    let cancelled = false;
    let localEditor: EditorJS | null = null;

    const timer = setTimeout(() => {
      if (cancelled) return;
      const editor = new EditorJS({
        holder: holderId,
        data: INITIAL_DATA,
        tools: {
          // Editor.js 2.x usa Paragraph como tool default automaticamente.
          spikeHello: {
            class: SpikeHelloPlugin as unknown as BlockToolConstructable,
            config: {
              openEditor,
            },
          },
        },
      });
      localEditor = editor;
      editorRef.current = editor;
    }, 0);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      const toDestroy = localEditor;
      localEditor = null;
      if (editorRef.current === toDestroy) editorRef.current = null;
      toDestroy?.isReady.then(() => toDestroy.destroy()).catch(() => {});
    };
  }, []);

  const closeDialog = () => setPendingEdit(null);

  const handleSaveDialog = () => {
    if (!pendingEdit) return;
    pendingEdit.onSave({ text: draft });
    closeDialog();
  };

  const handleSaveEditor = async () => {
    if (!editorRef.current) return;
    const out = await editorRef.current.save();
    setSavedOutput(out);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Spike: Editor.js bridge → modal React</h1>
        <p className="text-sm text-muted-foreground">
          Critérios: (1) modal abre ao clicar Editar; (2) save() do editor traz `text` atualizado; (3) sem leak entre os dois
          blocos iniciais.
        </p>
      </div>

      <div id={holderId} className="min-h-[400px] border rounded-lg p-4 bg-background" />

      <div className="flex gap-2">
        <Button onClick={handleSaveEditor}>Salvar Editor (rodar save())</Button>
      </div>

      {savedOutput ? (
        <pre className="p-4 rounded-md bg-muted text-xs overflow-auto max-h-96">{JSON.stringify(savedOutput, null, 2)}</pre>
      ) : null}

      <Dialog open={pendingEdit !== null} onOpenChange={(open) => (open ? null : closeDialog())}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar bloco Spike Hello</DialogTitle>
            <DialogDescription>Edita o campo text e clica em salvar para devolver pro Editor.js.</DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="spike-text">text</Label>
            <Input id="spike-text" value={draft} onChange={(e) => setDraft(e.target.value)} />
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={closeDialog}>
              Cancelar
            </Button>
            <Button onClick={handleSaveDialog}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
