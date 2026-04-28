"use client";

import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useDeleteCustomPage = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    trpc.pages.deleteCustomPage.mutationOptions({
      onSuccess: (data) => {
        toast.success(data.message);
        queryClient.invalidateQueries(trpc.pages.getAll.queryOptions());
        router.push("/dashboard/pages");
      },
      onError: (error) => {
        toast.error(error.message || "Falha ao excluir página personalizada");
      },
    }),
  );
};
