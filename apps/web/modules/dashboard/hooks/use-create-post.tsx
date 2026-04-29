"use client";
import { toast } from "sonner";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreatePost = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.posts.create.mutationOptions({
      onSuccess: (data) => {
        toast.success(`Post "${data.title}" created`);
        queryClient.invalidateQueries({ queryKey: trpc.posts.list.queryKey() });
      },
      onError: (error) => {
        toast.error(`Failed to create post: ${error.message}`);
      },
    }),
  );
};
