"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@workspace/ui/components/button";
import { AlertTriangle, Wrench, RotateCcw } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ToolsError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("[tools-error]", error);
  }, [error]);

  return (
    <section className="container mx-auto flex flex-col items-center justify-center gap-8 px-4 py-20 md:py-28">
      <div className="flex size-16 items-center justify-center rounded-full bg-secondary">
        <AlertTriangle className="size-8 text-primary" />
      </div>
      <div className="max-w-xl text-center">
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">A ferramenta travou</h1>
        <p className="mx-auto max-w-md text-base text-muted-foreground md:text-lg">
          Tivemos um problema ao carregar essa ferramenta. Tente novamente em instantes ou veja a lista completa para usar
          outra agora.
        </p>
        {error.digest ? (
          <p className="mt-3 text-xs text-muted-foreground/80">ID do erro: {error.digest}</p>
        ) : null}
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button type="button" size="lg" onClick={() => reset()} className="gap-2">
          <RotateCcw className="size-4" />
          Tentar novamente
        </Button>
        <Link href="/ferramentas">
          <Button size="lg" variant="outline" className="w-full gap-2 sm:w-auto">
            <Wrench className="size-4" />
            Ver todas as ferramentas
          </Button>
        </Link>
      </div>
    </section>
  );
}
