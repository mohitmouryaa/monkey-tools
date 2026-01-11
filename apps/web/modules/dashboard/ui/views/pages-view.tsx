"use client";

import { PagesHeader } from "../components/pages-header";
import { PagesContainer } from "../components/pages-container";
import { usePages } from "../../hooks/use-pages";
import { Skeleton } from "@workspace/ui/components/skeleton";

export const PagesView = () => {
  const { data: pages, isLoading } = usePages();

  return (
    <div className="container mx-auto p-6 space-y-6">
      <PagesHeader />

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      ) : pages ? (
        <PagesContainer pages={pages} />
      ) : (
        <div className="text-center py-12 text-muted-foreground">No pages found</div>
      )}
    </div>
  );
};
