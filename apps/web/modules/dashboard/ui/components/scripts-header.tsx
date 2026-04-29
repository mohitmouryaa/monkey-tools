"use client";
import { useRouter } from "next/navigation";
import { EntityHeader } from "@/modules/common/ui/components/entity-components";

export const ScriptsHeader = () => {
  const router = useRouter();

  const handleCreate = () => {
    router.push("/dashboard/scripts/create");
  };

  return (
    <EntityHeader
      title="Scripts Globais"
      description="Gerencie scripts externos (Analytics, Chatbots, etc.)"
      onNew={handleCreate}
      newButtonLabel="Novo Script"
    />
  );
};
