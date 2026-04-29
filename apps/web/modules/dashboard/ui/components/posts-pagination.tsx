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
      totalPages={posts.data.totalPages}
      page={posts.data.page}
      onPageChange={(page) => setParams({ ...params, page })}
    />
  );
};
