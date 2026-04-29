"use client";

import { useEffect, useState } from "react";
import { SearchIcon } from "lucide-react";
import { Input } from "@workspace/ui/components/input";
import { PAGINATION } from "@/modules/common/constants";
import { usePagesParams } from "@/modules/dashboard/hooks/use-pages-params";

const DEBOUNCE_MS = 400;

export const PagesSearch = () => {
  const [params, setParams] = usePagesParams();
  const [localSearch, setLocalSearch] = useState(params.search ?? "");

  useEffect(() => {
    if (localSearch === "" && params.search !== "") {
      setParams({ ...params, search: "", page: PAGINATION.DEFAULT_PAGE });
      return;
    }
    const timer = setTimeout(() => {
      if (localSearch !== params.search) {
        setParams({ ...params, search: localSearch, page: PAGINATION.DEFAULT_PAGE });
      }
    }, DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [localSearch, params, setParams]);

  useEffect(() => {
    setLocalSearch(params.search ?? "");
  }, [params.search]);

  return (
    <div className="relative">
      <SearchIcon className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        placeholder="Buscar por título ou slug"
        className="py-5 pl-8 shadow-none max-w-72 bg-background border-border"
      />
    </div>
  );
};
