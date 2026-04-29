"use client";

import Link from "next/link";
import {
  AlertTriangleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  Loader2Icon,
  MoreVerticalIcon,
  PackageOpenIcon,
  PlusIcon,
  SearchIcon,
  TrashIcon,
} from "lucide-react";

import { cn } from "@workspace/ui/lib/utils";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Card, CardContent, CardDescription, CardTitle } from "@workspace/ui/components/card";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@workspace/ui/components/empty";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@workspace/ui/components/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";

type PostsHeaderProps = {
  title: string;
  description?: string;
  newButtonLabel?: string;
  disabled?: boolean;
  isCreating?: boolean;
} & ({ onNew: () => void; newButtonHref?: never } | { newButtonHref?: string; onNew?: never });

export const PostsHeader = (props: PostsHeaderProps) => {
  const { title, description, newButtonLabel, disabled, isCreating, onNew, newButtonHref } = props;

  return (
    <div className="flex flex-col gap-6 pb-6 border-b border-border sm:flex-row sm:items-center sm:justify-between sm:pb-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{title}</h1>
        {description && <p className="text-base text-muted-foreground">{description}</p>}
      </div>
      <div className="shrink-0">
        {onNew && !newButtonHref && (
          <Button onClick={onNew} disabled={disabled || isCreating} className="w-full sm:w-auto">
            <PlusIcon className="size-4" />
            {newButtonLabel}
          </Button>
        )}
        {newButtonHref && !onNew && (
          <Button asChild className="w-full sm:w-auto">
            <Link href={newButtonHref}>
              <PlusIcon className="size-4" />
              {newButtonLabel}
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

interface PostsSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const PostsSearchInput = ({ value, onChange, placeholder }: PostsSearchInputProps) => {
  return (
    <div className="relative">
      <SearchIcon className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="py-5 pl-8 shadow-none max-w-72 bg-background border-border"
      />
    </div>
  );
};

interface PostsPaginationBarProps {
  page: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  pageSizeOptions?: number[];
  disabled?: boolean;
}

const buildPageTokens = (page: number, totalPages: number): Array<number | "ellipsis-start" | "ellipsis-end"> => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const tokens: Array<number | "ellipsis-start" | "ellipsis-end"> = [1];
  const start = Math.max(2, page - 1);
  const end = Math.min(totalPages - 1, page + 1);
  if (start > 2) tokens.push("ellipsis-start");
  for (let i = start; i <= end; i++) tokens.push(i);
  if (end < totalPages - 1) tokens.push("ellipsis-end");
  tokens.push(totalPages);
  return tokens;
};

export const PostsPaginationBar = ({
  page,
  pageSize,
  totalPages,
  totalCount,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50],
  disabled,
}: PostsPaginationBarProps) => {
  if (totalCount === 0) return null;

  const safeTotalPages = Math.max(1, totalPages);
  const rangeStart = (page - 1) * pageSize + 1;
  const rangeEnd = Math.min(page * pageSize, totalCount);
  const tokens = buildPageTokens(page, safeTotalPages);
  const isFirst = page <= 1;
  const isLast = page >= safeTotalPages;

  return (
    <div className="flex flex-col items-stretch w-full gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        Mostrando <span className="font-medium text-foreground">{rangeStart}</span>
        {rangeEnd > rangeStart && (
          <>
            {" "}–{" "}
            <span className="font-medium text-foreground">{rangeEnd}</span>
          </>
        )}{" "}
        de <span className="font-medium text-foreground">{totalCount}</span>{" "}
        {totalCount === 1 ? "post" : "posts"}
      </p>

      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
        {!!onPageSizeChange && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground whitespace-nowrap">Itens por página</span>
            <Select
              value={String(pageSize)}
              onValueChange={(value) => onPageSizeChange(Number(value))}
              disabled={disabled}
            >
              <SelectTrigger className="h-8 w-[72px]" size="sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="end">
                {pageSizeOptions.map((option) => (
                  <SelectItem key={option} value={String(option)}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <nav aria-label="Paginação" className="flex items-center gap-1">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-8"
            disabled={isFirst || disabled}
            onClick={() => onPageChange(1)}
            aria-label="Primeira página"
          >
            <ChevronsLeftIcon className="size-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-8"
            disabled={isFirst || disabled}
            onClick={() => onPageChange(Math.max(1, page - 1))}
            aria-label="Página anterior"
          >
            <ChevronLeftIcon className="size-4" />
          </Button>

          {tokens.map((token) =>
            token === "ellipsis-start" || token === "ellipsis-end" ? (
              <span
                key={token}
                aria-hidden
                className="flex items-center justify-center size-8 text-sm text-muted-foreground"
              >
                …
              </span>
            ) : (
              <Button
                key={token}
                type="button"
                variant={token === page ? "default" : "outline"}
                size="icon"
                className={cn("size-8 text-sm font-medium", token === page && "pointer-events-none")}
                disabled={disabled}
                onClick={() => onPageChange(token)}
                aria-current={token === page ? "page" : undefined}
                aria-label={`Página ${token}`}
              >
                {token}
              </Button>
            ),
          )}

          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-8"
            disabled={isLast || disabled}
            onClick={() => onPageChange(Math.min(safeTotalPages, page + 1))}
            aria-label="Próxima página"
          >
            <ChevronRightIcon className="size-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-8"
            disabled={isLast || disabled}
            onClick={() => onPageChange(safeTotalPages)}
            aria-label="Última página"
          >
            <ChevronsRightIcon className="size-4" />
          </Button>
        </nav>
      </div>
    </div>
  );
};

interface PostsLoadingViewProps {
  message?: string;
}

export const PostsLoadingView = ({ message }: PostsLoadingViewProps) => {
  return (
    <div className="flex flex-col items-center justify-center flex-1 h-full gap-y-4">
      <Loader2Icon className="animate-spin size-6 text-primary" />
      {!!message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  );
};

interface PostsErrorViewProps {
  message?: string;
}

export const PostsErrorView = ({ message }: PostsErrorViewProps) => {
  return (
    <div className="flex flex-col items-center justify-center flex-1 h-full gap-y-4">
      <AlertTriangleIcon className="size-6 text-primary" />
      {!!message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  );
};

interface PostsEmptyProps {
  message?: string;
  onNew?: () => void;
}

export const PostsEmpty = ({ message, onNew }: PostsEmptyProps) => {
  return (
    <Empty className="border border-dashed bg-background">
      <EmptyHeader>
        <EmptyMedia variant={"icon"}>
          <PackageOpenIcon />
        </EmptyMedia>
      </EmptyHeader>
      <EmptyTitle>Nenhum post</EmptyTitle>
      {!!message && <EmptyDescription>{message}</EmptyDescription>}
      {!!onNew && (
        <EmptyContent>
          <Button onClick={onNew}>Adicionar post</Button>
        </EmptyContent>
      )}
    </Empty>
  );
};

interface PostsListProps<T> {
  items: T[];
  className?: string;
  emptyView?: React.ReactNode;
  renderItem: (item: T, index: number) => React.ReactNode;
  getKey?: (item: T, index: number) => string | number;
}

export function PostsList<T>({ items, emptyView, className = "", renderItem, getKey }: PostsListProps<T>) {
  if (items.length === 0 && emptyView) {
    return (
      <div className="flex items-center justify-center flex-1">
        <div className="max-w-md mx-auto">{emptyView}</div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-y-4", className)}>
      {items.map((item, index) => (
        <div key={getKey ? getKey(item, index) : index}>{renderItem(item, index)}</div>
      ))}
    </div>
  );
}

interface PostsListItemProps {
  href: string;
  title: string;
  subtitle?: React.ReactNode;
  image?: React.ReactNode;
  actions?: React.ReactNode;
  isRemoving?: boolean;
  className?: string;
  onRemove?: () => void | Promise<void>;
}

export const PostsListItem = (props: PostsListItemProps) => {
  const { href, title, subtitle, image, actions, isRemoving, className = "", onRemove } = props;

  const handleRemove = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isRemoving) return;

    if (onRemove) {
      await onRemove();
    }
  };

  return (
    <Link href={href} prefetch>
      <Card
        className={cn("p-4 shadow-none hover:shadow cursor-pointer", isRemoving && "opacity-50 cursor-not-allowed", className)}
      >
        <CardContent className="flex flex-row items-center justify-between p-0">
          <div className="flex items-center gap-3">
            {image}
            <div>
              <CardTitle className="text-base font-medium">{title}</CardTitle>
              {!!subtitle && <CardDescription className="text-sm">{subtitle}</CardDescription>}
            </div>
          </div>
          {(!!actions || !!onRemove) && (
            <div className="flex items-center gap-x-4">
              {actions}
              {onRemove && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant={"ghost"} onClick={(e) => e.stopPropagation()}>
                      <MoreVerticalIcon className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleRemove}>
                      <TrashIcon className="size-4" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};
