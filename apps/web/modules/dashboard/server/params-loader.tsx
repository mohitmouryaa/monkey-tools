import { createLoader } from "nuqs/server";
import { toolsParams } from "@/modules/dashboard/tool-params";
import { categoriesParams } from "@/modules/dashboard/category-params";
import { scriptsParams } from "@/modules/dashboard/scripts-params";
import { pagesParams } from "@/modules/dashboard/pages-params";

export const toolsParamsLoader = createLoader(toolsParams);
export const categoriesParamsLoader = createLoader(categoriesParams);
export const scriptsParamsLoader = createLoader(scriptsParams);
export const pagesParamsLoader = createLoader(pagesParams);
