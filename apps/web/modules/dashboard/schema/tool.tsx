import z from "zod";

export const createToolSchema = z.object({
  title: z.string().min(2, {
    message: "Tool name must be at least 2 characters.",
  }),
  link: z.string().min(1, {
    message: "Tool URL is required.",
  }),
  componentName: z.string().min(2, {
    message: "Component name must be at least 2 characters.",
  }),
  description: z.string(),
  categoryId: z.string().min(1, {
    message: "Category is required.",
  }),
  icon: z.string(),
  iconColor: z.string(),
  bgColor: z.string(),
  seoTitle: z.string(),
  seoDescription: z.string(),
  seoKeywords: z.string(),
  // Page Content
  h1Heading: z.string().optional(),
  introText: z.string().optional(),
  stepsTitle: z.string().optional(),
  visualSteps: z
    .array(
      z.object({
        icon: z.string(),
        title: z.string(),
        description: z.string(),
        iconColor: z.string().optional(),
        bgColor: z.string().optional(),
      }),
    )
    .optional(),
  richContent: z.string().optional(),
  faqs: z
    .array(
      z.object({
        question: z.string(),
        answer: z.string(),
      }),
    )
    .optional(),
  closingText: z.string().optional(),
  isActive: z.boolean(),
  featuredPostId: z.string().nullable().optional(),
});
