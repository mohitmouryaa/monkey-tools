"use client";

import { useEffect, useRef } from "react";
import { useForm, useWatch, type Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Folder, Loader2, Save, Sparkles } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import { cn } from "@workspace/ui/lib/utils";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Switch } from "@workspace/ui/components/switch";
import { Textarea } from "@workspace/ui/components/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { createCategorySchema, type CategoryFormValues } from "@/modules/dashboard/schema/category";
import { LucideIconPicker } from "@/modules/dashboard/ui/components/lucide-icon-picker";

interface CategoryFormProps {
  defaultValues?: Partial<CategoryFormValues>;
  onSubmit: (values: CategoryFormValues) => void;
  onCancel?: () => void;
  submitLabel?: string;
  disabled?: boolean;
}

const FORM_DEFAULTS: CategoryFormValues = {
  name: "",
  slug: "",
  description: "",
  icon: "folder",
  color: "#6366f1",
  isActive: true,
};

const COLOR_PRESETS = [
  "#ef4444",
  "#f97316",
  "#f59e0b",
  "#eab308",
  "#84cc16",
  "#22c55e",
  "#10b981",
  "#14b8a6",
  "#06b6d4",
  "#0ea5e9",
  "#3b82f6",
  "#6366f1",
  "#8b5cf6",
  "#a855f7",
  "#d946ef",
  "#ec4899",
];

const HEX_RE = /^#[0-9a-fA-F]{6}$/;

const slugify = (input: string) =>
  input
    .toString()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

const CategoryPreview = ({ control }: { control: Control<CategoryFormValues> }) => {
  const name = useWatch({ control, name: "name" });
  const slug = useWatch({ control, name: "slug" });
  const description = useWatch({ control, name: "description" });
  const icon = useWatch({ control, name: "icon" });
  const color = useWatch({ control, name: "color" });
  const isActive = useWatch({ control, name: "isActive" });

  const safeColor = HEX_RE.test(color || "") ? color : "#6366f1";

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Pré-visualização</h3>
        <div className="h-px bg-linear-to-r from-border via-border/50 to-transparent" />
      </div>

      <div className="p-5 transition-all border rounded-xl border-border/50 bg-card/40">
        <div className="flex items-start gap-4">
          <div
            className="flex items-center justify-center transition-all rounded-lg size-12 shrink-0 ring-1 ring-inset ring-border/40"
            style={{ backgroundColor: `${safeColor}1a` }}
          >
            <DynamicIcon
              name={(icon || "folder") as IconName}
              className="size-6"
              style={{ color: safeColor }}
              fallback={() => <Folder className="size-6" style={{ color: safeColor }} />}
            />
          </div>
          <div className="flex-1 min-w-0 space-y-1.5">
            <h4 className="text-sm font-semibold leading-tight text-foreground line-clamp-1">
              {name || <span className="italic text-muted-foreground/60">Nome da categoria</span>}
            </h4>
            <p className="font-mono text-[11px] text-muted-foreground line-clamp-1">
              /{slug || <span className="italic">slug-da-categoria</span>}
            </p>
            <p className="text-xs leading-relaxed text-muted-foreground line-clamp-3">
              {description || <span className="italic text-muted-foreground/60">Descrição da categoria…</span>}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-3 mt-4 border-t border-border/50">
          <Badge variant={isActive ? "default" : "outline"} className="text-[10px] font-normal h-5">
            {isActive ? "Publicada" : "Rascunho"}
          </Badge>
          <span
            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-mono"
            style={{ backgroundColor: `${safeColor}1a`, color: safeColor }}
          >
            <span className="rounded-full size-2" style={{ backgroundColor: safeColor }} />
            {safeColor.toUpperCase()}
          </span>
        </div>
      </div>

      <p className="text-[11px] leading-relaxed text-muted-foreground/70">
        Esta é uma prévia das alterações. Salve para aplicar à categoria.
      </p>
    </div>
  );
};

export const CategoryForm = ({
  defaultValues,
  onSubmit,
  onCancel,
  submitLabel = "Salvar",
  disabled = false,
}: CategoryFormProps) => {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: { ...FORM_DEFAULTS, ...defaultValues },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset({ ...FORM_DEFAULTS, ...defaultValues });
    }
  }, [defaultValues, form]);

  const slugTouchedRef = useRef(Boolean(defaultValues?.slug));
  const name = useWatch({ control: form.control, name: "name" });

  useEffect(() => {
    if (slugTouchedRef.current) return;
    const next = slugify(name || "");
    if (next !== form.getValues("slug")) {
      form.setValue("slug", next, { shouldDirty: true, shouldValidate: false });
    }
  }, [name, form]);

  const errors = form.formState.errors;
  const isDirty = form.formState.isDirty;
  const totalErrors = Object.keys(errors).length;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-8">
            <section className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Identidade</h3>
                <div className="h-px bg-linear-to-r from-border via-border/50 to-transparent" />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome da Categoria</FormLabel>
                      <FormControl>
                        <Input placeholder="ex: Ferramentas PDF" {...field} disabled={disabled} />
                      </FormControl>
                      <FormDescription>O slug é gerado automaticamente a partir do nome.</FormDescription>
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
                        <Input
                          placeholder="ex: ferramentas-pdf"
                          {...field}
                          onChange={(e) => {
                            slugTouchedRef.current = true;
                            field.onChange(slugify(e.target.value));
                          }}
                          disabled={disabled}
                          className="font-mono"
                        />
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
                      <Textarea
                        rows={3}
                        placeholder="Para que serve esta categoria? O que o usuário encontra aqui?"
                        {...field}
                        disabled={disabled}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>

            <section className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Aparência</h3>
                <div className="h-px bg-linear-to-r from-border via-border/50 to-transparent" />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="icon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ícone</FormLabel>
                      <FormControl>
                        <LucideIconPicker value={field.value} onChange={field.onChange} disabled={disabled} />
                      </FormControl>
                      <FormDescription>Ícones do Lucide. Usados em listas, navegação e cards.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cor</FormLabel>
                      <FormControl>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={HEX_RE.test(field.value || "") ? field.value : "#6366f1"}
                              onChange={(e) => field.onChange(e.target.value)}
                              disabled={disabled}
                              className="rounded cursor-pointer size-9 ring-1 ring-border/50 disabled:opacity-50"
                              aria-label="Selecionar cor"
                            />
                            <Input
                              placeholder="#6366f1"
                              value={field.value ?? ""}
                              onChange={field.onChange}
                              disabled={disabled}
                              className="font-mono"
                            />
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {COLOR_PRESETS.map((preset) => {
                              const selected = (field.value || "").toLowerCase() === preset.toLowerCase();
                              return (
                                <button
                                  type="button"
                                  key={preset}
                                  onClick={() => field.onChange(preset)}
                                  disabled={disabled}
                                  className={cn(
                                    "size-6 rounded-full transition-all ring-1 ring-inset ring-border/40 hover:scale-110",
                                    selected && "ring-2 ring-offset-2 ring-offset-background ring-foreground",
                                  )}
                                  style={{ backgroundColor: preset }}
                                  aria-label={`Cor ${preset}`}
                                />
                              );
                            })}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </section>

            <section className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Visibilidade</h3>
                <div className="h-px bg-linear-to-r from-border via-border/50 to-transparent" />
              </div>

              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start justify-between gap-4 p-4 border rounded-lg shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Categoria publicada</FormLabel>
                      <FormDescription>
                        Quando ativa, a categoria aparece para os usuários no site público.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} disabled={disabled} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </section>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-6">
              <CategoryPreview control={form.control} />
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
