"use client";
import { useRouter } from "next/navigation";
import { EntityHeader } from "@/modules/common/ui/components/entity-components";

export const CategoriesHeader = ({ disabled }: { disabled?: boolean }) => {
  const router = useRouter();

  const handleCreate = () => {
    router.push("/dashboard/categories/create");
  };
  return (
    <EntityHeader
      title="Categorias"
      description="Crie e gerencie suas categorias de ferramentas"
      onNew={handleCreate}
      newButtonLabel="Nova categoria"
      disabled={disabled}
    />
  );
};
