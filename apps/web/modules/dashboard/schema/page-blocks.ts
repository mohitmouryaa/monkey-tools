import { z } from "zod";

// Custom blocks — estritos
export const heroBlockDataSchema = z.object({
  badge: z.string().optional(),
  heading: z.string().min(1, "O título é obrigatório"),
  description: z.string().optional(),
  primaryButtonText: z.string().optional(),
  primaryButtonLink: z.string().optional(),
  secondaryButtonText: z.string().optional(),
  secondaryButtonLink: z.string().optional(),
});

export const stepsBlockItemSchema = z.object({
  iconName: z.string().min(1, "O nome do ícone é obrigatório"),
  title: z.string().min(1, "O título é obrigatório"),
  description: z.string().min(1, "A descrição é obrigatória"),
});

export const stepsBlockDataSchema = z.object({
  title: z.string().optional(),
  subtitle: z.string().optional(),
  steps: z.array(stepsBlockItemSchema).min(1, "Pelo menos um passo é obrigatório"),
});

export const cardsBlockItemSchema = z.object({
  iconName: z.string().optional(),
  title: z.string().min(1, "O título é obrigatório"),
  description: z.string().min(1, "A descrição é obrigatória"),
  linkLabel: z.string().optional(),
  linkHref: z.string().optional(),
});

export const cardsBlockDataSchema = z.object({
  title: z.string().optional(),
  subtitle: z.string().optional(),
  cards: z.array(cardsBlockItemSchema).min(1, "Pelo menos um card é obrigatório"),
});

export const faqBlockItemSchema = z.object({
  question: z.string().min(1, "A pergunta é obrigatória"),
  answer: z.string().min(1, "A resposta é obrigatória"),
});

export const faqBlockDataSchema = z.object({
  title: z.string().optional(),
  items: z.array(faqBlockItemSchema).min(1, "Pelo menos um item é obrigatório"),
});

export const ctaBlockDataSchema = z.object({
  heading: z.string().min(1, "O título é obrigatório"),
  description: z.string().optional(),
  buttonText: z.string().min(1, "O texto do botão é obrigatório"),
  buttonLink: z.string().min(1, "O link do botão é obrigatório"),
});

export const rawHtmlBlockDataSchema = z.object({
  html: z.string().min(1, "O HTML é obrigatório"),
});

// Native Editor.js blocks — passthrough (Editor.js valida internamente)
const nativeDataSchema = z.record(z.string(), z.unknown());

const blockEnvelope = <T extends z.ZodType, L extends string>(type: L, data: T) =>
  z.object({
    id: z.string().optional(),
    type: z.literal(type),
    data,
  });

// Discriminated union por `type`
export const pageBlockSchema = z.discriminatedUnion("type", [
  blockEnvelope("hero", heroBlockDataSchema),
  blockEnvelope("steps", stepsBlockDataSchema),
  blockEnvelope("cards", cardsBlockDataSchema),
  blockEnvelope("faq", faqBlockDataSchema),
  blockEnvelope("cta", ctaBlockDataSchema),
  blockEnvelope("raw-html", rawHtmlBlockDataSchema),
  blockEnvelope("header", nativeDataSchema),
  blockEnvelope("paragraph", nativeDataSchema),
  blockEnvelope("list", nativeDataSchema),
  blockEnvelope("quote", nativeDataSchema),
  blockEnvelope("image", nativeDataSchema),
  blockEnvelope("table", nativeDataSchema),
  blockEnvelope("checklist", nativeDataSchema),
  blockEnvelope("embed", nativeDataSchema),
]);

// OutputData estrito (forms novos só aceitam objeto)
export const pageOutputDataSchema = z.object({
  time: z.number().optional(),
  blocks: z.array(pageBlockSchema).min(1, "O conteúdo precisa de pelo menos um bloco"),
  version: z.string().optional(),
});

// Aceita string legada durante a janela de migração. Removido na Fase 11.3.
export const pageContentSchema = z.union([pageOutputDataSchema, z.string().min(1)]);

export type PageBlockInput = z.infer<typeof pageBlockSchema>;
export type PageOutputDataInput = z.infer<typeof pageOutputDataSchema>;
export type PageContentInput = z.infer<typeof pageContentSchema>;
