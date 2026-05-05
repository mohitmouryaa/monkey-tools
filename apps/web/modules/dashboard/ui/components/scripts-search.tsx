"use client";

import { useEntitySearch } from "@/modules/common/hooks/use-entity-search";
import { useScriptsParams } from "@/modules/dashboard/hooks/use-scripts-params";
import { EntitySearch } from "@/modules/common/ui/components/entity-components";

export const ScriptsSearch = () => {
  const [params, setParams] = useScriptsParams();
  const { searchValue, onSearchChange } = useEntitySearch({ params, setParams });
  return <EntitySearch value={searchValue} onChange={onSearchChange} placeholder="Buscar scripts" />;
};
