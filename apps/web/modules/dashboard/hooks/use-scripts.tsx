import { toast } from "sonner";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateGlobalScript = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.globalScripts.create.mutationOptions({
      onSuccess: (data) => {
        toast.success(`Script "${data.name}" criado`);
        queryClient.invalidateQueries(trpc.globalScripts.getMany.queryOptions({}));
      },
      onError: (error) => {
        toast.error(`Falha ao criar script: ${error.message}`);
      },
    }),
  );
};

export const useUpdateGlobalScript = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.globalScripts.update.mutationOptions({
      onSuccess: (data) => {
        toast.success(`Script "${data.name}" atualizado`);
        queryClient.invalidateQueries(trpc.globalScripts.getMany.queryOptions({}));
        queryClient.invalidateQueries(trpc.globalScripts.getById.queryOptions({ id: data._id }));
      },
      onError: (error) => {
        toast.error(`Falha ao atualizar script: ${error.message}`);
      },
    }),
  );
};

export const useDeleteGlobalScript = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.globalScripts.delete.mutationOptions({
      onSuccess: () => {
        toast.success("Script excluído");
        queryClient.invalidateQueries(trpc.globalScripts.getMany.queryOptions({}));
      },
      onError: (error) => {
        toast.error(error.message || "Falha ao excluir script");
      },
    }),
  );
};
