"use client";

import Link from "next/link";
import { Pencil } from "lucide-react";
import { PageType } from "@workspace/types";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { useSuspensePages } from "@/modules/dashboard/hooks/use-suspense-pages";

const FIXED_PAGE_LABEL: Record<string, string> = {
  [PageType.HOMEPAGE]: "Página Inicial",
  [PageType.ALL_TOOLS]: "Todas as Ferramentas",
};

const FIXED_PAGE_HREF: Record<string, string> = {
  [PageType.HOMEPAGE]: "/dashboard/pages/homepage",
  [PageType.ALL_TOOLS]: "/dashboard/pages/all-tools",
};

export const PagesFixedList = () => {
  const { data: pages } = useSuspensePages();
  const fixedPages = pages.filter((p) => p.pageType === PageType.HOMEPAGE || p.pageType === PageType.ALL_TOOLS);

  if (fixedPages.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-muted-foreground">Nenhuma página fixa cadastrada ainda.</CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {fixedPages.map((page) => {
        const href = FIXED_PAGE_HREF[page.pageType];
        const label = FIXED_PAGE_LABEL[page.pageType] ?? page.seoTitle;
        return (
          <Card key={page._id}>
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <CardTitle>{label}</CardTitle>
                  <CardDescription>/{page.slug}</CardDescription>
                </div>
                <Badge variant={page.isActive ? "default" : "secondary"}>{page.isActive ? "Ativo" : "Inativo"}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href={href ?? "/dashboard/pages"}>
                  <Pencil className="w-4 h-4 mr-2" />
                  Editar
                </Link>
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
