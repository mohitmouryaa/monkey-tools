import { toast } from "sonner";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateTool = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.tools.update.mutationOptions({
      onSuccess: (data) => {
        toast.success(`Ferramenta "${data.title}" atualizada`);
        queryClient.invalidateQueries(trpc.tools.getMany.queryOptions({}));
        queryClient.invalidateQueries(trpc.tools.getOne.queryOptions({ id: data._id }));
      },
      onError: (error) => {
        toast.error(`Falha ao atualizar ferramenta: ${error.message}`);
      },
    }),
  );
};
