import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useSuspenseOverview = () => {
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.dashboard.overview.queryOptions(undefined, { staleTime: 30_000 }));
};
