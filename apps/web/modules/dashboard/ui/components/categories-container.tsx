import { CategoriesHeader } from "@/modules/dashboard/ui/components/categories-header";
import { CategoriesSearch } from "@/modules/dashboard/ui/components/categories-search";
import { CategoriesPagination } from "@/modules/dashboard/ui/components/categories-pagination";
import { DashboardBreadcrumb } from "@/modules/common/ui/components/dashboard-breadcrumb";

export const CategoriesContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full px-4 py-6 md:px-8 md:py-8">
      <div className="flex flex-col w-full h-full mx-auto max-w-7xl gap-y-6">
        <DashboardBreadcrumb
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Categorias" },
          ]}
        />
        <CategoriesHeader />
        <div className="flex flex-col h-full gap-y-4">
          <CategoriesSearch />
          {children}
        </div>
        <CategoriesPagination />
      </div>
    </div>
  );
};
