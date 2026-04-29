import { prefetch, trpc } from "@/trpc/server";
import type { inferInput } from "@trpc/tanstack-react-query";

type ListInput = inferInput<typeof trpc.posts.list>;

export const prefetchPosts = (params: ListInput) => {
  return prefetch(trpc.posts.list.queryOptions(params));
};

export const prefetchPost = (id: string) => {
  return prefetch(trpc.posts.getById.queryOptions({ id }));
};
