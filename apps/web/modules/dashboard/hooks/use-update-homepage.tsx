"use client";

import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateHomepage = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.pages.updateHomepage.mutationOptions({
      onSuccess: (data) => {
        toast.success(`Homepage "${data.title || data.slug}" updated successfully`);
        queryClient.invalidateQueries(trpc.pages.getHomepage.queryOptions());
      },
      onError: (error) => {
        toast.error(error.message || "Failed to update homepage");
      },
    }),
  );
};
