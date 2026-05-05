"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useForm, useWatch, type Control, type FieldErrors } from "react-hook-form";
import { AlertCircle, FileText, Info, Loader2, Palette, Save, Search, Sparkles, Star, Wrench } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import type { z } from "zod";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import type { Category } from "@workspace/database";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@workspace/ui/lib/utils";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { Switch } from "@workspace/ui/components/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import { createToolSchema } from "@/modules/dashboard/schema/tool";
import { slugify } from "@/lib/slug";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@workspace/ui/components/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import { VisualStepsBuilder } from "./visual-steps-builder";
import { FAQManager } from "./faq-manager";
import { PostCombobox } from "./post-combobox";

const RichTextEditor = dynamic(() => import("./rich-text-editor").then((m) => ({ default: m.RichTextEditor })), {
  ssr: false,
  loading: () => <Skeleton className="h-[300px] w-full rounded-lg" />,
});

export type ToolFormValues = z.infer<typeof createToolSchema>;

type FieldKey = keyof ToolFormValues;

const TAB_DEFINITIONS = [
  {
    id: "general",
    label: "Geral",
    icon: Info,
    fields: ["title", "componentName", "description", "link", "categoryId"] as FieldKey[],
  },
  {
    id: "visual",
    label: "Visual",
    icon: Palette,
    fields: ["icon", "iconColor", "bgColor", "isActive"] as FieldKey[],
  },
  {
    id: "content",
    label: "Conteúdo",
    icon: FileText,
    fields: [
      "h1Heading",
      "introText",
      "stepsTitle",
      "visualSteps",
      "richContent",
      "faqs",
      "closingText",
      "videoId",
      "videoTitle",
      "videoDescription",
      "videoThumbnailUrl",
      "videoUploadDate",
      "videoDurationISO",
    ] as FieldKey[],
  },
  {
    id: "seo",
    label: "SEO",
    icon: Search,
    fields: ["seoTitle", "seoDescription", "seoKeywords"] as FieldKey[],
  },
  {
    id: "links",
    label: "Vínculos",
    icon: Star,
    fields: ["featuredPostId"] as FieldKey[],
  },
] as const;

type TabId = (typeof TAB_DEFINITIONS)[number]["id"];

interface ToolFormProps {
  defaultValues?: Partial<ToolFormValues>;
  onSubmit: (values: ToolFormValues) => void;
  onCancel?: () => void;
  submitLabel?: string;
  disabled?: boolean;
}

const FORM_DEFAULTS: ToolFormValues = {
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
  videoId: "",
  videoTitle: "",
  videoDescription: "",
  videoThumbnailUrl: "",
  videoUploadDate: "",
  videoDurationISO: "",
  isActive: true,
  featuredPostId: null,
};

const countTabErrors = (errors: FieldErrors<ToolFormValues>, fields: readonly FieldKey[]) =>
  fields.reduce((total, field) => (errors[field] ? total + 1 : total), 0);

