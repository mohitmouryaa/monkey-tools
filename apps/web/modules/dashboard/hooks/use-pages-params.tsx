import { useQueryStates } from "nuqs";
import { pagesParams } from "@/modules/dashboard/pages-params";

export const usePagesParams = () => {
  return useQueryStates(pagesParams);
};
