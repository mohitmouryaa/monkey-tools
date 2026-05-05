"use client";

import Link from "next/link";
import { useState } from "react";
import { Folder, MoreVerticalIcon, PencilIcon, TrashIcon, Wrench } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import { cn } from "@workspace/ui/lib/utils";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";

const HEX_RE = /^#[0-9a-fA-F]{6}$/;

export interface CategoryCardData {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
  isActive?: boolean;
  toolsCount?: number;
}

interface CategoryCardProps {
  data: CategoryCardData;
  onRemove?: () => void;
  isRemoving?: boolean;
}

export const CategoryCard = ({ data, onRemove, isRemoving }: CategoryCardProps) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const safeColor = HEX_RE.test(data.color || "") ? (data.color as string) : "#6366f1";
  const editHref = `/dashboard/categories/${data._id}`;
  const toolsCount = data.toolsCount ?? 0;

  const handleConfirm = () => {
    setConfirmOpen(false);
    onRemove?.();
  };

  return (
    <>
      <Link
        href={editHref}
        prefetch
        className={cn(
          "group relative flex flex-col p-5 transition-all border rounded-xl border-border/60 bg-card",
          "hover:shadow-md hover:border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          isRemoving && "opacity-50 pointer-events-none",
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div
            className="flex items-center justify-center transition-all rounded-lg size-12 shrink-0 ring-1 ring-inset ring-border/40"
            style={{ backgroundColor: `${safeColor}1a` }}
          >
            <DynamicIcon
              name={(data.icon || "folder") as IconName}
              className="size-6"
              style={{ color: safeColor }}
              fallback={() => <Folder className="size-6" style={{ color: safeColor }} />}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="size-8 shrink-0 opacity-0 transition-opacity group-hover:opacity-100 data-[state=open]:opacity-100"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                aria-label="Ações da categoria"
              >
                <MoreVerticalIcon className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
              <DropdownMenuItem asChild>
                <Link href={editHref}>
                  <PencilIcon className="size-4" />
                  Editar
                </Link>
              </DropdownMenuItem>
              {onRemove && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={(e) => {
                      e.preventDefault();
                      setConfirmOpen(true);
                    }}
                  >
                    <TrashIcon className="size-4" />
                    Excluir
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex flex-col flex-1 mt-4 space-y-1.5">
          <h3 className="text-base font-semibold leading-tight tracking-tight text-foreground line-clamp-1">
            {data.name}
          </h3>
          <p className="font-mono text-[11px] text-muted-foreground line-clamp-1">/{data.slug}</p>
          {data.description && (
            <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2 pt-1">{data.description}</p>
          )}
        </div>

        <div className="flex items-center justify-between gap-2 pt-4 mt-4 border-t border-border/50">
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <Wrench className="size-3.5" />
            <span className="tabular-nums">
              {toolsCount} {toolsCount === 1 ? "ferramenta" : "ferramentas"}
            </span>
          </span>
          <Badge variant={data.isActive ? "default" : "outline"} className="h-5 text-[10px] font-normal">
            {data.isActive ? "Publicada" : "Rascunho"}
          </Badge>
        </div>
      </Link>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir “{data.name}”?</DialogTitle>
            <DialogDescription>
              Esta ação não pode ser desfeita. As ferramentas associadas perderão a referência a esta categoria.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setConfirmOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleConfirm} disabled={isRemoving}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
