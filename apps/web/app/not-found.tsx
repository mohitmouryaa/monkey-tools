import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@workspace/ui/components/button";
import { FileQuestion, HomeIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Página não encontrada | pdfs.com.br",
  robots: { index: false, follow: false },
};

export default function RootNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-16">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-secondary">
          <FileQuestion className="size-8 text-primary" />
        </div>
        <h1 className="mb-3 text-3xl font-bold text-foreground">Página não encontrada</h1>
        <p className="mb-8 text-muted-foreground">
          O endereço que você acessou não existe ou foi removido. Volte para a página inicial e siga em frente.
        </p>
        <Link href="/">
          <Button size="lg" className="gap-2">
            <HomeIcon className="size-4" />
            Voltar à página inicial
          </Button>
        </Link>
      </div>
    </main>
  );
}
