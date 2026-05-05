import { EntityHeader } from "@/modules/common/ui/components/entity-components";

export const ToolsHeader = ({ disabled }: { disabled?: boolean }) => {
  return (
    <EntityHeader
      title="Ferramentas"
      description="Crie e gerencie suas ferramentas"
      newButtonHref="/dashboard/tools/create"
      newButtonLabel="Nova ferramenta"
      disabled={disabled}
    />
  );
};
