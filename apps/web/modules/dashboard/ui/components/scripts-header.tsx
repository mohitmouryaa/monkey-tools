import { EntityHeader } from "@/modules/common/ui/components/entity-components";

export const ScriptsHeader = ({ disabled }: { disabled?: boolean }) => {
  return (
    <EntityHeader
      title="Scripts globais"
      description="Gerencie scripts externos (Analytics, chatbots, pixels) injetados no site."
      newButtonHref="/dashboard/scripts/create"
      newButtonLabel="Novo script"
      disabled={disabled}
    />
  );
};
