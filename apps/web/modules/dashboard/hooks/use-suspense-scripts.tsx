import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useScriptsParams } from "@/modules/dashboard/hooks/use-scripts-params";

export const useSuspenseScripts = () => {
  const trpc = useTRPC();
  const [params] = useScriptsParams();
  return useSuspenseQuery(
    trpc.globalScripts.getMany.queryOptions({
      page: params.page,
      pageSize: params.pageSize,
      search: params.search,
      location: params.location ?? undefined,
    }),
  );
};

export const useSuspenseScript = ({ id }: { id: string }) => {
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.globalScripts.getById.queryOptions({ id }));
};
