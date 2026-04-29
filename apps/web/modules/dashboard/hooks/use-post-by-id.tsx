"use client";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const usePostById = (id: string) => {
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.posts.getById.queryOptions({ id }));
};
