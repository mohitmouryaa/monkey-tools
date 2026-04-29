import { PostsHeader } from "@/modules/dashboard/ui/components/posts-header";
import { PostsSearch } from "@/modules/dashboard/ui/components/posts-search";
import { PostsPagination } from "@/modules/dashboard/ui/components/posts-pagination";
import { DashboardBreadcrumb } from "@/modules/common/ui/components/dashboard-breadcrumb";

export const PostsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full px-4 py-6 md:px-8 md:py-8">
      <div className="flex flex-col w-full h-full mx-auto max-w-7xl gap-y-6">
        <DashboardBreadcrumb
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Posts" },
          ]}
        />
        <PostsHeader />
        <div className="flex flex-col h-full gap-y-4">
          <PostsSearch />
          {children}
        </div>
        <PostsPagination />
      </div>
    </div>
  );
};
