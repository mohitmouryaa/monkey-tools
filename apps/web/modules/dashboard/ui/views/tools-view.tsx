"use client";

import { useRouter } from "next/navigation";
import type { ToolWithCategory } from "@/trpc/routers/toolsRouter";
import { useToolsParams } from "@/modules/dashboard/hooks/use-tools-params";
import { useToolsQuery } from "@/modules/dashboard/hooks/use-suspense-tools";
import { ToolsTable } from "@/modules/dashboard/ui/components/tools-table";
import { ToolsGrid } from "@/modules/dashboard/ui/components/tools-grid";
import { ToolsGridSkeleton, ToolsTableSkeleton } from "@/modules/dashboard/ui/components/tools-table-skeleton";
import { EmptyView } from "@/modules/common/ui/components/entity-components";

export const ToolsView = () => {
  const router = useRouter();
  const [params] = useToolsParams();
  const { data, isPending, isPlaceholderData } = useToolsQuery();
  const showSkeleton = isPending || isPlaceholderData;

  if (showSkeleton) {
    return params.view === "grid" ? <ToolsGridSkeleton /> : <ToolsTableSkeleton />;
  }

  const items = (data?.items ?? []) as unknown as ToolWithCategory[];

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="max-w-md mx-auto">
          <EmptyView
            message="Nenhuma ferramenta encontrada. Comece criando uma."
            onNew={() => router.push("/dashboard/tools/create")}
          />
        </div>
      </div>
    );
  }

  if (params.view === "grid") {
    return <ToolsGrid items={items} />;
  }

  return <ToolsTable items={items} />;
};
