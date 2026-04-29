export type PageBlockType =
  | "hero"
  | "steps"
  | "cards"
  | "faq"
  | "cta"
  | "header"
  | "paragraph"
  | "list"
  | "quote"
  | "image"
  | "table"
  | "checklist"
  | "embed"
  | "raw-html";

export interface PageBlock {
  id?: string;
  type: PageBlockType;
  data: unknown;
}

export interface HeroBlockData {
  badge?: string;
  heading: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

export interface StepsBlockItem {
  iconName: string;
  title: string;
  description: string;
}

export interface StepsBlockData {
  title?: string;
  subtitle?: string;
  steps: StepsBlockItem[];
}

export interface CardsBlockItem {
  iconName?: string;
  title: string;
  description: string;
  linkLabel?: string;
  linkHref?: string;
}

export interface CardsBlockData {
  title?: string;
  subtitle?: string;
  cards: CardsBlockItem[];
}

export interface FaqBlockItem {
  question: string;
  answer: string;
}

export interface FaqBlockData {
  title?: string;
  items: FaqBlockItem[];
}

export interface CtaBlockData {
  heading: string;
  description?: string;
  buttonText: string;
  buttonLink: string;
}

export interface RawHtmlBlockData {
  html: string;
}
