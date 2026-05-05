import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@workspace/ui/components/button";
import { FileQuestion, HomeIcon, Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: "Página não encontrada | pdfs.com.br",
  robots: { index: false, follow: false },
};

export default function MainNotFound() {
  return (
    <section className="container mx-auto flex flex-col items-center justify-center gap-8 px-4 py-20 md:py-28">
      <div className="flex size-16 items-center justify-center rounded-full bg-secondary">
        <FileQuestion className="size-8 text-primary" />
      </div>
      <div className="max-w-xl text-center">
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">Página não encontrada</h1>
        <p className="mx-auto max-w-md text-base text-muted-foreground md:text-lg">
          O endereço que você acessou não existe, foi movido ou está com erro de digitação. Volte para o início ou veja a lista
          completa de ferramentas.
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href="/">
          <Button size="lg" className="w-full gap-2 sm:w-auto">
            <HomeIcon className="size-4" />
            Página inicial
          </Button>
        </Link>
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
