"use client";

// SPIKE — Fase 0.7. Rota descartável.
import dynamic from "next/dynamic";

const SpikeEditorJsView = dynamic(
  () => import("@/modules/dashboard/ui/views/spike-editorjs-view").then((m) => m.SpikeEditorJsView),
  { ssr: false, loading: () => <div className="p-6">Carregando spike…</div> },
);

export default function Page() {
  return <SpikeEditorJsView />;
}
