"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Edit, Loader2, Trash2 } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { useRemoveCategory } from "@/modules/dashboard/hooks/use-remove-category";

type CategoryActionsProps = {
  id: string;
  name: string;
  variant: "toolbar" | "aside";
};

export const CategoryActions = ({ id, name, variant }: CategoryActionsProps) => {
  const router = useRouter();
  const [isConfirmingRemove, setIsConfirmingRemove] = useState(false);
  const removeCategory = useRemoveCategory();

  const handleRemove = () => {
    removeCategory.mutate(
      { id },
      {
        onSuccess: () => {
          router.push("/dashboard/categories");
        },
      },
    );
  };

  const editHref = `/dashboard/categories/${id}/edit`;

  return (
    <>
      {variant === "toolbar" ? (
        <>
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-muted-foreground hover:text-destructive"
            onClick={() => setIsConfirmingRemove(true)}
            disabled={removeCategory.isPending}
          >
            {removeCategory.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
            Remover
          </Button>
          <Button asChild size="sm" className="gap-2 transition-all shadow-sm hover:shadow">
            <Link href={editHref}>
              <Edit className="w-4 h-4" />
              Editar
            </Link>
          </Button>
        </>
      ) : (
        <>
          <Link
            href={editHref}
            className="inline-flex items-center justify-between px-1 py-3 text-sm font-medium transition-colors border-b text-foreground border-border/30 hover:bg-muted/50"
          >
            Editar categoria
            <Edit className="w-4 h-4 text-muted-foreground" />
          </Link>
          <button
            type="button"
            onClick={() => setIsConfirmingRemove(true)}
            disabled={removeCategory.isPending}
            className="inline-flex items-center justify-between px-1 py-3 text-sm font-medium transition-colors text-destructive hover:bg-destructive/5 disabled:opacity-50"
          >
            Remover categoria
            {removeCategory.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
          </button>
        </>
      )}

      <Dialog open={isConfirmingRemove} onOpenChange={setIsConfirmingRemove}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir “{name}”?</DialogTitle>
            <DialogDescription>
              Esta ação não pode ser desfeita. As ferramentas vinculadas perderão a referência a esta categoria.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsConfirmingRemove(false)} disabled={removeCategory.isPending}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleRemove} disabled={removeCategory.isPending} className="gap-2">
              {removeCategory.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
