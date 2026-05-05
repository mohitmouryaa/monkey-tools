import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@workspace/ui/components/button";
import { FileX, BookOpen, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Artigo não encontrado | pdfs.com.br",
  robots: { index: false, follow: false },
};

export default function BlogArticleNotFound() {
  return (
    <section className="container mx-auto flex flex-col items-center justify-center gap-8 px-4 py-20 md:py-28">
      <div className="flex size-16 items-center justify-center rounded-full bg-secondary">
        <FileX className="size-8 text-primary" />
      </div>
      <div className="max-w-xl text-center">
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">Artigo não encontrado</h1>
        <p className="mx-auto max-w-md text-base text-muted-foreground md:text-lg">
          Esse artigo não existe, foi despublicado ou está com outro endereço. Veja os artigos mais recentes ou volte para o
          índice do blog.
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href="/blog">
          <Button size="lg" className="w-full gap-2 sm:w-auto">
            <BookOpen className="size-4" />
            Ver todos os artigos
          </Button>
        </Link>
        <Link href="/">
          <Button size="lg" variant="outline" className="w-full gap-2 sm:w-auto">
            <ArrowLeft className="size-4" />
            Voltar ao início
          </Button>
        </Link>
      </div>
    </section>
  );
}
