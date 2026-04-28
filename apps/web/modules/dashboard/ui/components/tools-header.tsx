"use client";
import { useRouter } from "next/navigation";
import { EntityHeader } from "@/modules/common/ui/components/entity-components";

export const ToolsHeader = ({ disabled }: { disabled?: boolean }) => {
  const router = useRouter();

  const handleCreate = () => {
    router.push("/dashboard/tools/create");
  };
  return (
    <EntityHeader
      title="Ferramentas"
      description="Crie e gerencie suas ferramentas"
      onNew={handleCreate}
      newButtonLabel="Nova ferramenta"
      disabled={disabled}
    />
  );
};
