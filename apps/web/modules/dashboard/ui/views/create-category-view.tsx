"use client";

import { useRouter } from "next/navigation";
import { useCreateCategory } from "@/modules/dashboard/hooks/use-create-category";
import { CategoryForm } from "@/modules/dashboard/ui/components/category-form";
import { DashboardBreadcrumb } from "@/modules/common/ui/components/dashboard-breadcrumb";
import type { CategoryFormValues } from "@/modules/dashboard/schema/category";

export const CreateCategoryView = () => {
  const router = useRouter();
  const createCategoryMutation = useCreateCategory();

  const onSubmit = (values: CategoryFormValues) => {
    createCategoryMutation.mutate(values, {
      onSuccess: (data) => {
        router.push(`/dashboard/categories/${data._id}`);
      },
    });
  };

  return (
    <div className="w-full px-4 py-6 mx-auto max-w-7xl md:px-8 md:py-8">
      <div className="space-y-6">
        <DashboardBreadcrumb
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Categorias", href: "/dashboard/categories" },
            { label: "Nova categoria" },
          ]}
        />
        <div className="flex flex-col gap-6 pb-6 border-b border-border sm:flex-row sm:items-end sm:justify-between sm:pb-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Nova categoria</h1>
            <p className="text-base text-muted-foreground">
              Categorias organizam suas ferramentas em grupos navegáveis no site público.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <CategoryForm
          onSubmit={onSubmit}
          submitLabel="Criar categoria"
          disabled={createCategoryMutation.isPending}
          onCancel={() => router.push("/dashboard/categories")}
        />
      </div>
    </div>
  );
};
