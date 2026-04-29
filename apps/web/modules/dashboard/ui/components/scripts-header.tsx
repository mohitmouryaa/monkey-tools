"use client";

import { useRouter } from "next/navigation";
import { EntityHeader } from "@/modules/common/ui/components/entity-components";

export const ScriptsHeader = ({ disabled }: { disabled?: boolean }) => {
  const router = useRouter();
  const handleCreate = () => router.push("/dashboard/scripts/create");

  return (
    <EntityHeader
      title="Scripts globais"
      description="Gerencie scripts externos (Analytics, chatbots, pixels) injetados no site."
      onNew={handleCreate}
      newButtonLabel="Novo script"
      disabled={disabled}
    />
  );
};
