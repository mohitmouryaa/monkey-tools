import { EntityHeader } from "@/modules/common/ui/components/entity-components";

export const PagesHeader = () => {
  return (
    <EntityHeader
      title="Páginas"
      description="Gerencie a página inicial, a página de ferramentas e suas páginas personalizadas"
      newButtonHref="/dashboard/pages/custom/create"
      newButtonLabel="Nova página personalizada"
    />
  );
};
