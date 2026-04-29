import { toast } from "sonner";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateTool = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.tools.create.mutationOptions({
      onSuccess: (data) => {
        toast.success(`Ferramenta "${data.title}" criada`);
        queryClient.invalidateQueries(trpc.tools.getMany.queryOptions({}));
      },
      onError: (error) => {
        toast.error(`Falha ao criar ferramenta: ${error.message}`);
      },
    }),
  );
};
