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
        toast.success(`Página inicial "${data.title || data.slug}" atualizada com sucesso`);
        queryClient.invalidateQueries(trpc.pages.getHomepage.queryOptions());
      },
      onError: (error) => {
        toast.error(error.message || "Falha ao atualizar página inicial");
      },
    }),
  );
};
