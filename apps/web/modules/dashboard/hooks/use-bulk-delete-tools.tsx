"use client";

import { toast } from "sonner";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useBulkDeleteTools = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.tools.deleteMany.mutationOptions({
      onSuccess: (data) => {
        queryClient.invalidateQueries(trpc.tools.getMany.queryOptions({}));
        queryClient.invalidateQueries(trpc.tools.getStats.queryOptions());
        toast.success(`${data.deletedCount} ferramenta(s) removida(s)`);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );
};
