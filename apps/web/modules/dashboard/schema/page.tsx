import { z } from "zod";

// Homepage schema
export const heroSectionSchema = z.object({
  badge: z.string().min(1, "Badge is required"),
  heading: z.string().min(1, "Heading is required"),
  description: z.string().min(1, "Description is required"),
  primaryButtonText: z.string().min(1, "Primary button text is required"),
  primaryButtonLink: z.string().min(1, "Primary button link is required"),
  secondaryButtonText: z.string().min(1, "Secondary button text is required"),
  secondaryButtonLink: z.string().min(1, "Secondary button link is required"),
});

export const howItWorksStepSchema = z.object({
  iconName: z.string().min(1, "Icon name is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  order: z.number(),
});

export const howItWorksSectionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().min(1, "Subtitle is required"),
  steps: z.array(howItWorksStepSchema).min(1, "At least one step is required"),
});

export const updateHomepageSchema = z.object({
  seoTitle: z.string().min(1, "SEO title is required"),
  seoDescription: z.string().min(1, "SEO description is required"),
  seoKeywords: z.string(),
  heroSection: heroSectionSchema,
  howItWorksSection: howItWorksSectionSchema,
  isActive: z.boolean(),
});

export type UpdateHomepageInput = z.infer<typeof updateHomepageSchema>;

// All Tools page schema
export const updateAllToolsPageSchema = z.object({
  seoTitle: z.string().min(1, "SEO title is required"),
  seoDescription: z.string().min(1, "SEO description is required"),
  seoKeywords: z.string(),
  h1Heading: z.string().min(1, "H1 heading is required"),
  shortDescription: z.string().min(1, "Short description is required"),
  isActive: z.boolean(),
});

export type UpdateAllToolsPageInput = z.infer<typeof updateAllToolsPageSchema>;

// Custom page schema
export const createCustomPageSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  seoTitle: z.string().min(1, "SEO title is required"),
  seoDescription: z.string().min(1, "SEO description is required"),
  seoKeywords: z.string(),
  content: z.string().min(1, "Content is required"),
  showInFooter: z.boolean().default(true),
  footerOrder: z.number().default(0),
  footerLabel: z.string().optional(),
  isActive: z.boolean().default(true),
});

export type CreateCustomPageFormValues = z.input<typeof createCustomPageSchema>;

export const updateCustomPageSchema = createCustomPageSchema.extend({
  id: z.string().min(1, "Page ID is required"),
});

export type UpdateCustomPageFormValues = z.input<typeof updateCustomPageSchema>;
