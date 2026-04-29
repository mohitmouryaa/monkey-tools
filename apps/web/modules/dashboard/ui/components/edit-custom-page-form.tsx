"use client";

import dynamic from "next/dynamic";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { Switch } from "@workspace/ui/components/switch";
import { useUpdateCustomPage } from "../../hooks/use-update-custom-page";
import { type UpdateCustomPageFormValues, updateCustomPageSchema } from "../../schema/page";
import { LegacyMigrationBanner } from "./legacy-migration-banner";
import { PageSeoFields } from "./page-seo-fields";

const EditorJSField = dynamic(() => import("@/modules/dashboard/ui/components/editor-js-field"), {
  ssr: false,
  loading: () => <div className="min-h-[400px] border rounded-lg p-4 bg-background animate-pulse" />,
});

// `defaultValues.content` pode chegar como string em páginas legadas (Decisão 10);
// nesse caso o form bloqueia até a migração rodar.
type EditCustomPageDefaults = Omit<UpdateCustomPageFormValues, "content"> & {
  content: UpdateCustomPageFormValues["content"] | string;
};

interface EditCustomPageFormProps {
  defaultValues: EditCustomPageDefaults;
}

export const EditCustomPageForm = ({ defaultValues }: EditCustomPageFormProps) => {
  // Wrapper externo: garante que os hooks abaixo (Rules of Hooks) só rodem
  // quando o conteúdo já está em formato OutputData.
  if (typeof defaultValues.content === "string") {
    return <LegacyMigrationBanner pageId={defaultValues.id} />;
  }
  return <EditCustomPageFormInner defaultValues={defaultValues as UpdateCustomPageFormValues} />;
};

const EditCustomPageFormInner = ({ defaultValues }: { defaultValues: UpdateCustomPageFormValues }) => {
  const updateCustomPage = useUpdateCustomPage();

  const form = useForm<UpdateCustomPageFormValues>({
    resolver: zodResolver(updateCustomPageSchema),
    defaultValues: {
      ...defaultValues,
      footerOrder: defaultValues.footerOrder ?? 0,
    },
  });

  const onSubmit = (values: UpdateCustomPageFormValues) => {
    const data = values;
    updateCustomPage.mutate(data, {
      onError: (error) => toast.error(error.message),
    });
  };

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
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título da Página</FormLabel>
                    <FormControl>
                      <Input placeholder="ex: Política de Privacidade" {...field} />
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
                      <Input placeholder="ex: politica-de-privacidade" {...field} />
                    </FormControl>
                    <FormDescription>Caminho da URL (apenas letras minúsculas, números e hífens)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

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
          <Button type="submit" disabled={updateCustomPage.isPending}>
            {updateCustomPage.isPending ? "Atualizando..." : "Atualizar Página"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
