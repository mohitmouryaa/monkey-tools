"use client";

import { useEffect } from "react";
import { useForm, useWatch, type Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Code2, FileCode2, Loader2, Save, Sparkles } from "lucide-react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import { createGlobalScriptSchema, type CreateGlobalScriptInput } from "@/modules/dashboard/schema/global-script";

interface ScriptFormProps {
  defaultValues?: Partial<CreateGlobalScriptInput>;
  onSubmit: (values: CreateGlobalScriptInput) => void;
  onCancel?: () => void;
  submitLabel?: string;
  disabled?: boolean;
}

const FORM_DEFAULTS: CreateGlobalScriptInput = {
  name: "",
  content: "",
  location: "HEAD",
  isActive: true,
};

const LOCATION_LABEL: Record<CreateGlobalScriptInput["location"], string> = {
  HEAD: "Head",
  BODY: "Body",
};

const LOCATION_DESCRIPTION: Record<CreateGlobalScriptInput["location"], string> = {
  HEAD: "Carrega antes da página renderizar. Ideal para pixels, fontes e meta tags.",
  BODY: "Carrega no fim do body. Ideal para chatbots e widgets que dependem do DOM.",
};

const ScriptPreview = ({ control }: { control: Control<CreateGlobalScriptInput> }) => {
  const name = useWatch({ control, name: "name" });
  const content = useWatch({ control, name: "content" });
  const location = useWatch({ control, name: "location" });
  const isActive = useWatch({ control, name: "isActive" });

  const accent = location === "HEAD" ? "#0ea5e9" : "#8b5cf6";

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
            style={{ backgroundColor: `${accent}1a` }}
          >
            <FileCode2 className="size-6" style={{ color: accent }} />
          </div>
          <div className="flex-1 min-w-0 space-y-1.5">
            <h4 className="text-sm font-semibold leading-tight text-foreground line-clamp-1">
              {name || <span className="italic text-muted-foreground/60">Nome do script</span>}
            </h4>
            <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
              {LOCATION_DESCRIPTION[location]}
            </p>
          </div>
        </div>

        <pre className="mt-4 px-3 py-2 overflow-hidden font-mono text-[11px] leading-relaxed rounded-md bg-muted/60 text-muted-foreground line-clamp-4 break-all whitespace-pre-wrap">
          {content || <span className="italic text-muted-foreground/60">// cole aqui o trecho HTML/JS</span>}
        </pre>

        <div className="flex items-center justify-between gap-2 pt-3 mt-4 border-t border-border/50">
          <span
            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider"
            style={{ backgroundColor: `${accent}1a`, color: accent }}
          >
            <Code2 className="size-3" />
            {LOCATION_LABEL[location]}
          </span>
          <Badge variant={isActive ? "default" : "outline"} className="h-5 text-[10px] font-normal">
            {isActive ? "Ativo" : "Inativo"}
          </Badge>
        </div>
      </div>

      <p className="text-[11px] leading-relaxed text-muted-foreground/70">
        O script só é injetado nas páginas públicas quando estiver ativo.
      </p>
    </div>
  );
};

export const ScriptForm = ({
  defaultValues,
  onSubmit,
  onCancel,
  submitLabel = "Salvar",
  disabled = false,
}: ScriptFormProps) => {
  const form = useForm<CreateGlobalScriptInput>({
    resolver: zodResolver(createGlobalScriptSchema),
    defaultValues: { ...FORM_DEFAULTS, ...defaultValues },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset({ ...FORM_DEFAULTS, ...defaultValues });
    }
  }, [defaultValues, form]);

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
                <h3 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Identificação</h3>
                <div className="h-px bg-linear-to-r from-border via-border/50 to-transparent" />
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do script</FormLabel>
                    <FormControl>
                      <Input placeholder="ex: Google Analytics" {...field} disabled={disabled} />
                    </FormControl>
                    <FormDescription>Use um nome descritivo para identificar o script depois.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Localização</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value} disabled={disabled}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Onde injetar este script?" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="HEAD">Head — antes do conteúdo</SelectItem>
                        <SelectItem value="BODY">Body — depois do conteúdo</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>{LOCATION_DESCRIPTION[field.value as CreateGlobalScriptInput["location"]]}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>

            <section className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Código</h3>
                <div className="h-px bg-linear-to-r from-border via-border/50 to-transparent" />
              </div>

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Conteúdo HTML</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="<script>...</script>"
                        className="font-mono min-h-64"
                        spellCheck={false}
                        {...field}
                        disabled={disabled}
                      />
                    </FormControl>
                    <FormDescription>Cole o trecho completo, incluindo a tag &lt;script&gt;.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                      <FormLabel className="text-base">Script ativo</FormLabel>
                      <FormDescription>
                        Quando inativo, o script deixa de ser injetado mas permanece salvo aqui.
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
              <ScriptPreview control={form.control} />
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
