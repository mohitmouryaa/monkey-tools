import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { usePostsParams } from "@/modules/dashboard/hooks/use-posts-params";

export const useSuspensePosts = () => {
  const trpc = useTRPC();
  const [params] = usePostsParams();
  return useSuspenseQuery(
    trpc.posts.list.queryOptions({
      page: params.page,
      pageSize: params.pageSize,
      search: params.search,
      status: params.status ?? undefined,
    }),
  );
};