const LivePreview = ({ control }: { control: Control<ToolFormValues> }) => {
  const title = useWatch({ control, name: "title" });
  const description = useWatch({ control, name: "description" });
  const icon = useWatch({ control, name: "icon" });
  const iconColor = useWatch({ control, name: "iconColor" });
  const bgColor = useWatch({ control, name: "bgColor" });
  const link = useWatch({ control, name: "link" });
  const isActive = useWatch({ control, name: "isActive" });

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Pré-visualização</h3>
        <div className="h-px bg-linear-to-r from-border via-border/50 to-transparent" />
      </div>

      <div className="p-5 space-y-4 transition-all border rounded-xl border-border/50 bg-card/40">
        <div className="flex items-start gap-4">
          <div
            className="flex items-center justify-center transition-all rounded-lg size-14 shrink-0 ring-1 ring-border/40"
            style={{ backgroundColor: bgColor || undefined }}
          >
            {icon ? (
              <DynamicIcon
                name={icon as IconName}
                className="size-7"
                style={{ color: iconColor || undefined }}
                fallback={() => <Wrench className="size-7 text-muted-foreground" />}
              />
            ) : (
              <Wrench className="size-7 text-muted-foreground" />
            )}
          </div>
          <div className="flex-1 min-w-0 space-y-1.5">
            <h4 className="text-sm font-semibold leading-tight text-foreground line-clamp-1">
              {title || <span className="italic text-muted-foreground/60">Nome da ferramenta</span>}
            </h4>
            <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
              {description || <span className="italic text-muted-foreground/60">Descrição da ferramenta…</span>}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-border/50">
          <Badge variant={isActive ? "default" : "outline"} className="text-[10px] font-normal h-5">
            {isActive ? "Publicada" : "Rascunho"}
          </Badge>
          {link && <span className="font-mono text-[10px] text-muted-foreground truncate">{link}</span>}
        </div>
      </div>

      <p className="text-[11px] leading-relaxed text-muted-foreground/70">
        Esta é uma prévia das alterações. Salve para aplicar à ferramenta.
      </p>
    </div>
  );
};

