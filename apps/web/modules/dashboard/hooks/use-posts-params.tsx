import { useQueryStates } from "nuqs";
import { postsParams } from "@/modules/dashboard/posts/posts-params";

export const usePostsParams = () => {
  return useQueryStates(postsParams);
};
