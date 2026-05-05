import { parseAsInteger, parseAsString, parseAsStringEnum } from "nuqs/server";
import { PAGINATION } from "@/modules/common/constants";

export const PAGES_TAB_OPTIONS = ["custom", "fixed"] as const;
export type PagesTab = (typeof PAGES_TAB_OPTIONS)[number];

export const pagesParams = {
  tab: parseAsStringEnum<PagesTab>([...PAGES_TAB_OPTIONS])
    .withDefault("custom")
    .withOptions({ clearOnDefault: true }),
  page: parseAsInteger.withDefault(PAGINATION.DEFAULT_PAGE).withOptions({
    clearOnDefault: true,
  }),
  pageSize: parseAsInteger.withDefault(PAGINATION.DEFAULT_PAGE_SIZE).withOptions({
    clearOnDefault: true,
  }),
  search: parseAsString.withDefault("").withOptions({
    clearOnDefault: true,
  }),
};
