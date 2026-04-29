"use client";

import type { UseFormReturn } from "react-hook-form";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@workspace/ui/components/form";

interface PageSeoFieldsProps {
  // biome-ignore lint/suspicious/noExplicitAny: React Hook Form type portability
  form: UseFormReturn<any>;
}

export const PageSeoFields = ({ form }: PageSeoFieldsProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Configurações SEO</h3>
        <p className="text-sm text-muted-foreground">
          Configure os metadados SEO para melhor visibilidade nos mecanismos de busca
        </p>
      </div>

      <FormField
        control={form.control}
        name="seoTitle"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Título SEO</FormLabel>
            <FormControl>
              <Input placeholder="Digite o título SEO" {...field} />
            </FormControl>
            <FormDescription>Título que aparece nos resultados de busca</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="seoDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Descrição SEO</FormLabel>
            <FormControl>
              <Textarea placeholder="Digite a descrição SEO" rows={3} {...field} />
            </FormControl>
            <FormDescription>Descrição que aparece nos resultados de busca (150-160 caracteres recomendado)</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="seoKeywords"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Palavras-chave SEO</FormLabel>
            <FormControl>
              <Input placeholder="palavra1, palavra2, palavra3" {...field} />
            </FormControl>
            <FormDescription>Palavras-chave separadas por vírgula para mecanismos de busca</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
