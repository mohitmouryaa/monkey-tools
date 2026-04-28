"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Switch } from "@workspace/ui/components/switch";
import { Textarea } from "@workspace/ui/components/textarea";
import { Card, CardContent } from "@workspace/ui/components/card";
import { useUpdateAllToolsPage } from "@/modules/dashboard/hooks/use-update-all-tools-page";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@workspace/ui/components/form";
import { type UpdateAllToolsPageInput, updateAllToolsPageSchema } from "@/modules/dashboard/schema/page";
import { PageSeoFields } from "./page-seo-fields";

interface AllToolsPageFormProps {
  defaultValues?: Partial<UpdateAllToolsPageInput>;
}

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
                <p className="text-sm text-muted-foreground">Configure o conteúdo da página de todas as ferramentas</p>
              </div>

              <FormField
                control={form.control}
                name="h1Heading"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título H1</FormLabel>
                    <FormControl>
                      <Input placeholder="ex: Todas as Ferramentas" {...field} />
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
                    <FormLabel>Descrição Curta</FormLabel>
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

        <Card>
          <CardContent className="pt-6">
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Status Ativo</FormLabel>
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

        <div className="flex justify-end gap-4">
          <Button type="submit" disabled={updateAllToolsPage.isPending}>
            {updateAllToolsPage.isPending ? "Salvando..." : "Salvar Página de Ferramentas"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
