import { createLoader } from "nuqs/server";
import { postsParams } from "@/modules/dashboard/posts/posts-params";

export const postsParamsLoader = createLoader(postsParams);
