import { toast } from "sonner";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";

export const useCreateJob = () => {
  const trpc = useTRPC();

  return useMutation(
    trpc.jobs.create.mutationOptions({
      onSuccess: () => {
        toast.success("Job created successfully");
      },
      onError: (error) => {
        toast.error(`Failed to create job: ${error.message}`);
      },
    }),
  );
};
