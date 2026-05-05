import type {
  CardsBlockData,
  CtaBlockData,
  FaqBlockData,
  HeroBlockData,
  RawHtmlBlockData,
  StepsBlockData,
} from "@workspace/types";

export type EditableBlockType = "hero" | "steps" | "cards" | "faq" | "cta" | "raw-html";

export type BlockDataByType = {
  hero: HeroBlockData;
  steps: StepsBlockData;
  cards: CardsBlockData;
  faq: FaqBlockData;
  cta: CtaBlockData;
  "raw-html": RawHtmlBlockData;
};

export interface EditingBlock<T extends EditableBlockType = EditableBlockType> {
  type: T;
  data: BlockDataByType[T];
  onSave: (next: BlockDataByType[T]) => void;
}

export interface BlockFormModalProps<T extends EditableBlockType> {
  open: boolean;
  initialData: BlockDataByType[T];
  onCancel: () => void;
  onSave: (next: BlockDataByType[T]) => void;
}
