"use client";

import { useQueryStates } from "nuqs";
import { Button } from "@workspace/ui/components/button";
import { blogParams } from "@/modules/blog/blog-params";

interface BlogPaginationProps {
  page: number;
  totalPages: number;
}

export const BlogPagination = ({ page, totalPages }: BlogPaginationProps) => {
  const [, setParams] = useQueryStates(blogParams);

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between w-full gap-x-2 mt-8">
      <div className="flex-1 text-sm text-muted-foreground">
        Página {page} de {totalPages}
      </div>
      <div className="flex items-center justify-end space-x-2">
        <Button
          disabled={page === 1}
          variant="outline"
          size="sm"
          onClick={() => setParams((p) => ({ ...p, page: Math.max(1, page - 1) }))}
        >
          Anterior
        </Button>
        <Button
          disabled={page === totalPages}
          variant="outline"
          size="sm"
          onClick={() => setParams((p) => ({ ...p, page: Math.min(totalPages, page + 1) }))}
        >
          Próximo
        </Button>
      </div>
    </div>
  );
};
