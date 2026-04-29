"use client";

import { LayoutGrid, List, SearchIcon } from "lucide-react";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { useEntitySearch } from "@/modules/common/hooks/use-entity-search";
import { useToolsParams } from "@/modules/dashboard/hooks/use-tools-params";
import { useCategoriesForFilter } from "@/modules/dashboard/hooks/use-categories-for-filter";
import type { ToolsSort, ToolsStatus, ToolsView } from "@/modules/dashboard/tool-params";

const SORT_LABELS: Record<ToolsSort, string> = {
  "createdAt-desc": "Mais recentes",
  "createdAt-asc": "Mais antigas",
  "title-asc": "Título A-Z",
  "title-desc": "Título Z-A",
  "updatedAt-desc": "Atualizadas recentemente",
};

const STATUS_LABELS: Record<ToolsStatus, string> = {
  all: "Todos os status",
  active: "Ativas",
  inactive: "Inativas",
};

export const ToolsFilterBar = () => {
  const [params, setParams] = useToolsParams();
  const { searchValue, onSearchChange } = useEntitySearch({ params, setParams });
  const { data: categoriesData } = useCategoriesForFilter();
  const categories = categoriesData?.items ?? [];

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
        <div className="relative w-full sm:max-w-xs">
          <SearchIcon className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar ferramentas..."
            className="pl-9"
          />
        </div>
        <Select
          value={params.categoryId || "__all__"}
          onValueChange={(value) =>
            setParams({ ...params, categoryId: value === "__all__" ? "" : value, page: 1 })
          }
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__all__">Todas categorias</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category._id as string} value={category._id as string}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={params.status}
          onValueChange={(value) => setParams({ ...params, status: value as ToolsStatus, page: 1 })}
        >
          <SelectTrigger className="w-full sm:w-[150px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {(Object.keys(STATUS_LABELS) as ToolsStatus[]).map((status) => (
              <SelectItem key={status} value={status}>
                {STATUS_LABELS[status]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={params.sort}
          onValueChange={(value) => setParams({ ...params, sort: value as ToolsSort, page: 1 })}
        >
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {(Object.keys(SORT_LABELS) as ToolsSort[]).map((sort) => (
              <SelectItem key={sort} value={sort}>
                {SORT_LABELS[sort]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="inline-flex rounded-md border border-input p-0.5">
        <Button
          type="button"
          variant={params.view === "table" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setParams({ ...params, view: "table" satisfies ToolsView })}
          aria-pressed={params.view === "table"}
          aria-label="Visualizar como tabela"
          className="h-7 px-2"
        >
          <List className="size-4" />
        </Button>
        <Button
          type="button"
          variant={params.view === "grid" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setParams({ ...params, view: "grid" satisfies ToolsView })}
          aria-pressed={params.view === "grid"}
          aria-label="Visualizar como grid"
          className="h-7 px-2"
        >
          <LayoutGrid className="size-4" />
        </Button>
      </div>
    </div>
  );
};
