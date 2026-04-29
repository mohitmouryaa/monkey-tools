"use client";

import { Trash2, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { useToolsSelection } from "@/modules/dashboard/hooks/use-tools-selection";
import { useBulkDeleteTools } from "@/modules/dashboard/hooks/use-bulk-delete-tools";

export const ToolsBulkActionsBar = () => {
  const { selected, count, clear } = useToolsSelection();
  const bulkDelete = useBulkDeleteTools();
  const [open, setOpen] = useState(false);

  if (count === 0) return null;

  const handleConfirm = () => {
    bulkDelete.mutate(
      { ids: Array.from(selected) },
      {
        onSuccess: () => {
          clear();
          setOpen(false);
        },
      },
    );
  };

  return (
    <>
      <div className="flex items-center justify-between gap-2 rounded-lg border border-border bg-muted/50 px-4 py-2">
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium">{count}</span>
          <span className="text-muted-foreground">
            {count === 1 ? "ferramenta selecionada" : "ferramentas selecionadas"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
            disabled={bulkDelete.isPending}
          >
            <Trash2 className="size-4" />
            Excluir
          </Button>
          <Button variant="ghost" size="sm" onClick={clear}>
            <X className="size-4" />
            Cancelar
          </Button>
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir {count} ferramenta(s)?</DialogTitle>
            <DialogDescription>
              Esta ação não pode ser desfeita. As ferramentas selecionadas serão removidas permanentemente.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)} disabled={bulkDelete.isPending}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleConfirm} disabled={bulkDelete.isPending}>
              {bulkDelete.isPending ? "Excluindo..." : "Excluir"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