export const ToolForm = ({ defaultValues, onSubmit, onCancel, submitLabel = "Salvar", disabled = false }: ToolFormProps) => {
  const trpc = useTRPC();
  const { data: categories, isLoading: isLoadingCategories } = useQuery(trpc.categories.getMany.queryOptions({}));

  const [activeTab, setActiveTab] = useState<TabId>("general");

  const form = useForm<ToolFormValues>({
    resolver: zodResolver(createToolSchema),
    defaultValues: {
      ...FORM_DEFAULTS,
      ...defaultValues,
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset({
        ...FORM_DEFAULTS,
        ...defaultValues,
      });
    }
  }, [defaultValues, form]);

  // Auto-popula o link em kebab-case enquanto o admin não digitou nada manualmente.
  // Quando admin edita o link, currentLink fica != "" e nunca mais sobrescreve.
  const titleValue = useWatch({ control: form.control, name: "title" });
  useEffect(() => {
    const currentLink = form.getValues("link");
    if (currentLink && currentLink !== "/") return;
    if (!titleValue) return;
    const slug = slugify(titleValue);
    if (!slug) return;
    form.setValue("link", `/${slug}`, { shouldDirty: false, shouldValidate: false });
  }, [titleValue, form]);

  const errors = form.formState.errors;
  const isDirty = form.formState.isDirty;

  const tabErrorCounts = useMemo(
    () =>
      TAB_DEFINITIONS.reduce(
        (acc, tab) => {
          acc[tab.id] = countTabErrors(errors, tab.fields);
          return acc;
        },
        {} as Record<TabId, number>,
      ),
    [errors],
  );

  const totalErrors = Object.values(tabErrorCounts).reduce((sum, n) => sum + n, 0);

  const handleSubmit = form.handleSubmit(
    (values) => onSubmit(values),
    () => {
      const firstTabWithError = TAB_DEFINITIONS.find((tab) => tabErrorCounts[tab.id] > 0);
      if (firstTabWithError) setActiveTab(firstTabWithError.id);
    },
  );

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabId)} className="space-y-6">
            <div className="overflow-x-auto -mx-1 px-1">
              <TabsList className="inline-flex w-auto h-auto gap-1 p-1 bg-muted/60">
                {TAB_DEFINITIONS.map((tab) => {
                  const errorCount = tabErrorCounts[tab.id];
                  const Icon = tab.icon;
                  return (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className={cn(
                        "gap-2 px-3 py-1.5 data-[state=active]:bg-background data-[state=active]:shadow-sm",
                        errorCount > 0 && "data-[state=inactive]:text-destructive",
                      )}
                    >
                      <Icon className="size-3.5" />
                      <span>{tab.label}</span>
                      {errorCount > 0 && (
                        <Badge variant="destructive" className="h-4 px-1.5 text-[10px] font-medium tabular-nums">
                          {errorCount}
                        </Badge>
                      )}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>

            <TabsContent value="general" className="space-y-6 mt-0">
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
                        <Input placeholder="ex: pdf-para-jpg" {...field} disabled={disabled} />
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
                        <Input placeholder="ex: /comprimir-pdf" {...field} disabled={disabled} />
                      </FormControl>
                      <FormDescription>
                        Auto-gerado a partir do nome. Apenas letras minúsculas, números e hífens (kebab-case).
                      </FormDescription>
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
                      <Select onValueChange={field.onChange} value={field.value} disabled={disabled || isLoadingCategories}>
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
            </TabsContent>

            <TabsContent value="visual" className="space-y-6 mt-0">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="icon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Ícone</FormLabel>
                      <FormDescription>Use o nome do ícone Lucide em kebab-case (ex: file-text).</FormDescription>
                      <FormControl>
                        <Input placeholder="ex: file-text" {...field} disabled={disabled} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start justify-between gap-4 p-3 border rounded-lg shadow-sm">
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
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="iconColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cor do Ícone</FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={/^#[0-9a-fA-F]{6}$/.test(field.value || "") ? field.value : "#000000"}
                            onChange={(e) => field.onChange(e.target.value)}
                            disabled={disabled}
                            className="rounded cursor-pointer size-9 ring-1 ring-border/50 disabled:opacity-50"
                            aria-label="Selecionar cor do ícone"
                          />
                          <Input
                            placeholder="#FF0000"
                            value={field.value}
                            onChange={field.onChange}
                            disabled={disabled}
                            className="font-mono"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bgColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cor de Fundo</FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={/^#[0-9a-fA-F]{6}$/.test(field.value || "") ? field.value : "#ffffff"}
                            onChange={(e) => field.onChange(e.target.value)}
                            disabled={disabled}
                            className="rounded cursor-pointer size-9 ring-1 ring-border/50 disabled:opacity-50"
                            aria-label="Selecionar cor de fundo"
                          />
                          <Input
                            placeholder="#FFFFFF"
                            value={field.value}
                            onChange={field.onChange}
                            disabled={disabled}
                            className="font-mono"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </TabsContent>

            <TabsContent value="content" className="space-y-6 mt-0">
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
                    <FormDescription>
                      Título personalizado para a seção "Como Funciona". Deixe vazio para o padrão.
                    </FormDescription>
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

              <details className="rounded-lg border border-border/60 bg-muted/30 p-4 group">
                <summary className="cursor-pointer text-sm font-semibold text-foreground select-none">
                  Vídeo do YouTube (opcional)
                </summary>
                <div className="mt-4 space-y-4">
                  <FormField
                    control={form.control}
                    name="videoId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ID do vídeo</FormLabel>
                        <FormDescription>Apenas o ID do YouTube (ex: dQw4w9WgXcQ).</FormDescription>
                        <FormControl>
                          <Input placeholder="dQw4w9WgXcQ" {...field} value={field.value || ""} disabled={disabled} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="videoTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título do vídeo</FormLabel>
                        <FormControl>
                          <Input placeholder="Como usar a ferramenta" {...field} value={field.value || ""} disabled={disabled} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="videoDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição do vídeo</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="O que o vídeo demonstra..."
                            {...field}
                            value={field.value || ""}
                            disabled={disabled}
                            rows={3}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="videoThumbnailUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL da thumbnail (opcional)</FormLabel>
                        <FormDescription>
                          Se vazio, usamos a thumbnail padrão do YouTube ({"https://i.ytimg.com/vi/<id>/hqdefault.jpg"}).
                        </FormDescription>
                        <FormControl>
                          <Input placeholder="https://i.ytimg.com/vi/<id>/maxresdefault.jpg" {...field} value={field.value || ""} disabled={disabled} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="videoUploadDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data de upload</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} value={field.value || ""} disabled={disabled} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="videoDurationISO"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duração (ISO 8601)</FormLabel>
                        <FormDescription>Formato ISO 8601: PT5M30S = 5 min 30 s.</FormDescription>
                        <FormControl>
                          <Input placeholder="PT5M30S" {...field} value={field.value || ""} disabled={disabled} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </details>
            </TabsContent>

            <TabsContent value="seo" className="space-y-6 mt-0">
              <FormField
                control={form.control}
                name="seoTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título SEO</FormLabel>
                    <FormDescription>
                      Aparece na aba do navegador e nos resultados de busca. Recomendado: 50-60 caracteres.
                    </FormDescription>
                    <FormControl>
                      <Input placeholder="Meta título para mecanismos de busca" {...field} disabled={disabled} />
                    </FormControl>
                    <div className="flex items-center justify-between gap-2">
                      <FormMessage />
                      <span
                        className={cn(
                          "text-[11px] font-mono ml-auto tabular-nums",
                          (field.value?.length || 0) > 60 ? "text-destructive" : "text-muted-foreground/70",
                        )}
                      >
                        {field.value?.length || 0}/60
                      </span>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="seoDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição SEO</FormLabel>
                    <FormDescription>Snippet exibido nos resultados de busca. Recomendado: 150-160 caracteres.</FormDescription>
                    <FormControl>
                      <Textarea placeholder="Meta descrição..." {...field} disabled={disabled} rows={3} />
                    </FormControl>
                    <div className="flex items-center justify-between gap-2">
                      <FormMessage />
                      <span
                        className={cn(
                          "text-[11px] font-mono ml-auto tabular-nums",
                          (field.value?.length || 0) > 160 ? "text-destructive" : "text-muted-foreground/70",
                        )}
                      >
                        {field.value?.length || 0}/160
                      </span>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="seoKeywords"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Palavras-chave</FormLabel>
                    <FormDescription>Palavras separadas por vírgula.</FormDescription>
                    <FormControl>
                      <Input placeholder="pdf, converter, jpg, imagem" {...field} disabled={disabled} />
                    </FormControl>
                    {field.value && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {field.value
                          .split(",")
                          .map((k) => k.trim())
                          .filter(Boolean)
                          .map((keyword) => (
                            <span
                              key={keyword}
                              className="inline-flex items-center px-2 py-0.5 text-[11px] font-medium rounded-md text-foreground/80 bg-muted/60"
                            >
                              {keyword}
                            </span>
                          ))}
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>

            <TabsContent value="links" className="space-y-6 mt-0">
              <FormField
                control={form.control}
                name="featuredPostId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Post em Destaque</FormLabel>
                    <FormDescription>
                      Este post aparecerá na seção "Aprenda mais" da página pública da ferramenta.
                    </FormDescription>
                    <FormControl>
                      <PostCombobox value={field.value ?? null} onChange={field.onChange} disabled={disabled} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
          </Tabs>

          <aside className="hidden lg:block">
            <div className="sticky top-6">
              <LivePreview control={form.control} />
            </div>
          </aside>
        </div>

        <div className="sticky bottom-0 z-10 -mx-4 border-t md:-mx-8 border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
          <div className="flex flex-col items-stretch justify-between gap-3 px-4 py-4 sm:flex-row sm:items-center md:px-8">
            <div className="flex items-center gap-3 text-sm">
              {totalErrors > 0 ? (
                <span className="inline-flex items-center gap-2 text-destructive">
                  <AlertCircle className="size-4" />
                  {totalErrors} {totalErrors === 1 ? "campo com erro" : "campos com erros"}
                </span>
              ) : isDirty ? (
                <span className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400">
                  <span className="rounded-full size-2 bg-amber-500 animate-pulse" />
                  Alterações não salvas
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <Sparkles className="size-4" />
                  Tudo em ordem
                </span>
              )}
            </div>

            <div className="flex items-center justify-end gap-2">
              {onCancel && (
                <Button type="button" variant="ghost" onClick={onCancel} disabled={disabled}>
                  Cancelar
                </Button>
              )}
              <Button type="submit" disabled={disabled} className="gap-2">
                {disabled ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
                {submitLabel}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};
