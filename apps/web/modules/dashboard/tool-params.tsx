import { PAGINATION } from "@/modules/common/constants";
import { parseAsInteger, parseAsString, parseAsStringEnum } from "nuqs/server";

export const TOOLS_SORT_OPTIONS = [
  "createdAt-desc",
  "createdAt-asc",
  "title-asc",
  "title-desc",
  "updatedAt-desc",
] as const;
export type ToolsSort = (typeof TOOLS_SORT_OPTIONS)[number];

export const TOOLS_VIEW_OPTIONS = ["table", "grid"] as const;
export type ToolsView = (typeof TOOLS_VIEW_OPTIONS)[number];

export const TOOLS_STATUS_OPTIONS = ["all", "active", "inactive"] as const;
export type ToolsStatus = (typeof TOOLS_STATUS_OPTIONS)[number];

export const toolsParams = {
  page: parseAsInteger.withDefault(PAGINATION.DEFAULT_PAGE).withOptions({
    clearOnDefault: true,
  }),
  pageSize: parseAsInteger.withDefault(PAGINATION.DEFAULT_PAGE_SIZE).withOptions({
    clearOnDefault: true,
  }),
  search: parseAsString.withDefault("").withOptions({
    clearOnDefault: true,
  }),
  categoryId: parseAsString.withDefault("").withOptions({
    clearOnDefault: true,
  }),
  sort: parseAsStringEnum<ToolsSort>([...TOOLS_SORT_OPTIONS])
    .withDefault("createdAt-desc")
    .withOptions({ clearOnDefault: true }),
  view: parseAsStringEnum<ToolsView>([...TOOLS_VIEW_OPTIONS])
    .withDefault("table")
    .withOptions({ clearOnDefault: true }),
  status: parseAsStringEnum<ToolsStatus>([...TOOLS_STATUS_OPTIONS])
    .withDefault("all")
    .withOptions({ clearOnDefault: true }),
};
