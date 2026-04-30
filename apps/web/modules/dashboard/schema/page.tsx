import { z } from "zod";
import { PageType } from "@workspace/types";
import { pageOutputDataSchema } from "./page-blocks";

// Homepage schema
export const heroSectionSchema = z.object({
  badge: z.string().min(1, "O badge é obrigatório"),
  heading: z.string().min(1, "O título é obrigatório"),
  description: z.string().min(1, "A descrição é obrigatória"),
  primaryButtonText: z.string().min(1, "O texto do botão primário é obrigatório"),
  primaryButtonLink: z.string().min(1, "O link do botão primário é obrigatório"),
  secondaryButtonText: z.string().min(1, "O texto do botão secundário é obrigatório"),
  secondaryButtonLink: z.string().min(1, "O link do botão secundário é obrigatório"),
});

export const howItWorksStepSchema = z.object({
  iconName: z.string().min(1, "O nome do ícone é obrigatório"),
  title: z.string().min(1, "O título é obrigatório"),
  description: z.string().min(1, "A descrição é obrigatória"),
  order: z.number(),
});

export const howItWorksSectionSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  subtitle: z.string().min(1, "O subtítulo é obrigatório"),
  steps: z.array(howItWorksStepSchema).min(1, "Pelo menos um passo é obrigatório"),
});

export const updateHomepageSchema = z.object({
  seoTitle: z.string().min(1, "O título SEO é obrigatório"),
  seoDescription: z.string().min(1, "A descrição SEO é obrigatória"),
  seoKeywords: z.string(),
  heroSection: heroSectionSchema,
  howItWorksSection: howItWorksSectionSchema,
  isActive: z.boolean(),
});

export type UpdateHomepageInput = z.infer<typeof updateHomepageSchema>;

// All Tools page schema
export const updateAllToolsPageSchema = z.object({
  seoTitle: z.string().min(1, "O título SEO é obrigatório"),
  seoDescription: z.string().min(1, "A descrição SEO é obrigatória"),
  seoKeywords: z.string(),
  h1Heading: z.string().min(1, "O título H1 é obrigatório"),
  shortDescription: z.string().min(1, "A descrição curta é obrigatória"),
  isActive: z.boolean(),
});

export type UpdateAllToolsPageInput = z.infer<typeof updateAllToolsPageSchema>;

// Custom page schema (suporta CUSTOM e COMPARISON)
const customPageBaseShape = {
  pageType: z.enum([PageType.CUSTOM, PageType.COMPARISON]).default(PageType.CUSTOM),
  title: z.string().min(1, "O título é obrigatório"),
  slug: z
    .string()
    .min(1, "O slug é obrigatório")
    .regex(/^[a-z0-9-]+$/, "O slug deve conter apenas letras minúsculas, números e hífens"),
  seoTitle: z.string().min(1, "O título SEO é obrigatório"),
  seoDescription: z.string().min(1, "A descrição SEO é obrigatória"),
  seoKeywords: z.string(),
  content: pageOutputDataSchema,
  showInFooter: z.boolean().default(true),
  footerOrder: z.number().default(0),
  footerLabel: z.string().optional(),
  isActive: z.boolean().default(true),
  competitorName: z.string().optional(),
  competitorLogo: z.string().url("URL inválida").optional().or(z.literal("")),
} as const;

const competitorRefine = <T extends { pageType: PageType; competitorName?: string }>(data: T) =>
  data.pageType !== PageType.COMPARISON || (data.competitorName !== undefined && data.competitorName.trim().length > 0);

const competitorRefineMessage = {
  message: "Nome do concorrente é obrigatório quando o tipo é Comparison",
  path: ["competitorName"],
};

export const createCustomPageSchema = z.object(customPageBaseShape).refine(competitorRefine, competitorRefineMessage);

export type CreateCustomPageFormValues = z.input<typeof createCustomPageSchema>;

export const updateCustomPageSchema = z
  .object({ ...customPageBaseShape, id: z.string().min(1, "O ID da página é obrigatório") })
  .refine(competitorRefine, competitorRefineMessage);

export type UpdateCustomPageFormValues = z.input<typeof updateCustomPageSchema>;
