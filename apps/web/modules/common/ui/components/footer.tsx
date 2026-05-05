import { caller } from "@/trpc/server";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Logo } from "./logo";

export const Footer = async () => {
  const [categories, customPages] = await Promise.all([caller.categories.getMany({}), caller.pages.getFooterPages()]);

  const popular = categories.items.flatMap((c) => c.tools ?? []).slice(0, 4);

  return (
    <footer className="bg-background border-t border-border">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          <div className="md:col-span-1">
            <Logo />
            <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
              A plataforma brasileira de ferramentas online para trabalhar com arquivos PDF de forma simples, rápida e segura. Sem
              cadastro, sem instalação.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Ferramentas</h4>
            <ul className="space-y-3">
              {categories.items.slice(0, 4).map((category) => (
                <li key={category._id}>
                  <Link
                    href={`/ferramentas/${category.slug}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Populares</h4>
            <ul className="space-y-3">
              {popular.length > 0 ? (
                popular.map((tool: { _id?: string; title?: string; link?: string; categorySlug?: string } | undefined, idx) =>
                  tool?.title && tool?.link ? (
                    <li key={tool._id ?? `${tool.link}-${idx}`}>
                      <Link
                        href={`/ferramentas/${tool.categorySlug ?? categories.items[0]?.slug ?? ""}/${tool.link}`}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {tool.title}
                      </Link>
                    </li>
                  ) : null,
                )
              ) : (
                <>
                  <li>
                    <Link href="/ferramentas" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      Juntar PDF
                    </Link>
                  </li>
                  <li>
                    <Link href="/ferramentas" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      Comprimir PDF
                    </Link>
                  </li>
                  <li>
                    <Link href="/ferramentas" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      PDF para Word
                    </Link>
                  </li>
                  <li>
                    <Link href="/ferramentas" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      Assinar PDF
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Institucional</h4>
            <ul className="space-y-3">
              {customPages.length > 0 ? (
                customPages.map((page) => (
                  <li key={page._id}>
                    <Link href={`/${page.slug}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {page.footerLabel || page.title}
                    </Link>
                  </li>
                ))
              ) : (
                <>
                  <li>
                    <Link href="/sobre" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      Sobre
                    </Link>
                  </li>
                  <li>
                    <Link href="/como-funciona" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      Como Funciona
                    </Link>
                  </li>
                  <li>
                    <Link href="/seguranca" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      Segurança
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacidade" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      Privacidade
                    </Link>
                  </li>
                  <li>
                    <Link href="/termos-de-uso" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      Termos de Uso
                    </Link>
                  </li>
                  <li>
                    <Link href="/contato" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      Contato
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-sm text-muted-foreground">© 2026 PDFS.com.br — O padrão brasileiro para PDFs</p>
          <p className="text-sm text-muted-foreground inline-flex items-center gap-1.5">
            Feito com <Heart className="w-4 h-4 fill-red-500 text-red-500" /> no Brasil
          </p>
        </div>
      </div>
    </footer>
  );
};
