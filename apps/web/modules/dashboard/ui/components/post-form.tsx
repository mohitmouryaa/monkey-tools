"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useForm, type FieldErrors } from "react-hook-form";
import { AlertCircle, CalendarClock, FileText, ImageIcon, Loader2, RotateCcw, Save, Search, Sparkles } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostStatus } from "@workspace/types";
import { cn } from "@workspace/ui/lib/utils";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import { Switch } from "@workspace/ui/components/switch";
import { Card, CardContent } from "@workspace/ui/components/card";
import { DatePicker } from "@workspace/ui/components/date-picker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@workspace/ui/components/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import { createPostSchema, type CreatePostFormValues } from "@/modules/dashboard/schema/post";
import { usePostFileUpload } from "@/modules/dashboard/hooks/use-post-file-upload";
import { PostSeoFields } from "@/modules/dashboard/ui/components/post-seo-fields";
import { PostToolsMultiSelect } from "@/modules/dashboard/ui/components/post-tools-multi-select";

// EditorJsWrapper tem default export (3.6a). next/dynamic com default export
// resolve direto sem precisar do `.then(...)`.
const EditorJsWrapper = dynamic(() => import("@/modules/dashboard/ui/components/editor-js"), {
  ssr: false,
  loading: () => <div className="min-h-[400px] border rounded-lg p-4 bg-background animate-pulse" />,
});

export type PostFormValues = CreatePostFormValues;

type FieldKey = keyof PostFormValues;

const TAB_DEFINITIONS = [
  {
    id: "content",
    label: "Conteúdo",
    icon: FileText,
    fields: ["title", "slug", "excerpt", "content"] as FieldKey[],
  },
  {
    id: "media",
    label: "Mídia & ferramentas",
    icon: ImageIcon,
    fields: ["coverImage", "toolIds"] as FieldKey[],
  },
  {
    id: "seo",
    label: "SEO",
    icon: Search,
    fields: ["seo"] as FieldKey[],
  },
  {
    id: "publication",
    label: "Publicação",
    icon: CalendarClock,
    fields: ["status", "publishedAt", "isFeaturedGlobal"] as FieldKey[],
  },
] as const;

type TabId = (typeof TAB_DEFINITIONS)[number]["id"];

interface PostFormProps {
  defaultValues?: Partial<PostFormValues>;
  onSubmit: (values: PostFormValues) => void;
  submitLabel?: string;
  disabled?: boolean;
}

