import { useTRPC } from "@/trpc/client";
import { keepPreviousData, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useToolsParams } from "@/modules/dashboard/hooks/use-tools-params";

export const useSuspenseTool = (id: string) => {
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.tools.getOne.queryOptions({ id }));
};

const buildToolsInput = (params: ReturnType<typeof useToolsParams>[0]) => {
  const { view: _view, categoryId, ...rest } = params;
  return { ...rest, categoryId: categoryId || undefined };
};

export const useSuspenseTools = () => {
  const trpc = useTRPC();
  const [params] = useToolsParams();
  return useSuspenseQuery(trpc.tools.getMany.queryOptions(buildToolsInput(params)));
};

export const useToolsQuery = () => {
  const trpc = useTRPC();
  const [params] = useToolsParams();
  return useQuery({
    ...trpc.tools.getMany.queryOptions(buildToolsInput(params)),
    placeholderData: keepPreviousData,
  });
};

export const useSuspenseToolsStats = () => {
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.tools.getStats.queryOptions());
};
