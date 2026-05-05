"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, Search, Sparkles } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@workspace/ui/components/form";
import { Switch } from "@workspace/ui/components/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import { useUpdateHomepage } from "@/modules/dashboard/hooks/use-update-homepage";
import { type UpdateHomepageInput, updateHomepageSchema } from "@/modules/dashboard/schema/page";
import { HeroSectionForm } from "./hero-section-form";
import { HowItWorksBuilder } from "./how-it-works-builder";
import { PageSeoFields } from "./page-seo-fields";

interface HomepageFormProps {
  defaultValues?: Partial<UpdateHomepageInput>;
}

const triggerCls = "gap-2 px-3 py-1.5 data-[state=active]:bg-background data-[state=active]:shadow-sm";

export const HomepageForm = ({ defaultValues }: HomepageFormProps) => {
  const updateHomepage = useUpdateHomepage();

  const form = useForm<UpdateHomepageInput>({
    resolver: zodResolver(updateHomepageSchema),
    defaultValues: defaultValues || {
      seoTitle: "",
      seoDescription: "",
      seoKeywords: "",
      heroSection: {
        badge: "",
        heading: "",
        description: "",
        primaryButtonText: "",
        primaryButtonLink: "",
        secondaryButtonText: "",
        secondaryButtonLink: "",
      },
      howItWorksSection: {
        title: "",
        subtitle: "",
        steps: [],
      },
      isActive: true,
    },
  });

  const onSubmit = (data: UpdateHomepageInput) => {
    updateHomepage.mutate(data);
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
                        <FormDescription>Quando inativa, a home não fica visível ao público</FormDescription>
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
                <HeroSectionForm form={form} />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <HowItWorksBuilder form={form} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4">
          <Button type="submit" disabled={updateHomepage.isPending}>
            {updateHomepage.isPending ? "Salvando..." : "Salvar página inicial"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
