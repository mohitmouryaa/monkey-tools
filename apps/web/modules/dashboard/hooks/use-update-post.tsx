"use client";
import { toast } from "sonner";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdatePost = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.posts.update.mutationOptions({
      onSuccess: (data) => {
        toast.success(`Post "${data.title}" updated`);
        queryClient.invalidateQueries({ queryKey: trpc.posts.list.queryKey() });
        queryClient.invalidateQueries(trpc.posts.getById.queryOptions({ id: data._id }));
      },
      onError: (error) => {
        toast.error(`Failed to update post: ${error.message}`);
      },
    }),
  );
};
