import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@workspace/ui/components/button";
import { FolderX, HomeIcon, Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: "Categoria não encontrada | pdfs.com.br",
  robots: { index: false, follow: false },
};

export default function ToolsNotFound() {
  return (
    <section className="container mx-auto flex flex-col items-center justify-center gap-8 px-4 py-20 md:py-28">
      <div className="flex size-16 items-center justify-center rounded-full bg-secondary">
        <FolderX className="size-8 text-primary" />
      </div>
      <div className="max-w-xl text-center">
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">Categoria não encontrada</h1>
        <p className="mx-auto max-w-md text-base text-muted-foreground md:text-lg">
          A categoria de ferramentas que você acessou não existe ou foi renomeada. Veja a lista completa para encontrar o que
          você precisa.
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href="/ferramentas">
          <Button size="lg" className="w-full gap-2 sm:w-auto">
            <Wrench className="size-4" />
            Ver todas as ferramentas
          </Button>
        </Link>
        <Link href="/">
          <Button size="lg" variant="outline" className="w-full gap-2 sm:w-auto">
            <HomeIcon className="size-4" />
            Página inicial
          </Button>
        </Link>
      </div>
    </section>
  );
}
