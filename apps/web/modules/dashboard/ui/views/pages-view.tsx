"use client";

import { usePagesParams } from "@/modules/dashboard/hooks/use-pages-params";
import { usePagesQuery } from "@/modules/dashboard/hooks/use-suspense-pages";
import { PagesCustomList } from "@/modules/dashboard/ui/components/pages-custom-list";
import { PagesFixedList } from "@/modules/dashboard/ui/components/pages-fixed-list";
import { PagesListSkeleton } from "@/modules/dashboard/ui/components/pages-list-skeleton";

export const PagesView = () => {
  const [params] = usePagesParams();
  const pagesQuery = usePagesQuery();

  if (params.tab === "fixed") {
    return <PagesFixedList />;
  }

  if (pagesQuery.isPending) {
    return <PagesListSkeleton />;
  }

  const items = pagesQuery.data?.items ?? [];

  return <PagesCustomList items={items} />;
};
