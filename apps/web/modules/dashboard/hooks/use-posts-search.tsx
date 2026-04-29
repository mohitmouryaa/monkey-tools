"use client";

import { useEffect, useState } from "react";
import { PAGINATION } from "@/modules/common/constants";
import { usePostsParams } from "@/modules/dashboard/hooks/use-posts-params";

const DEBOUNCE_MS = 500;

export const usePostsSearch = () => {
  const [params, setParams] = usePostsParams();
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

  return { searchValue: localSearch, onSearchChange: setLocalSearch };
};
