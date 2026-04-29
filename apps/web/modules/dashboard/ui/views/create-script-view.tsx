"use client";

import { ScriptForm } from "../components/script-form";
import { EntityHeader } from "@/modules/common/ui/components/entity-components";

export function CreateScriptView() {
  return (
    <div className="flex flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <EntityHeader title="Criar Script" description="Adicione um novo script externo" />
      <div className="mx-auto w-full max-w-2xl">
        <ScriptForm />
      </div>
    </div>
  );
}
