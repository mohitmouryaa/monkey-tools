import { parseAsInteger, parseAsString, parseAsStringEnum } from "nuqs/server";
import { PostStatus } from "@workspace/types";
import { PAGINATION } from "@/modules/common/constants";

export const postsParams = {
  page: parseAsInteger.withDefault(PAGINATION.DEFAULT_PAGE).withOptions({ clearOnDefault: true }),
  pageSize: parseAsInteger.withDefault(PAGINATION.DEFAULT_PAGE_SIZE).withOptions({ clearOnDefault: true }),
  search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
  status: parseAsStringEnum<PostStatus>(Object.values(PostStatus)).withOptions({ clearOnDefault: true }),
};
