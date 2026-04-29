"use client";

import Link from "next/link";
import { AlertTriangleIcon, Loader2Icon, MoreVerticalIcon, PackageOpenIcon, PlusIcon, SearchIcon, TrashIcon } from "lucide-react";

import { cn } from "@workspace/ui/lib/utils";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Card, CardContent, CardDescription, CardTitle } from "@workspace/ui/components/card";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@workspace/ui/components/empty";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@workspace/ui/components/dropdown-menu";

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

interface PostsContainerProps {
  header?: React.ReactNode;
  search?: React.ReactNode;
  pagination?: React.ReactNode;
  children: React.ReactNode;
}

export const PostsContainer = ({ header, search, pagination, children }: PostsContainerProps) => {
  return (
    <div className="h-full px-4 py-6 md:px-8 md:py-8">
      <div className="flex flex-col w-full h-full mx-auto max-w-7xl gap-y-6">
        {header}
        <div className="flex flex-col h-full gap-y-4">
          {search}
          {children}
        </div>
        {pagination}
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
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

export const PostsPaginationBar = ({ page, totalPages, onPageChange, disabled }: PostsPaginationBarProps) => {
  return (
    <div className="flex items-center justify-between w-full gap-x-2">
      <div className="flex-1 text-sm text-muted-foreground">
        Page {page} of {totalPages || 1}
      </div>
      <div className="flex items-center justify-end py-4 space-x-2">
        <Button
          disabled={page === 1 || disabled}
          variant={"outline"}
          size={"sm"}
          onClick={() => {
            onPageChange(Math.max(1, page - 1));
          }}
        >
          Previous
        </Button>
        <Button
          disabled={page === totalPages || totalPages === 0 || disabled}
          variant={"outline"}
          size={"sm"}
          onClick={() => {
            onPageChange(Math.min(totalPages || 1, page + 1));
          }}
        >
          Next
        </Button>
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
      <EmptyTitle>No posts</EmptyTitle>
      {!!message && <EmptyDescription>{message}</EmptyDescription>}
      {!!onNew && (
        <EmptyContent>
          <Button onClick={onNew}>Add post</Button>
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
                      Delete
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
