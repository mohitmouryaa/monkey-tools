import { useTRPC } from "@/trpc/client";
import { keepPreviousData, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { PageType } from "@workspace/types";
import { usePagesParams } from "@/modules/dashboard/hooks/use-pages-params";

export const useSuspenseTool = (id: string) => {
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.tools.getOne.queryOptions({ id }));
};

export const useSuspensePages = () => {
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.pages.getAll.queryOptions());
};

export const usePagesQuery = () => {
  const trpc = useTRPC();
  const [params] = usePagesParams();
  const pageType = params.tab === "custom" ? [PageType.CUSTOM, PageType.COMPARISON] : undefined;

  return useQuery(
    trpc.pages.getMany.queryOptions(
      {
        page: params.page,
        pageSize: params.pageSize,
        search: params.search,
        pageType,
      },
      { placeholderData: keepPreviousData },
    ),
  );
};
