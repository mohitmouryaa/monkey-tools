"use client";

import type {
  CardsBlockData,
  CtaBlockData,
  FaqBlockData,
  HeroBlockData,
  RawHtmlBlockData,
  StepsBlockData,
} from "@workspace/types";
import { Dialog } from "@workspace/ui/components/dialog";
import { CardsFormModal } from "./cards-form-modal";
import { CtaFormModal } from "./cta-form-modal";
import { FaqFormModal } from "./faq-form-modal";
import { HeroFormModal } from "./hero-form-modal";
import { RawHtmlFormModal } from "./raw-html-form-modal";
import { StepsFormModal } from "./steps-form-modal";
import type { EditingBlock } from "./types";

interface BlockEditDialogProps {
  editing: EditingBlock | null;
  onClose: () => void;
}

export const BlockEditDialog = ({ editing, onClose }: BlockEditDialogProps) => {
  const open = editing !== null;

  const handleSave = (next: unknown) => {
    if (!editing) return;
    // biome-ignore lint/suspicious/noExplicitAny: dispatch tipado pelo discriminante `editing.type`
    (editing.onSave as (n: any) => void)(next);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(next) => (next ? null : onClose())}>
      {editing?.type === "hero" ? (
        <HeroFormModal open={open} initialData={editing.data as HeroBlockData} onCancel={onClose} onSave={handleSave} />
      ) : null}
      {editing?.type === "steps" ? (
        <StepsFormModal open={open} initialData={editing.data as StepsBlockData} onCancel={onClose} onSave={handleSave} />
      ) : null}
      {editing?.type === "cards" ? (
        <CardsFormModal open={open} initialData={editing.data as CardsBlockData} onCancel={onClose} onSave={handleSave} />
      ) : null}
      {editing?.type === "faq" ? (
        <FaqFormModal open={open} initialData={editing.data as FaqBlockData} onCancel={onClose} onSave={handleSave} />
      ) : null}
      {editing?.type === "cta" ? (
        <CtaFormModal open={open} initialData={editing.data as CtaBlockData} onCancel={onClose} onSave={handleSave} />
      ) : null}
      {editing?.type === "raw-html" ? (
        <RawHtmlFormModal open={open} initialData={editing.data as RawHtmlBlockData} onCancel={onClose} onSave={handleSave} />
      ) : null}
    </Dialog>
  );
};
