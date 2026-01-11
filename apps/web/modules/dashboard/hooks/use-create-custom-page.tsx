"use client";

import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useCreateCustomPage = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    trpc.pages.createCustomPage.mutationOptions({
      onSuccess: (data) => {
        toast.success(`Page "${data.title || data.slug}" created successfully`);
        queryClient.invalidateQueries(trpc.pages.getAll.queryOptions());
        router.push("/dashboard/pages");
      },
      onError: (error) => {
        toast.error(error.message || "Failed to create custom page");
      },
    }),
  );
};
