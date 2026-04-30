"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { PageType } from "@workspace/types";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import { Switch } from "@workspace/ui/components/switch";
import { useCreateCustomPage } from "@/modules/dashboard/hooks/use-create-custom-page";
import { useUpdateCustomPage } from "@/modules/dashboard/hooks/use-update-custom-page";
import {
  type CreateCustomPageFormValues,
  createCustomPageSchema,
  type UpdateCustomPageFormValues,
  updateCustomPageSchema,
} from "@/modules/dashboard/schema/page";
import { LegacyMigrationBanner } from "./legacy-migration-banner";
import { PageSeoFields } from "./page-seo-fields";

const EditorJSField = dynamic(() => import("@/modules/dashboard/ui/components/editor-js-field"), {
  ssr: false,
  loading: () => <div className="min-h-[400px] border rounded-lg p-4 bg-background animate-pulse" />,
});

// `defaultValues.content` pode chegar como string em páginas legadas (Decisão 10).
type CustomPageDefaults = Omit<Partial<UpdateCustomPageFormValues>, "content"> & {
  content?: UpdateCustomPageFormValues["content"] | string;
};

interface CustomPageFormProps {
  mode: "create" | "edit";
  defaultValues?: CustomPageDefaults;
}

type PageFormValues = CreateCustomPageFormValues | UpdateCustomPageFormValues;

export const CustomPageForm = ({ mode, defaultValues }: CustomPageFormProps) => {
  // Wrapper externo: bloqueia formulário quando conteúdo está em formato legado (modo edit).
  if (mode === "edit" && typeof defaultValues?.content === "string") {
    return <LegacyMigrationBanner pageId={defaultValues.id} />;
  }
  return <CustomPageFormInner mode={mode} defaultValues={defaultValues as Partial<UpdateCustomPageFormValues> | undefined} />;
};

interface CustomPageFormInnerProps {
  mode: "create" | "edit";
  defaultValues?: Partial<UpdateCustomPageFormValues>;
}

const CustomPageFormInner = ({ mode, defaultValues }: CustomPageFormInnerProps) => {
  const createCustomPage = useCreateCustomPage();
  const updateCustomPage = useUpdateCustomPage();

  const isCreate = mode === "create";
  const schema = isCreate ? createCustomPageSchema : updateCustomPageSchema;

  const form = useForm<PageFormValues>({
    // biome-ignore lint/suspicious/noExplicitAny: Resolver type mismatch with union types
    resolver: zodResolver(schema) as any,
    defaultValues: {
      pageType: PageType.CUSTOM,
      title: "",
      slug: "",
      seoTitle: "",
      seoDescription: "",
      seoKeywords: "",
      content: { blocks: [] },
      showInFooter: true,
      footerOrder: 0,
      footerLabel: "",
      isActive: true,
      competitorName: "",
      competitorLogo: "",
      ...defaultValues,
    },
  });

  const pageType = form.watch("pageType");
  const isComparison = pageType === PageType.COMPARISON;

  const onSubmit = (data: PageFormValues) => {
    if (isCreate) {
      createCustomPage.mutate(data as CreateCustomPageFormValues, {
        onError: (error) => toast.error(error.message),
      });
    } else {
      updateCustomPage.mutate(data as UpdateCustomPageFormValues, {
        onError: (error) => toast.error(error.message),
      });
    }
  };

  const isPending = createCustomPage.isPending || updateCustomPage.isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Informações Básicas</h3>
                <p className="text-sm text-muted-foreground">Configure as informações básicas da página</p>
              </div>

              <FormField
                control={form.control}
                name="pageType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de página</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={PageType.CUSTOM}>Personalizada (ex: Política de privacidade)</SelectItem>
                        <SelectItem value={PageType.COMPARISON}>Comparação (ex: Alternativa a X)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Páginas de comparação são servidas em /comparar/[slug] e voltadas para conteúdo "alternativa a X".
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título da Página</FormLabel>
                    <FormControl>
                      <Input placeholder={isComparison ? "ex: Alternativa ao iLovePDF" : "ex: Política de Privacidade"} {...field} />
                    </FormControl>
                    <FormDescription>Título exibido na página</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug da URL</FormLabel>
                    <FormControl>
                      <Input placeholder={isComparison ? "ex: ilovepdf" : "ex: politica-de-privacidade"} {...field} />
                    </FormControl>
                    <FormDescription>
                      {isComparison
                        ? "URL final: /comparar/<slug>. Apenas letras minúsculas, números e hífens."
                        : "Caminho da URL (apenas letras minúsculas, números e hífens)"}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {isComparison && (
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Detalhes da comparação</h3>
                  <p className="text-sm text-muted-foreground">Identifique o concorrente comparado nesta página</p>
                </div>

                <FormField
                  control={form.control}
                  name="competitorName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do concorrente</FormLabel>
                      <FormControl>
                        <Input placeholder="ex: iLovePDF" {...field} value={field.value || ""} />
                      </FormControl>
                      <FormDescription>Nome da marca do concorrente (obrigatório para páginas de comparação)</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="competitorLogo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Logo do concorrente (opcional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." {...field} value={field.value || ""} />
                      </FormControl>
                      <FormDescription>URL pública do logo do concorrente</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardContent className="pt-6">
            <PageSeoFields form={form} />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Conteúdo da Página</h3>
                <p className="text-sm text-muted-foreground">Escreva o conteúdo da página usando o editor de texto rico</p>
              </div>

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Conteúdo</FormLabel>
                    <FormControl>
                      <EditorJSField value={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Configurações do Rodapé</h3>
                <p className="text-sm text-muted-foreground">Controle como esta página aparece no rodapé</p>
              </div>

              <FormField
                control={form.control}
                name="showInFooter"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Exibir no Rodapé</FormLabel>
                      <FormDescription>Define se esta página deve aparecer no rodapé do site</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              {form.watch("showInFooter") && (
                <>
                  <FormField
                    control={form.control}
                    name="footerOrder"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ordem no Rodapé</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormDescription>Números menores aparecem primeiro (0 = primeiro)</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="footerLabel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rótulo do Rodapé (Opcional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Deixe vazio para usar o título da página" {...field} value={field.value || ""} />
                        </FormControl>
                        <FormDescription>Texto personalizado para exibir no rodapé (padrão: título da página)</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Status Ativo</FormLabel>
                    <FormDescription>Páginas inativas serão visíveis apenas para administradores</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Salvando..." : isCreate ? "Criar Página" : "Atualizar Página"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
