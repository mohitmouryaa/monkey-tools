import z from "zod";

export const createToolSchema = z.object({
  title: z.string().min(2, {
    message: "O nome da ferramenta deve ter pelo menos 2 caracteres.",
  }),
  link: z.string().min(1, {
    message: "A URL da ferramenta é obrigatória.",
  }),
  componentName: z.string().min(2, {
    message: "O nome do componente deve ter pelo menos 2 caracteres.",
  }),
  description: z.string(),
  categoryId: z.string().min(1, {
    message: "A categoria é obrigatória.",
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
  // Vídeo tutorial (YouTube) — opcional
  videoId: z.string().optional(),
  videoTitle: z.string().optional(),
  videoDescription: z.string().optional(),
  videoThumbnailUrl: z.string().url("URL da thumbnail inválida").optional().or(z.literal("")),
  videoUploadDate: z.string().optional(),
  videoDurationISO: z
    .string()
    .regex(/^PT(\d+H)?(\d+M)?(\d+S)?$/, "Formato ISO 8601 inválido (ex: PT5M30S)")
    .optional()
    .or(z.literal("")),
  isActive: z.boolean(),
  featuredPostId: z.string().nullable().optional(),
});
