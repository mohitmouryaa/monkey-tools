"use client";

import { useRouter } from "next/navigation";
import { useCreateTool } from "@/modules/dashboard/hooks/use-create-tool";
import { ToolForm, type ToolFormValues } from "@/modules/dashboard/ui/components/tool-form";
import { DashboardBreadcrumb } from "@/modules/common/ui/components/dashboard-breadcrumb";

export const CreateToolView = () => {
  const router = useRouter();
  const createToolMutation = useCreateTool();

  const onSubmit = (values: ToolFormValues) => {
    createToolMutation.mutate(values, {
      onSuccess: (data) => {
        router.push(`/dashboard/tools/${data._id}`);
      },
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-6 py-8 mx-auto max-w-7xl">
        <div className="space-y-6 mb-8">
          <DashboardBreadcrumb
            items={[
              { label: "Dashboard", href: "/dashboard" },
              { label: "Ferramentas", href: "/dashboard/tools" },
              { label: "Nova ferramenta" },
            ]}
          />
          <div className="flex flex-col gap-6 pb-6 border-b border-border sm:flex-row sm:items-end sm:justify-between sm:pb-8">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Criar nova ferramenta</h1>
              <p className="text-base text-muted-foreground">
                Adicione uma nova ferramenta à plataforma, com conteúdo, visual e configurações de SEO.
              </p>
            </div>
          </div>
        </div>

        <ToolForm onSubmit={onSubmit} submitLabel="Criar ferramenta" disabled={createToolMutation.isPending} />
      </div>
    </div>
  );
};
