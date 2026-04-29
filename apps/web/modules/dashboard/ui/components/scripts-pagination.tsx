"use client";

import { useScriptsParams } from "@/modules/dashboard/hooks/use-scripts-params";
import { useSuspenseScripts } from "@/modules/dashboard/hooks/use-suspense-scripts";
import { EntityPagination } from "@/modules/common/ui/components/entity-components";

export const ScriptsPagination = () => {
  const scripts = useSuspenseScripts();
  const [params, setParams] = useScriptsParams();

  return (
    <EntityPagination
      disabled={scripts.isFetching}
      page={scripts.data.page}
      totalPages={scripts.data.totalPages}
      onPageChange={(page) => setParams({ ...params, page })}
    />
  );
};
