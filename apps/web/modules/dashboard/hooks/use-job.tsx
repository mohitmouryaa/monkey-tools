import { useTRPC } from "@/trpc/client";
import { useQuery, skipToken } from "@tanstack/react-query";
import { Status } from "@workspace/types";

export const useJob = (jobId: string | null) => {
  const trpc = useTRPC();

  return useQuery(
    trpc.jobs.getById.queryOptions(jobId ? { jobId } : skipToken, {
      refetchInterval: ({ state }) => {
        // Stop polling if job is completed or failed
        if (state.data?.status === Status.COMPLETED || state.data?.status === Status.FAILED) {
          return false;
        }
        // Poll every 3 seconds while processing
        return 3000;
      },
    }),
  );
};
