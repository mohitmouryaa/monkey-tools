import { z } from "zod";

export const createGlobalScriptSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  content: z.string().min(1, "O conteúdo do script é obrigatório"),
  location: z.enum(["HEAD", "BODY"]),
  isActive: z.boolean(),
});

export type CreateGlobalScriptInput = z.infer<typeof createGlobalScriptSchema>;
