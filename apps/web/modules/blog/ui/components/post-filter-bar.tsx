"use client";

import { useEffect, useState } from "react";
import { useQueryStates } from "nuqs";
import { SearchIcon } from "lucide-react";
import { Input } from "@workspace/ui/components/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import { blogParams } from "@/modules/blog/blog-params";
import { PAGINATION } from "@/modules/common/constants";

const DEBOUNCE_MS = 500;

interface PostFilterBarTool {
  _id: string;
  title: string;
}

interface PostFilterBarProps {
  tools: PostFilterBarTool[];
}

export const PostFilterBar = ({ tools }: PostFilterBarProps) => {
  const [params, setParams] = useQueryStates(blogParams);
  const [localSearch, setLocalSearch] = useState(params.q ?? "");

  useEffect(() => {
    if (localSearch === "" && params.q !== "") {
      setParams({ ...params, q: "", page: PAGINATION.DEFAULT_PAGE });
      return;
    }
    const t = setTimeout(() => {
      if (localSearch !== params.q) {
        setParams({ ...params, q: localSearch, page: PAGINATION.DEFAULT_PAGE });
      }
    }, DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [localSearch, params, setParams]);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <SearchIcon className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          placeholder="Buscar artigos..."
          className="pl-8"
        />
      </div>
      <Select
        value={params.tool ?? "all"}
        onValueChange={(value) => setParams({ ...params, tool: value === "all" ? null : value, page: PAGINATION.DEFAULT_PAGE })}
      >
        <SelectTrigger className="sm:w-64">
          <SelectValue placeholder="Todas as ferramentas" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas as ferramentas</SelectItem>
          {tools.map((tool) => (
            <SelectItem key={tool._id} value={tool._id}>
              {tool.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
