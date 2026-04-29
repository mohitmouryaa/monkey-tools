"use client";

import { useRouter } from "next/navigation";
import { useRemoveCategory } from "@/modules/dashboard/hooks/use-remove-category";
import { useSuspenseCategories } from "@/modules/dashboard/hooks/use-suspense-categories";
import { CategoryCard, type CategoryCardData } from "@/modules/dashboard/ui/components/category-card";
import { EmptyView } from "@/modules/common/ui/components/entity-components";

export const CategoriesView = () => {
  const categories = useSuspenseCategories();
  const items = categories.data.items as unknown as CategoryCardData[];

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center flex-1">
        <div className="max-w-md mx-auto">
          <CategoriesEmpty />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((category) => (
        <CategoryItem key={category._id} data={category} />
      ))}
    </div>
  );
};

const CategoriesEmpty = () => {
  const router = useRouter();
  return (
    <EmptyView
      message="Ainda não há categorias. Crie a primeira para começar a organizar suas ferramentas."
      onNew={() => router.push("/dashboard/categories/create")}
    />
  );
};

const CategoryItem = ({ data }: { data: CategoryCardData }) => {
  const removeCategory = useRemoveCategory();
  const handleRemove = () => {
    removeCategory.mutate({ id: data._id });
  };
  return <CategoryCard data={data} onRemove={handleRemove} isRemoving={removeCategory.isPending} />;
};
