"use client";

import { useRouter } from "next/navigation";
import { useDeleteGlobalScript } from "@/modules/dashboard/hooks/use-scripts";
import { useSuspenseScripts } from "@/modules/dashboard/hooks/use-suspense-scripts";
import { ScriptCard, type ScriptCardData } from "@/modules/dashboard/ui/components/script-card";
import { EmptyView } from "@/modules/common/ui/components/entity-components";

export const ScriptsView = () => {
  const scripts = useSuspenseScripts();
  const items = scripts.data.items as unknown as ScriptCardData[];

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center flex-1">
        <div className="max-w-md mx-auto">
          <ScriptsEmpty />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((script) => (
        <ScriptItem key={script._id} data={script} />
      ))}
    </div>
  );
};

const ScriptsEmpty = () => {
  const router = useRouter();
  return (
    <EmptyView
      message="Ainda não há scripts cadastrados. Adicione o primeiro para injetar tags como Analytics, pixels ou chatbots."
      onNew={() => router.push("/dashboard/scripts/create")}
    />
  );
};

const ScriptItem = ({ data }: { data: ScriptCardData }) => {
  const remove = useDeleteGlobalScript();
  return (
    <ScriptCard
      data={data}
      onRemove={() => remove.mutate({ id: data._id })}
      isRemoving={remove.isPending}
    />
  );
};
