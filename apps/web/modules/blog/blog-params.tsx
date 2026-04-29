import { parseAsInteger, parseAsString } from "nuqs/server";
import { PAGINATION } from "@/modules/common/constants";

export const blogParams = {
  page: parseAsInteger.withDefault(PAGINATION.DEFAULT_PAGE).withOptions({ clearOnDefault: true }),
  pageSize: parseAsInteger.withDefault(PAGINATION.DEFAULT_PAGE_SIZE).withOptions({ clearOnDefault: true }),
  q: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
  tool: parseAsString.withOptions({ clearOnDefault: true }),
};
