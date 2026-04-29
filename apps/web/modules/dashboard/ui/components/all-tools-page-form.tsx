"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, Search, Sparkles } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { Switch } from "@workspace/ui/components/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import { Textarea } from "@workspace/ui/components/textarea";
import { useUpdateAllToolsPage } from "@/modules/dashboard/hooks/use-update-all-tools-page";
import { type UpdateAllToolsPageInput, updateAllToolsPageSchema } from "@/modules/dashboard/schema/page";
import { PageSeoFields } from "./page-seo-fields";

interface AllToolsPageFormProps {
  defaultValues?: Partial<UpdateAllToolsPageInput>;
}

const triggerCls = "gap-2 px-3 py-1.5 data-[state=active]:bg-background data-[state=active]:shadow-sm";

export const AllToolsPageForm = ({ defaultValues }: AllToolsPageFormProps) => {
  const updateAllToolsPage = useUpdateAllToolsPage();

  const form = useForm<UpdateAllToolsPageInput>({
    resolver: zodResolver(updateAllToolsPageSchema),
    defaultValues: {
      seoTitle: "",
      seoDescription: "",
      seoKeywords: "",
      h1Heading: "",
      shortDescription: "",
      isActive: true,
      ...defaultValues,
    },
  });

  const onSubmit = (data: UpdateAllToolsPageInput) => {
    updateAllToolsPage.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Página ativa</FormLabel>
                        <FormDescription>Esta página será visível para usuários públicos quando ativa</FormDescription>
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
                    <p className="text-sm text-muted-foreground">Configure o cabeçalho e a descrição da página de ferramentas</p>
                  </div>

                  <FormField
                    control={form.control}
                    name="h1Heading"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título H1</FormLabel>
                        <FormControl>
                          <Input placeholder="ex: Todas as ferramentas" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="shortDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição curta</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Breve descrição sobre todas as ferramentas" rows={3} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4">
          <Button type="submit" disabled={updateAllToolsPage.isPending}>
            {updateAllToolsPage.isPending ? "Salvando..." : "Salvar página de ferramentas"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
