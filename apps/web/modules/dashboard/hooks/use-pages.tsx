"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export const usePages = () => {
  const trpc = useTRPC();
  return useQuery(trpc.pages.getAll.queryOptions());
};
