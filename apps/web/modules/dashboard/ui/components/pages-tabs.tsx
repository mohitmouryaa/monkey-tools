"use client";

import { FileText, Layers } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import { PAGINATION } from "@/modules/common/constants";
import type { PagesTab } from "@/modules/dashboard/pages-params";
import { usePagesParams } from "@/modules/dashboard/hooks/use-pages-params";

export const PagesTabs = () => {
  const [params, setParams] = usePagesParams();

  const onTabChange = (value: string) => {
    const tab = value as PagesTab;
    setParams({ ...params, tab, page: PAGINATION.DEFAULT_PAGE, search: "" });
  };

  return (
    <Tabs value={params.tab} onValueChange={onTabChange}>
      <TabsList className="inline-flex w-auto h-auto gap-1 p-1 bg-muted/60">
        <TabsTrigger value="custom" className="gap-2 px-3 py-1.5 data-[state=active]:bg-background data-[state=active]:shadow-sm">
          <FileText className="size-3.5" />
          Personalizadas
        </TabsTrigger>
        <TabsTrigger value="fixed" className="gap-2 px-3 py-1.5 data-[state=active]:bg-background data-[state=active]:shadow-sm">
          <Layers className="size-3.5" />
          Fixas
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
