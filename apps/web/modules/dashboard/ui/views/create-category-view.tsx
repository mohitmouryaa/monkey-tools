"use client";

import { useRouter } from "next/navigation";
import { useCreateCategory } from "@/modules/dashboard/hooks/use-create-category";
import { CategoryForm } from "@/modules/dashboard/ui/components/category-form";
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
    <div className="w-full p-4 space-y-8 md:p-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Criar Nova Categoria</h2>
        <p className="text-muted-foreground">Adicione uma nova categoria para organizar suas ferramentas.</p>
      </div>

      <div className="w-full">
        <CategoryForm onSubmit={onSubmit} submitLabel="Criar Categoria" disabled={createCategoryMutation.isPending} />
      </div>
    </div>
  );
};
