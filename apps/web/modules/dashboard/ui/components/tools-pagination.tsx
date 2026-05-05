"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { useToolsParams } from "@/modules/dashboard/hooks/use-tools-params";
import { useToolsQuery } from "@/modules/dashboard/hooks/use-suspense-tools";

const PAGE_SIZES = [10, 20, 50, 100];

export const ToolsPagination = () => {
  const tools = useToolsQuery();
  const [params, setParams] = useToolsParams();

  const page = tools.data?.page ?? params.page;
  const totalPages = tools.data?.totalPages ?? 0;
  const totalCount = tools.data?.totalCount ?? 0;
  const pageSize = tools.data?.pageSize ?? params.pageSize;

  const start = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalCount);
  const isBusy = tools.isFetching;

  return (
    <div className="flex flex-col items-start justify-between gap-3 border-t border-border pt-4 sm:flex-row sm:items-center">
      <div className="text-sm text-muted-foreground">
        {totalCount === 0 ? (
          "Nenhum resultado"
        ) : (
          <>
            Mostrando <span className="font-medium text-foreground">{start}</span>–
            <span className="font-medium text-foreground">{end}</span> de{" "}
            <span className="font-medium text-foreground">{totalCount}</span>
          </>
        )}
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Por página</span>
          <Select
            value={String(pageSize)}
            onValueChange={(value) => setParams({ ...params, pageSize: Number(value), page: 1 })}
          >
            <SelectTrigger className="h-8 w-[80px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PAGE_SIZES.map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            disabled={page <= 1 || isBusy}
            onClick={() => setParams({ ...params, page: Math.max(1, page - 1) })}
            aria-label="Página anterior"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <span className="text-sm text-muted-foreground tabular-nums px-2">
            {page} / {totalPages || 1}
          </span>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            disabled={page >= totalPages || totalPages === 0 || isBusy}
            onClick={() => setParams({ ...params, page: Math.min(totalPages || 1, page + 1) })}
            aria-label="Próxima página"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
