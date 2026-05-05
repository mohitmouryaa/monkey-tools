import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export const useCategoriesForFilter = () => {
  const trpc = useTRPC();
  return useQuery(
    trpc.categories.getMany.queryOptions({
      page: 1,
      pageSize: 100,
      search: "",
    }),
  );
};
