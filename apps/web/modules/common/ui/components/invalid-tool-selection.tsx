import Link from "next/link";
import { Button } from "@workspace/ui/components/button";
import { AlertTriangle, HomeIcon, SearchIcon } from "lucide-react";

export const InvalidToolSelection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container px-4 mx-auto">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border rounded-full bg-secondary border-primary/30">
            <AlertTriangle className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary">Ferramenta Não Encontrada</span>
          </div>

          <h1 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl text-foreground">
            Ops! Essa Ferramenta{" "}
            <span className="inline-block px-2 py-1 rounded-md text-primary-foreground bg-primary">Não Existe</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
            A ferramenta que você procura pode ter sido movida, renomeada ou não existe em nossa coleção.
          </p>
        </div>

        {/* Error Card */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="p-8 border rounded-2xl bg-card border-border/50">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 border rounded-full bg-secondary border-primary/20">
                <AlertTriangle className="w-8 h-8 text-primary" />
              </div>

              <h2 className="mb-4 text-2xl font-bold text-foreground">O que aconteceu?</h2>
              <p className="mb-6 text-muted-foreground">
                Isso pode ser devido a um erro de digitação na URL, um link desatualizado ou a ferramenta pode ter sido
                temporariamente removida. Mas não se preocupe — temos muitas outras ferramentas incríveis para você explorar!
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link href="/">
                  <Button size="lg" className="w-full gap-2 sm:w-auto">
                    <HomeIcon className="w-4 h-4" />
                    Voltar à Página Inicial
                  </Button>
                </Link>
                <Link href="/#tools">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full gap-2 sm:w-auto border-muted-foreground/30 text-foreground hover:bg-secondary"
                  >
                    <SearchIcon className="w-4 h-4" />
                    Ver Todas as Ferramentas
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="max-w-2xl mx-auto mt-12">
          <div className="p-6 border rounded-2xl bg-card border-border/50">
            <div className="text-center">
              <h4 className="mb-2 font-semibold text-foreground">Precisa de Ajuda?</h4>
              <p className="text-sm text-muted-foreground">
                Se você acredita que isso é um erro ou precisa de ajuda, entre em contato com nossa equipe de suporte.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
