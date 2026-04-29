"use client";

import { usePostsParams } from "@/modules/dashboard/hooks/use-posts-params";
import { useSuspensePosts } from "@/modules/dashboard/hooks/use-suspense-posts";
import { PostsPaginationBar } from "@/modules/dashboard/posts/ui/posts-entity-components";

export const PostsPagination = () => {
  const posts = useSuspensePosts();
  const [params, setParams] = usePostsParams();

  return (
    <PostsPaginationBar
      disabled={posts.isFetching}
      page={posts.data.page}
      pageSize={posts.data.pageSize}
      totalPages={posts.data.totalPages}
      totalCount={posts.data.totalCount}
      onPageChange={(page) => setParams({ ...params, page })}
      onPageSizeChange={(pageSize) => setParams({ ...params, page: 1, pageSize })}
    />
  );
};
