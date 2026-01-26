"use client";

import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateAllToolsPage = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.pages.updateAllToolsPage.mutationOptions({
      onSuccess: (data) => {
        toast.success(`Page "${data.title || data.slug}" updated successfully`);
        queryClient.invalidateQueries(trpc.pages.getAllToolsPage.queryOptions());
      },
      onError: (error) => {
        toast.error(error.message || "Failed to update all tools page");
      },
    }),
  );
};
