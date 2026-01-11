"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export const usePageById = (id: string) => {
  const trpc = useTRPC();
  return useQuery(trpc.pages.getById.queryOptions({ id }, { enabled: !!id }));
};
