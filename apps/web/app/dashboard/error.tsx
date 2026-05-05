"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@workspace/ui/components/button";
import { AlertTriangle, LayoutDashboard, RotateCcw } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function DashboardError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("[dashboard-error]", error);
  }, [error]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-16">
      <div className="flex size-14 items-center justify-center rounded-full bg-secondary">
        <AlertTriangle className="size-7 text-primary" />
      </div>
      <div className="max-w-md text-center">
        <h1 className="mb-2 text-2xl font-semibold text-foreground">Erro no painel</h1>
        <p className="mx-auto max-w-sm text-sm text-muted-foreground">
          Algo falhou ao carregar esta tela do admin. Tente novamente — se persistir, recarregue a página inteira ou avise o
          time técnico.
        </p>
        {error.digest ? (
          <p className="mt-3 text-xs text-muted-foreground/80">ID do erro: {error.digest}</p>
        ) : null}
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button type="button" size="default" onClick={() => reset()} className="gap-2">
          <RotateCcw className="size-4" />
          Tentar novamente
        </Button>
        <Link href="/dashboard">
          <Button size="default" variant="outline" className="w-full gap-2 sm:w-auto">
            <LayoutDashboard className="size-4" />
            Ir para o dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
