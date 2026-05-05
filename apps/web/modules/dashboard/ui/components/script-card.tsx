"use client";

import Link from "next/link";
import { useState } from "react";
import { Code2, Eye, EyeOff, FileCode2, MoreVerticalIcon, PencilIcon, TrashIcon } from "lucide-react";
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

export interface ScriptCardData {
  _id: string;
  name: string;
  content: string;
  location: "HEAD" | "BODY";
  isActive: boolean;
}

interface ScriptCardProps {
  data: ScriptCardData;
  onRemove?: () => void;
  isRemoving?: boolean;
}

const LOCATION_LABEL: Record<ScriptCardData["location"], string> = {
  HEAD: "Head",
  BODY: "Body",
};

export const ScriptCard = ({ data, onRemove, isRemoving }: ScriptCardProps) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const detailHref = `/dashboard/scripts/${data._id}`;
  const accent = data.location === "HEAD" ? "#0ea5e9" : "#8b5cf6";

  const handleConfirm = () => {
    setConfirmOpen(false);
    onRemove?.();
  };

  return (
    <>
      <Link
        href={detailHref}
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
            style={{ backgroundColor: `${accent}1a` }}
          >
            <FileCode2 className="size-6" style={{ color: accent }} />
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
                aria-label="Ações do script"
              >
                <MoreVerticalIcon className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
              <DropdownMenuItem asChild>
                <Link href={detailHref}>
                  <PencilIcon className="size-4" />
                  Abrir
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

        <div className="flex flex-col flex-1 mt-4 space-y-2">
          <h3 className="text-base font-semibold leading-tight tracking-tight text-foreground line-clamp-1">
            {data.name}
          </h3>
          <pre className="px-3 py-2 overflow-hidden font-mono text-[11px] leading-relaxed rounded-md bg-muted/60 text-muted-foreground line-clamp-3 break-all whitespace-pre-wrap">
            {data.content}
          </pre>
        </div>

        <div className="flex items-center justify-between gap-2 pt-4 mt-4 border-t border-border/50">
          <span
            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider"
            style={{ backgroundColor: `${accent}1a`, color: accent }}
          >
            <Code2 className="size-3" />
            {LOCATION_LABEL[data.location]}
          </span>
          <Badge variant={data.isActive ? "default" : "outline"} className="gap-1.5 h-5 text-[10px] font-normal">
            {data.isActive ? <Eye className="size-3" /> : <EyeOff className="size-3" />}
            {data.isActive ? "Ativo" : "Inativo"}
          </Badge>
        </div>
      </Link>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir “{data.name}”?</DialogTitle>
            <DialogDescription>
              Esta ação não pode ser desfeita. O script deixará de ser injetado no site público imediatamente.
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
