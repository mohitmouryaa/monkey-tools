"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export const useHomepage = () => {
  const trpc = useTRPC();
  return useQuery(trpc.pages.getHomepage.queryOptions());
};
