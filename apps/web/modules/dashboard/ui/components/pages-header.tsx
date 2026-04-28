"use client";

import Link from "next/link";
import { Button } from "@workspace/ui/components/button";
import { Plus } from "lucide-react";

export const PagesHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">Páginas</h1>
        <p className="text-muted-foreground mt-2">Gerencie as páginas do seu site (Início, Todas as Ferramentas e páginas personalizadas)</p>
      </div>
      <Link href="/dashboard/pages/custom/create">
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Criar Página Personalizada
        </Button>
      </Link>
    </div>
  );
};
