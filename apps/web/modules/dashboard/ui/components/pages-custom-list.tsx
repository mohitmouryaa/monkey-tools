"use client";

import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { useDeleteCustomPage } from "@/modules/dashboard/hooks/use-delete-custom-page";

interface CustomPageItem {
  _id: string;
  slug: string;
  title?: string | null;
  seoTitle: string;
  isActive: boolean;
  showInFooter?: boolean | null;
  footerOrder?: number | null;
}

interface PagesCustomListProps {
  items: CustomPageItem[];
}

export const PagesCustomList = ({ items }: PagesCustomListProps) => {
  const deleteCustomPage = useDeleteCustomPage();

  const onDelete = (pageId: string, label: string) => {
    if (confirm(`Tem certeza que deseja excluir "${label}"?`)) {
      deleteCustomPage.mutate({ id: pageId });
    }
  };

  if (items.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-muted-foreground">
          Nenhuma página personalizada encontrada. Tente outro termo de busca ou crie uma nova página.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((page) => {
        const label = page.title || page.seoTitle;
        return (
          <Card key={page._id}>
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1 min-w-0">
                  <CardTitle className="text-base truncate">{label}</CardTitle>
                  <CardDescription className="truncate">/{page.slug}</CardDescription>
                </div>
                <Badge variant={page.isActive ? "default" : "secondary"}>{page.isActive ? "Ativo" : "Inativo"}</Badge>
              </div>
              {page.showInFooter && (
                <Badge variant="outline" className="w-fit mt-2">
                  No rodapé (ordem {page.footerOrder ?? 0})
                </Badge>
              )}
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button asChild variant="outline" size="sm" className="flex-1">
                  <Link href={`/dashboard/pages/custom/${page._id}`}>
                    <Pencil className="w-4 h-4 mr-2" />
                    Editar
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete(page._id, label)}
                  disabled={deleteCustomPage.isPending}
                  aria-label={`Excluir ${label}`}
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
