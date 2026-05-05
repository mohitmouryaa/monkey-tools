"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@workspace/ui/components/button";
import { Form } from "@workspace/ui/components/form";
import { useCreateCustomPage } from "@/modules/dashboard/hooks/use-create-custom-page";
import { type CreateCustomPageFormValues, createCustomPageSchema } from "../../schema/page";
import { CustomPageFormTabs } from "./custom-page-form-tabs";

export const CreateCustomPageForm = () => {
  const createCustomPage = useCreateCustomPage();

  const form = useForm<CreateCustomPageFormValues>({
    resolver: zodResolver(createCustomPageSchema),
    defaultValues: {
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
    },
  });

  const onSubmit = (values: CreateCustomPageFormValues) => {
    createCustomPage.mutate(values, {
      onError: (error) => toast.error(error.message),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <CustomPageFormTabs form={form} />

        <div className="flex justify-end gap-4">
          <Button type="submit" disabled={createCustomPage.isPending}>
            {createCustomPage.isPending ? "Criando..." : "Criar página"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
