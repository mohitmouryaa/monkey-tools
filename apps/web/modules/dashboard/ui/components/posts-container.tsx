import { PostsContainer as Layout } from "@/modules/dashboard/posts/ui/posts-entity-components";
import { PostsHeader } from "@/modules/dashboard/ui/components/posts-header";
import { PostsSearch } from "@/modules/dashboard/ui/components/posts-search";
import { PostsPagination } from "@/modules/dashboard/ui/components/posts-pagination";

export const PostsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout header={<PostsHeader />} search={<PostsSearch />} pagination={<PostsPagination />}>
      {children}
    </Layout>
  );
};