const FORM_DEFAULTS: PostFormValues = {
  title: "",
  slug: "",
  excerpt: "",
  coverImage: "",
  content: { blocks: [] },
  status: PostStatus.DRAFT,
  publishedAt: undefined,
  isFeaturedGlobal: false,
  toolIds: [],
  seo: { title: "", description: "", ogImage: "" },
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// Conta erros por tab. Para campos nested (ex.: `seo`), conta cada chave
// aninhada com erro, e cai pra 1 caso o objeto tenha apenas erro raiz.
const countTabErrors = (errors: FieldErrors<PostFormValues>, fields: readonly FieldKey[]) =>
  fields.reduce((total, field) => {
    const node = errors[field];
    if (!node) return total;
    if (typeof node === "object" && "message" in node === false) {
      return total + Object.keys(node as object).length;
    }
    return total + 1;
  }, 0);

export const PostForm = ({ defaultValues, onSubmit, submitLabel = "Salvar", disabled = false }: PostFormProps) => {
  const { uploadFile, isUploading } = usePostFileUpload();
  const [activeTab, setActiveTab] = useState<TabId>("content");

  const form = useForm<PostFormValues>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      ...FORM_DEFAULTS,
      ...defaultValues,
    },
  });

  // Auto-slug enquanto o usuário não toca no campo slug manualmente.
  // Usar `getFieldState("slug").isDirty` em vez de `formState.dirtyFields.slug`
  // para evitar que o uso do `dirtyFields` proxy entre como dependência do effect.
  const titleValue = form.watch("title");
  useEffect(() => {
    const slugDirty = form.getFieldState("slug").isDirty;
    if (!slugDirty && titleValue) {
      form.setValue("slug", slugify(titleValue), { shouldValidate: false });
    }
  }, [titleValue, form]);

  // Reset em edit mode quando defaultValues chegam (ex.: dados vindos de query).
  useEffect(() => {
    if (defaultValues) {
      form.reset({
        ...FORM_DEFAULTS,
        ...defaultValues,
      });
    }
  }, [defaultValues, form]);

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

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const { url } = await uploadFile(file);
    form.setValue("coverImage", url, { shouldDirty: true, shouldValidate: true });
  };

  const handleDiscard = () => {
    if (!isDirty) return;
    if (confirm("Descartar todas as alterações não salvas?")) {
      form.reset({ ...FORM_DEFAULTS, ...defaultValues });
    }
  };

  // Atalho Cmd/Ctrl+S para salvar.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isSave = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s";
      if (!isSave) return;
      e.preventDefault();
      if (disabled || !isDirty) return;
      handleSubmit();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [disabled, isDirty, handleSubmit]);

  // Aviso de saída quando há alterações não salvas.
  useEffect(() => {
    if (!isDirty) return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [isDirty]);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
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

          {/* Conteúdo: title, slug, excerpt + Editor.js */}
          <TabsContent value="content" forceMount className="space-y-4 mt-0 data-[state=inactive]:hidden">
            <Card>
              <CardContent className="pt-6 space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título</FormLabel>
                      <FormControl>
                        <Input placeholder="Título do post" {...field} disabled={disabled} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="post-slug" {...field} disabled={disabled} />
                      </FormControl>
                      <FormDescription>Letras minúsculas, números e hífens.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="excerpt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Resumo</FormLabel>
                      <FormControl>
                        <Textarea rows={3} placeholder="Resumo curto..." {...field} disabled={disabled} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Conteúdo</FormLabel>
                      <FormControl>
                        <EditorJsWrapper value={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Mídia: cover image + tools relacionadas */}
          <TabsContent value="media" forceMount className="space-y-4 mt-0 data-[state=inactive]:hidden">
            <Card>
              <CardContent className="pt-6 space-y-4">
                <FormField
                  control={form.control}
                  name="coverImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Imagem de capa</FormLabel>
                      <FormControl>
                        <div className="space-y-3">
                          <Input type="file" accept="image/*" onChange={handleCoverUpload} disabled={disabled || isUploading} />
                          {field.value && (
                            // biome-ignore lint/performance/noImgElement: preview da capa no admin (URL externa do S3)
                            <img
                              src={field.value}
                              alt="Capa"
                              className="object-cover w-full max-w-md border rounded-lg aspect-video bg-muted"
                            />
                          )}
                        </div>
                      </FormControl>
                      <FormDescription>Obrigatória para AGENDADO/PUBLICADO.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <FormField
                  control={form.control}
                  name="toolIds"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ferramentas relacionadas</FormLabel>
                      <FormDescription>Aparecem como "leitura recomendada" para os usuários da ferramenta.</FormDescription>
                      <FormControl>
                        <PostToolsMultiSelect value={field.value ?? []} onChange={field.onChange} disabled={disabled} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* SEO */}
          <TabsContent value="seo" forceMount className="mt-0 data-[state=inactive]:hidden">
            <Card>
              <CardContent className="pt-6">
                <PostSeoFields form={form} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Publicação: status, publishedAt, featured */}
          <TabsContent value="publication" forceMount className="mt-0 data-[state=inactive]:hidden">
            <Card>
              <CardContent className="pt-6 space-y-4">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value} disabled={disabled}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={PostStatus.DRAFT}>Rascunho</SelectItem>
                          <SelectItem value={PostStatus.SCHEDULED}>Agendado</SelectItem>
                          <SelectItem value={PostStatus.PUBLISHED}>Publicado</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="publishedAt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data de publicação</FormLabel>
                      <FormControl>
                        <DatePicker value={field.value} onChange={field.onChange} disabled={disabled} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isFeaturedGlobal"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="space-y-0.5">
                        <FormLabel>Destaque global</FormLabel>
                        <FormDescription>Exibir na seção de destaques da home.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} disabled={disabled} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

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
              {isDirty && (
                <Button type="button" variant="ghost" onClick={handleDiscard} disabled={disabled} className="gap-2">
                  <RotateCcw className="size-4" />
                  Descartar
                </Button>
              )}
              <Button type="submit" disabled={disabled || !isDirty} className="gap-2" title="Atalho: Ctrl/⌘+S">
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
