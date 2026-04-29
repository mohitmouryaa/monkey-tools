import { useQueryStates } from "nuqs";
import { scriptsParams } from "@/modules/dashboard/scripts-params";

export const useScriptsParams = () => {
  return useQueryStates(scriptsParams);
};
