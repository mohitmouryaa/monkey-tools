import { toast } from "sonner";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";

export const useCreateJob = () => {
  const trpc = useTRPC();

  return useMutation(
    trpc.jobs.create.mutationOptions({
      onSuccess: () => {
        toast.success("Trabalho criado com sucesso");
      },
      onError: (error) => {
        toast.error(`Falha ao criar trabalho: ${error.message}`);
      },
    }),
  );
};
