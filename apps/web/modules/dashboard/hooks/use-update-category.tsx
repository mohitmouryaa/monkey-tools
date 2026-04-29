import { toast } from "sonner";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateCategory = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.categories.update.mutationOptions({
      onSuccess: (data) => {
        toast.success(`Categoria "${data.category.name}" atualizada`);
        queryClient.invalidateQueries(trpc.categories.getMany.queryOptions({}));
        queryClient.invalidateQueries(trpc.categories.getOne.queryOptions({ id: data.category._id }));
      },
      onError: (error) => {
        toast.error(`Falha ao atualizar categoria: ${error.message}`);
      },
    }),
  );
};
