"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import type { z } from "zod";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import type { Category } from "@workspace/database";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import { Switch } from "@workspace/ui/components/switch";
import { createToolSchema } from "@/modules/dashboard/schema/tool";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@workspace/ui/components/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import { VisualStepsBuilder } from "./visual-steps-builder";
import { RichTextEditor } from "./rich-text-editor";
import { FAQManager } from "./faq-manager";
import { PostCombobox } from "./post-combobox";

export type ToolFormValues = z.infer<typeof createToolSchema>;

interface ToolFormProps {
  defaultValues?: Partial<ToolFormValues>;
  onSubmit: (values: ToolFormValues) => void;
  submitLabel?: string;
  disabled?: boolean;
}

export const ToolForm = ({ defaultValues, onSubmit, submitLabel = "Salvar", disabled = false }: ToolFormProps) => {
  const trpc = useTRPC();
  const { data: categories, isLoading: isLoadingCategories } = useQuery(trpc.categories.getMany.queryOptions({}));

  const form = useForm<ToolFormValues>({
    resolver: zodResolver(createToolSchema),
    defaultValues: {
      title: "",
      link: "",
      componentName: "",
      description: "",
      categoryId: "",
      icon: "",
      iconColor: "",
      bgColor: "",
      seoTitle: "",
      seoDescription: "",
      seoKeywords: "",
      h1Heading: "",
      introText: "",
      stepsTitle: "",
      visualSteps: [],
      richContent: "",
      faqs: [],
      closingText: "",
      isActive: true,
      featuredPostId: null,
      ...defaultValues,
    },
  });

  // Reset form when defaultValues change (important for edit mode)
  useEffect(() => {
    if (defaultValues) {
      form.reset({
        title: "",
        link: "",
        componentName: "",
        description: "",
        categoryId: "",
        icon: "",
        iconColor: "",
        bgColor: "",
        seoTitle: "",
        seoDescription: "",
        seoKeywords: "",
        h1Heading: "",
        introText: "",
        stepsTitle: "",
        visualSteps: [],
        richContent: "",
        faqs: [],
        closingText: "",
        isActive: true,
        featuredPostId: null,
        ...defaultValues,
      });
    }
  }, [defaultValues, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Informações Gerais</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Ferramenta</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: PDF para JPG" {...field} disabled={disabled} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="componentName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Componente</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: pdf-to-jpg" {...field} disabled={disabled} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Input placeholder="Breve descrição da ferramenta..." {...field} disabled={disabled} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Caminho URL da Ferramenta</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: /pdf-to-jpg" {...field} disabled={disabled} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} disabled={disabled || isLoadingCategories}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories?.items.map((category: Category) => (
                        <SelectItem key={category._id} value={category._id as string}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Post em destaque</h3>
          <FormField
            control={form.control}
            name="featuredPostId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post em destaque</FormLabel>
                <FormDescription>Este post aparecerá na seção "Aprenda mais" da página pública da tool.</FormDescription>
                <FormControl>
                  <PostCombobox value={field.value ?? null} onChange={field.onChange} disabled={disabled} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Configuração Visual</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Ícone</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: file-text" {...field} disabled={disabled} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="iconColor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cor do Ícone</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. #FF0000" {...field} disabled={disabled} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="bgColor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cor de Fundo</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. #FF0000" {...field} disabled={disabled} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start justify-between p-3 border rounded-lg shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Status Ativo</FormLabel>
                    <FormDescription>Visível publicamente.</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} disabled={disabled} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Configuração SEO</h3>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="seoTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título SEO</FormLabel>
                  <FormControl>
                    <Input placeholder="Meta título para mecanismos de busca" {...field} disabled={disabled} />
                  </FormControl>
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
                    <Input placeholder="Meta descrição..." {...field} disabled={disabled} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="seoKeywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Palavras-chave</FormLabel>
                  <FormControl>
                    <Input placeholder="pdf, converter, jpg, imagem (separados por vírgula)" {...field} disabled={disabled} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Conteúdo da Página</h3>

          <FormField
            control={form.control}
            name="h1Heading"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título H1 (Opcional)</FormLabel>
                <FormDescription>
                  H1 personalizado para a página da ferramenta. Deixe vazio para usar o título da ferramenta.
                </FormDescription>
                <FormControl>
                  <Input
                    placeholder="ex: Comprimir PDF: reduza o tamanho do arquivo online gratuitamente"
                    {...field}
                    disabled={disabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="introText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Texto de Introdução</FormLabel>
                <FormDescription>Breve introdução abaixo do título H1 (80-120 palavras recomendado)</FormDescription>
                <FormControl>
                  <Textarea placeholder="Breve introdução sobre a ferramenta..." {...field} disabled={disabled} rows={3} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stepsTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título da Seção de Passos (Opcional)</FormLabel>
                <FormDescription>Título personalizado para a seção "Como Funciona". Deixe vazio para o padrão.</FormDescription>
                <FormControl>
                  <Input placeholder="ex: Como Comprimir Arquivos PDF" {...field} disabled={disabled} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="visualSteps"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Passos - Como Funciona</FormLabel>
                <FormDescription>Passos visuais com ícones (máx. 5)</FormDescription>
                <FormControl>
                  <VisualStepsBuilder value={field.value || []} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="richContent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Conteúdo Rico</FormLabel>
                <FormDescription>Adicione conteúdo detalhado: benefícios, para quem é, funcionalidades, etc.</FormDescription>
                <FormControl>
                  <RichTextEditor value={field.value || ""} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="faqs"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Perguntas Frequentes</FormLabel>
                <FormDescription>Perguntas frequentes sobre esta ferramenta</FormDescription>
                <FormControl>
                  <FAQManager faqs={field.value || []} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="closingText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Texto de Encerramento</FormLabel>
                <FormDescription>Chamada final para ação ou resumo (80-120 palavras recomendado)</FormDescription>
                <FormControl>
                  <Textarea
                    placeholder="Mensagem de encerramento da página da ferramenta..."
                    {...field}
                    disabled={disabled}
                    rows={3}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="w-full md:w-auto" disabled={disabled}>
            {disabled && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
};
