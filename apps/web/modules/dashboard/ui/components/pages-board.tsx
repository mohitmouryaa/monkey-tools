"use client";

import { DashboardBreadcrumb } from "@/modules/common/ui/components/dashboard-breadcrumb";
import { usePagesParams } from "@/modules/dashboard/hooks/use-pages-params";
import { PagesHeader } from "@/modules/dashboard/ui/components/pages-header";
import { PagesPagination } from "@/modules/dashboard/ui/components/pages-pagination";
import { PagesSearch } from "@/modules/dashboard/ui/components/pages-search";
import { PagesTabs } from "@/modules/dashboard/ui/components/pages-tabs";
import { PagesView } from "@/modules/dashboard/ui/views/pages-view";

export const PagesBoard = () => {
  const [params] = usePagesParams();
  const isCustomTab = params.tab === "custom";

  return (
    <div className="flex flex-col gap-y-6">
      <DashboardBreadcrumb items={[{ label: "Dashboard", href: "/dashboard" }, { label: "Páginas" }]} />
      <PagesHeader />
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <PagesTabs />
          {isCustomTab && <PagesSearch />}
        </div>
        <PagesView />
      </div>
      {isCustomTab && <PagesPagination />}
    </div>
  );
};
