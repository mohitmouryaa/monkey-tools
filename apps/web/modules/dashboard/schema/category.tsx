import z from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(2, {
    message: "O nome da categoria deve ter pelo menos 2 caracteres.",
  }),
  slug: z.string().min(2, {
    message: "O slug deve ter pelo menos 2 caracteres.",
  }),
  description: z.string().min(5, {
    message: "A descrição deve ter pelo menos 5 caracteres.",
  }),
  icon: z.string().min(1, {
    message: "O ícone é obrigatório.",
  }),
  color: z.string().min(4, {
    message: "A cor deve ser um código hexadecimal válido.",
  }),
  isActive: z.boolean(),
});

export type CategoryFormValues = z.infer<typeof createCategorySchema>;
