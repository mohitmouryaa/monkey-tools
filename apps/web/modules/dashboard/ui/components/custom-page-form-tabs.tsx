"use client";

import dynamic from "next/dynamic";
import { FileText, Footprints, Search, Sparkles } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import { Card, CardContent } from "@workspace/ui/components/card";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { Switch } from "@workspace/ui/components/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import { PageSeoFields } from "./page-seo-fields";

const EditorJSField = dynamic(() => import("@/modules/dashboard/ui/components/editor-js-field"), {
  ssr: false,
  loading: () => <div className="min-h-[400px] border rounded-lg p-4 bg-background animate-pulse" />,
});

interface CustomPageFormTabsProps {
  // biome-ignore lint/suspicious/noExplicitAny: React Hook Form type portability
  form: UseFormReturn<any>;
}

const triggerCls = "gap-2 px-3 py-1.5 data-[state=active]:bg-background data-[state=active]:shadow-sm";

export const CustomPageFormTabs = ({ form }: CustomPageFormTabsProps) => {
  const showInFooter = form.watch("showInFooter");

  return (
    <Tabs defaultValue="basic" className="space-y-6">
      <TabsList className="inline-flex w-auto h-auto gap-1 p-1 bg-muted/60">
        <TabsTrigger value="basic" className={triggerCls}>
          <FileText className="size-3.5" />
          Básico
        </TabsTrigger>
        <TabsTrigger value="seo" className={triggerCls}>
          <Search className="size-3.5" />
          SEO
        </TabsTrigger>
        <TabsTrigger value="content" className={triggerCls}>
          <Sparkles className="size-3.5" />
          Conteúdo
        </TabsTrigger>
        <TabsTrigger value="footer" className={triggerCls}>
          <Footprints className="size-3.5" />
          Rodapé
        </TabsTrigger>
      </TabsList>

      <TabsContent value="basic" className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Informações básicas</h3>
                <p className="text-sm text-muted-foreground">Configure as informações principais da página</p>
              </div>

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título da página</FormLabel>
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
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Status ativo</FormLabel>
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
      </TabsContent>

      <TabsContent value="seo" className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <PageSeoFields form={form} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="content" className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Conteúdo da página</h3>
                <p className="text-sm text-muted-foreground">Escreva o conteúdo da página usando o editor de blocos</p>
              </div>

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Conteúdo</FormLabel>
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
      </TabsContent>

      <TabsContent value="footer" className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Configurações do rodapé</h3>
                <p className="text-sm text-muted-foreground">Controle como esta página aparece no rodapé</p>
              </div>

              <FormField
                control={form.control}
                name="showInFooter"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Exibir no rodapé</FormLabel>
                      <FormDescription>Define se esta página deve aparecer no rodapé do site</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              {showInFooter && (
                <>
                  <FormField
                    control={form.control}
                    name="footerOrder"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ordem no rodapé</FormLabel>
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
                        <FormLabel>Rótulo do rodapé (opcional)</FormLabel>
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
      </TabsContent>
    </Tabs>
  );
};
