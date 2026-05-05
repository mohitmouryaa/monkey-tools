import { ScriptsHeader } from "@/modules/dashboard/ui/components/scripts-header";
import { ScriptsSearch } from "@/modules/dashboard/ui/components/scripts-search";
import { ScriptsPagination } from "@/modules/dashboard/ui/components/scripts-pagination";
import { DashboardBreadcrumb } from "@/modules/common/ui/components/dashboard-breadcrumb";

export const ScriptsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full px-4 py-6 md:px-8 md:py-8">
      <div className="flex flex-col w-full h-full mx-auto max-w-7xl gap-y-6">
        <DashboardBreadcrumb
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Scripts globais" },
          ]}
        />
        <ScriptsHeader />
        <div className="flex flex-col h-full gap-y-4">
          <ScriptsSearch />
          {children}
        </div>
        <ScriptsPagination />
      </div>
    </div>
  );
};
