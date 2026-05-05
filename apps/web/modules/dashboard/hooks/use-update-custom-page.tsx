"use client";

import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateCustomPage = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.pages.updateCustomPage.mutationOptions({
      onSuccess: (data) => {
        toast.success(`Página "${data.title || data.slug}" atualizada com sucesso`);
        queryClient.invalidateQueries(trpc.pages.getAll.queryOptions());
        // Invalidate all getById queries
        queryClient.invalidateQueries({ queryKey: ["pages", "getById"] });
      },
      onError: (error) => {
        toast.error(error.message || "Falha ao atualizar página personalizada");
      },
    }),
  );
};
