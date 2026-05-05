"use client";
import { toast } from "sonner";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRemovePost = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.posts.delete.mutationOptions({
      onSuccess: (data) => {
        toast.success(`Post removed`);
        queryClient.invalidateQueries({ queryKey: trpc.posts.list.queryKey() });
        queryClient.invalidateQueries(trpc.posts.getById.queryOptions({ id: data.id }));
      },
      onError: (error) => {
        toast.error(`Failed to remove post: ${error.message}`);
      },
    }),
  );
};
