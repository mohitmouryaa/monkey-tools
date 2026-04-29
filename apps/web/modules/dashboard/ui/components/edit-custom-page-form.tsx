"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@workspace/ui/components/button";
import { Form } from "@workspace/ui/components/form";
import { useUpdateCustomPage } from "../../hooks/use-update-custom-page";
import { type UpdateCustomPageFormValues, updateCustomPageSchema } from "../../schema/page";
import { CustomPageFormTabs } from "./custom-page-form-tabs";
import { LegacyMigrationBanner } from "./legacy-migration-banner";

type EditCustomPageDefaults = Omit<UpdateCustomPageFormValues, "content"> & {
  content: UpdateCustomPageFormValues["content"] | string;
};

interface EditCustomPageFormProps {
  defaultValues: EditCustomPageDefaults;
}

export const EditCustomPageForm = ({ defaultValues }: EditCustomPageFormProps) => {
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
    updateCustomPage.mutate(values, {
      onError: (error) => toast.error(error.message),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <CustomPageFormTabs form={form} />

        <div className="flex justify-end gap-4">
          <Button type="submit" disabled={updateCustomPage.isPending}>
            {updateCustomPage.isPending ? "Atualizando..." : "Atualizar página"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
