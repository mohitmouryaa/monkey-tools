"use client";

import { ToolsBulkActionsBar } from "@/modules/dashboard/ui/components/tools-bulk-actions-bar";
import { ToolsCommandPalette } from "@/modules/dashboard/ui/components/tools-command-palette";
import { ToolsFilterBar } from "@/modules/dashboard/ui/components/tools-filter-bar";
import { ToolsHeader } from "@/modules/dashboard/ui/components/tools-header";
import { ToolsPagination } from "@/modules/dashboard/ui/components/tools-pagination";
import { ToolsStats } from "@/modules/dashboard/ui/components/tools-stats";
import { ToolsView } from "@/modules/dashboard/ui/views/tools-view";
import { ToolsSelectionProvider } from "@/modules/dashboard/hooks/use-tools-selection";

export const ToolsBoard = () => {
  return (
    <ToolsSelectionProvider>
      <div className="flex flex-col gap-y-6">
        <ToolsHeader />
        <ToolsStats />
        <div className="flex flex-col gap-y-4">
          <ToolsFilterBar />
          <ToolsBulkActionsBar />
          <ToolsView />
        </div>
        <ToolsPagination />
      </div>
      <ToolsCommandPalette />
    </ToolsSelectionProvider>
  );
};
