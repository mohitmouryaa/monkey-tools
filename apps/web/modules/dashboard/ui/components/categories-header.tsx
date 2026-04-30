import { EntityHeader } from "@/modules/common/ui/components/entity-components";

export const CategoriesHeader = ({ disabled }: { disabled?: boolean }) => {
  return (
    <EntityHeader
      title="Categorias"
      description="Crie e gerencie suas categorias de ferramentas"
      newButtonHref="/dashboard/categories/create"
      newButtonLabel="Nova categoria"
      disabled={disabled}
    />
  );
};
