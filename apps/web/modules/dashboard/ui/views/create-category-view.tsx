"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
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
    <div className="min-h-screen bg-background">
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <DashboardBreadcrumb
          className="mb-6"
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Categorias", href: "/dashboard/categories" },
            { label: "Nova categoria" },
          ]}
        />

        <header className="flex flex-col gap-4 pb-6 mb-8 border-b sm:flex-row sm:items-end sm:justify-between border-border/50">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/dashboard/categories")}
              className="flex items-center justify-center transition-all rounded-lg group size-10 hover:bg-muted"
              aria-label="Voltar"
              type="button"
            >
              <ArrowLeft className="w-5 h-5 transition-colors text-muted-foreground group-hover:text-foreground" />
            </button>
            <div className="space-y-1.5">
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl text-foreground">Nova categoria</h1>
              <p className="text-sm text-muted-foreground">
                Categorias organizam suas ferramentas em grupos navegáveis no site público.
              </p>
            </div>
          </div>
        </header>

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
