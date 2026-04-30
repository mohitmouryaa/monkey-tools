import Link from "next/link";
import { Button } from "@workspace/ui/components/button";

interface BlogPaginationProps {
  page: number;
  totalPages: number;
  q?: string;
  tool?: string;
}

const buildHref = (page: number, q?: string, tool?: string) => {
  const params = new URLSearchParams();
  if (page > 1) params.set("page", String(page));
  if (q) params.set("q", q);
  if (tool) params.set("tool", tool);
  const qs = params.toString();
  return qs ? `/blog?${qs}` : "/blog";
};

export const BlogPagination = ({ page, totalPages, q, tool }: BlogPaginationProps) => {
  if (totalPages <= 1) return null;

  const previousDisabled = page === 1;
  const nextDisabled = page === totalPages;

  return (
    <div className="flex items-center justify-between w-full gap-x-2 mt-8">
      <div className="flex-1 text-sm text-muted-foreground">
        Página {page} de {totalPages}
      </div>
      <div className="flex items-center justify-end space-x-2">
        {previousDisabled ? (
          <Button disabled variant="outline" size="sm">
            Anterior
          </Button>
        ) : (
          <Button asChild variant="outline" size="sm">
            <Link href={buildHref(page - 1, q, tool)} prefetch={false} rel="prev">
              Anterior
            </Link>
          </Button>
        )}
        {nextDisabled ? (
          <Button disabled variant="outline" size="sm">
            Próximo
          </Button>
        ) : (
          <Button asChild variant="outline" size="sm">
            <Link href={buildHref(page + 1, q, tool)} prefetch={false} rel="next">
              Próximo
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};
