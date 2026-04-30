import { ArrowRight } from "lucide-react";
import { PostCard } from "@/modules/blog/ui/components/post-card";
import { PostFilterBar } from "@/modules/blog/ui/components/post-filter-bar";
import { FeaturedHighlight } from "@/modules/blog/ui/components/featured-highlight";
import { BlogPagination } from "@/modules/blog/ui/components/blog-pagination";
import { BreadcrumbSchema } from "@/modules/tools/ui/components/breadcrumb-schema";

interface BlogViewPost {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  publishedAt?: string | Date | null;
  tools?: Array<{ _id: string; title: string }>;
}

interface BlogViewFilterTool {
  _id: string;
  title: string;
}

interface BlogViewProps {
  posts: BlogViewPost[];
  featured: BlogViewPost[];
  page: number;
  totalPages: number;
  totalCount: number;
  showFeatured: boolean;
  isFiltered: boolean;
  filterTools: BlogViewFilterTool[];
  activeQuery: string;
  activeTool?: string;
}

export const BlogView = ({
  posts,
  featured,
  page,
  totalPages,
  totalCount,
  showFeatured,
  isFiltered,
  filterTools,
  activeQuery,
  activeTool,
}: BlogViewProps) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://pdfs.com.br";

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: baseUrl },
          { name: "Blog", url: `${baseUrl}/blog` },
        ]}
      />

      <main className="container flex-1 px-4 py-12 md:py-16 mx-auto max-w-6xl">
        {/* Fluxo 1 — Encontrar leitura */}
        <div className="space-y-32 md:space-y-40">
          {/* Hero — eyebrow + h1 dominante */}
          <header className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-semibold uppercase tracking-[0.18em]">
              <span className="h-1 w-1 rounded-full bg-primary" aria-hidden />
              Blog & guias
            </span>
            <h1 className="mb-5 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
              Aprenda a tirar o máximo das suas ferramentas
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Tutoriais práticos, comparativos e dicas para resolver tarefas com PDFs, imagens e documentos — direto do time que
              constrói as ferramentas do pdfs.com.br.
            </p>
          </header>

          {/* Em destaque — só na primeira página sem filtros */}
          {showFeatured && featured.length > 0 && <FeaturedHighlight posts={featured} />}

          {/* Lista — filtros + grid + paginação */}
          <section id="todos-artigos" className="scroll-mt-24">
            <div className="mb-6 md:mb-8 flex items-baseline justify-between gap-4">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground">
                {isFiltered ? "Resultados" : "Todos os artigos"}
              </h2>
              <p className="hidden md:block text-sm text-muted-foreground">
                {totalCount > 0
                  ? `${totalCount} artigo${totalCount === 1 ? "" : "s"} ${isFiltered ? "encontrados" : "publicados"}`
                  : "Nenhum artigo no momento."}
              </p>
            </div>

            <div className="mb-8">
              <PostFilterBar tools={filterTools} />
            </div>

            {posts.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
                <p className="text-base font-medium text-foreground">Nenhum artigo encontrado.</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Tente outra busca ou remova o filtro de ferramenta para ver todos os artigos.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            )}

            <BlogPagination page={page} totalPages={totalPages} q={activeQuery} tool={activeTool} />
          </section>
        </div>

        {/* Fluxo 2 — Sobre o blog (educacional / GEO) */}
        <div className="mt-24 md:mt-32 space-y-12 md:space-y-16">
          <section className="rounded-2xl border border-border bg-card p-8 md:p-12 shadow-sm">
            <div className="max-w-3xl mx-auto">
              <div className="text-center">
                <span className="inline-flex items-center gap-2 mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                  <span className="h-1 w-1 rounded-full bg-primary" aria-hidden />
                  Sobre o blog
                </span>
                <h2 className="mb-8 text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                  Conteúdo escrito por quem trabalha com arquivos todo dia
                </h2>
              </div>
              <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  O blog do pdfs.com.br é o lugar onde a gente compartilha o que aprendeu construindo dezenas de ferramentas
                  online. São <strong>guias diretos, sem enrolação</strong>, focados em resolver tarefas reais — comprimir um PDF
                  pra anexar num e-mail, escolher entre JPG e PNG, entender por que um arquivo virou um monstro de 30MB.
                </p>
                <p>
                  Cada artigo tenta responder uma pergunta específica em poucos minutos de leitura, com links pras ferramentas
                  certas pra cada caso. Se você gosta de entender o &quot;por quê&quot; antes de clicar no botão, está no lugar
                  certo.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Fluxo 3 — CTA final */}
        <div className="mt-24 md:mt-32">
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-primary/80 px-6 py-12 md:px-12 md:py-20 text-center">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary-foreground/10 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -left-32 -bottom-32 h-80 w-80 rounded-full bg-primary-foreground/10 blur-3xl"
            />
            <div className="relative max-w-2xl mx-auto">
              <h2 className="mb-4 text-3xl md:text-4xl font-bold text-primary-foreground tracking-tight">
                Da leitura à prática em segundos
              </h2>
              <p className="mb-8 text-base md:text-lg text-primary-foreground/90 leading-relaxed">
                Todo guia aqui aponta pra uma ferramenta que faz o trabalho pra você — gratuita, direto no navegador, sem
                cadastro.
              </p>
              <a
                href="/ferramentas"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-foreground text-primary text-sm md:text-base font-semibold shadow-lg shadow-primary-foreground/20 transition-transform hover:scale-105"
              >
                Ver todas as ferramentas
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
