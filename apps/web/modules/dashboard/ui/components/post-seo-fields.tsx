"use client";

import type { UseFormReturn } from "react-hook-form";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@workspace/ui/components/form";

interface PostSeoFieldsProps {
  // biome-ignore lint/suspicious/noExplicitAny: React Hook Form type portability
  form: UseFormReturn<any>;
}

const TITLE_LIMIT = 60;
const DESCRIPTION_LIMIT = 160;

const truncate = (text: string, limit: number) => (text.length > limit ? `${text.slice(0, limit - 1)}…` : text);

const counterTone = (length: number, limit: number) => {
  if (length === 0) return "text-muted-foreground";
  if (length > limit) return "text-destructive";
  if (length > limit - 10) return "text-amber-600 dark:text-amber-400";
  return "text-emerald-600 dark:text-emerald-400";
};

export const PostSeoFields = ({ form }: PostSeoFieldsProps) => {
  const title = form.watch("title") ?? "";
  const excerpt = form.watch("excerpt") ?? "";
  const slug = form.watch("slug") ?? "";
  const seoTitle = form.watch("seo.title") ?? "";
  const seoDescription = form.watch("seo.description") ?? "";

  const previewTitle = (seoTitle || title || "Título do post").trim();
  const previewDescription = (seoDescription || excerpt || "Descrição do post").trim();
  const previewSlug = slug ? `/blog/${slug}` : "/blog/post-slug";

  const titleLength = (seoTitle || title).length;
  const descriptionLength = (seoDescription || excerpt).length;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">SEO</h3>
        <p className="text-sm text-muted-foreground">Metadados opcionais para SEO (caem no título/resumo/capa quando vazios).</p>
      </div>

      <div className="p-4 border rounded-lg bg-muted/30">
        <p className="mb-3 text-xs font-medium tracking-wide uppercase text-muted-foreground">Prévia no Google</p>
        <div className="space-y-1">
          <p className="text-xs text-emerald-700 dark:text-emerald-400">pdfs.com.br{previewSlug}</p>
          <p className="text-lg font-medium leading-tight text-blue-700 dark:text-blue-400">
            {truncate(previewTitle, TITLE_LIMIT)}
          </p>
          <p className="text-sm leading-snug text-muted-foreground">{truncate(previewDescription, DESCRIPTION_LIMIT)}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className={`flex items-center justify-between p-2 border rounded-md ${counterTone(titleLength, TITLE_LIMIT)}`}>
          <span className="font-medium">Título</span>
          <span className="tabular-nums">
            {titleLength}/{TITLE_LIMIT}
          </span>
        </div>
        <div
          className={`flex items-center justify-between p-2 border rounded-md ${counterTone(descriptionLength, DESCRIPTION_LIMIT)}`}
        >
          <span className="font-medium">Descrição</span>
          <span className="tabular-nums">
            {descriptionLength}/{DESCRIPTION_LIMIT}
          </span>
        </div>
      </div>

      <FormField
        control={form.control}
        name="seo.title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Título de SEO</FormLabel>
            <FormControl>
              <Input placeholder="Padrão: título do post" {...field} value={field.value ?? ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="seo.description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Descrição de SEO</FormLabel>
            <FormControl>
              <Textarea rows={3} placeholder="Padrão: resumo do post" {...field} value={field.value ?? ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="seo.ogImage"
        render={({ field }) => (
          <FormItem>
            <FormLabel>URL da OG Image</FormLabel>
            <FormControl>
              <Input placeholder="Padrão: imagem de capa" {...field} value={field.value ?? ""} />
            </FormControl>
            <FormDescription>URL pública da imagem usada em prévias sociais.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
