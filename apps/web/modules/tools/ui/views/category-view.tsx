import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ToolCard } from "@/modules/common/ui/components/tool-card";
import { CategoryCard } from "@/modules/tools/ui/components/category-card";
import { ToolFAQ } from "@/modules/tools/ui/components/tool-faq";
import { FAQSchema } from "@/modules/tools/ui/components/faq-schema";
import { BreadcrumbSchema } from "@/modules/tools/ui/components/breadcrumb-schema";
import { ToolAudienceBenefits } from "@/modules/tools/ui/components/tool-audience-benefits";
import { InvalidToolSelection } from "@/modules/common/ui/components/invalid-tool-selection";
import { caller } from "@/trpc/server";

interface CategoryViewProps {
  toolCategory: string;
}

// TECH DEBT: conteúdo SEO/GEO da categoria é mock genérico parametrizado pelo nome.
// Quando criarmos campos `audience`, `benefits`, `faqs`, `educationalContent` no schema
// Category, migrar pra dinâmico via admin (mesmo padrão do Tool).
function buildCategoryContent(name: string) {
  const lower = name.toLowerCase();

  return {
    audience: [
      { label: "Estudantes", description: `use ${lower} para entregar trabalhos no formato certo.`, iconName: "GraduationCap" },
      {
        label: "Profissionais",
        description: `prepare documentos e entregáveis com ${lower} sem fricção.`,
        iconName: "Briefcase",
      },
      {
        label: "Criadores de conteúdo",
        description: `${lower} ajuda a otimizar e adaptar arquivos para publicação.`,
        iconName: "Sparkles",
      },
      {
        label: "Pequenas empresas",
        description: `automatize tarefas com ${lower} sem precisar de software pago.`,
        iconName: "Building2",
      },
      {
        label: "Desenvolvedores",
        description: `integre ${lower} ao seu fluxo via web, sem instalar dependências.`,
        iconName: "Code2",
      },
    ],
    benefits: [
      { label: "100% online", description: "tudo direto no navegador, sem instalar nada.", iconName: "Globe" },
      { label: "Gratuito", description: "uso ilimitado e sem cadastro obrigatório.", iconName: "Gift" },
      { label: "Privacidade", description: "muitas operações acontecem localmente, sem upload.", iconName: "ShieldCheck" },
      { label: "Multi-dispositivo", description: "compatível com desktop, tablet e celular.", iconName: "Smartphone" },
      { label: "Resultados rápidos", description: "o arquivo fica pronto em segundos.", iconName: "Zap" },
      { label: "Qualidade preservada", description: "tecnologia inteligente mantém o conteúdo legível.", iconName: "Award" },
    ],
    faqs: [
      {
        question: `As ferramentas de ${lower} são gratuitas?`,
        answer: `Sim. Todas as ferramentas de ${lower} listadas no pdfs.com.br são gratuitas, sem cadastro obrigatório e podem ser usadas quantas vezes você precisar.`,
      },
      {
        question: `Preciso instalar algum programa para usar ${lower}?`,
        answer: `Não. Todas as ferramentas de ${lower} funcionam direto no navegador, em qualquer dispositivo. Não é preciso instalar nada.`,
      },
      {
        question: `Meus arquivos ficam armazenados no servidor?`,
        answer: `A maioria das ferramentas de ${lower} processa os arquivos direto no navegador. Quando há upload, os arquivos são removidos automaticamente após o processamento.`,
      },
      {
        question: `Posso usar ${lower} para fins comerciais?`,
        answer: `Sim. Você pode usar livremente as ferramentas de ${lower} para qualquer finalidade, inclusive trabalho profissional e comercial.`,
      },
      {
        question: `${name} funcionam em celulares e tablets?`,
        answer: `Sim. As ferramentas são responsivas e funcionam bem em smartphones (iOS e Android) e tablets, além de desktops.`,
      },
    ],
  };
}

export const CategoryView = async ({ toolCategory }: CategoryViewProps) => {
  if (!toolCategory) {
    return <InvalidToolSelection />;
  }

  let category: Awaited<ReturnType<typeof caller.categories.getCategoryWithTools>>;
  try {
    category = await caller.categories.getCategoryWithTools({ slug: toolCategory });
  } catch {
    return <InvalidToolSelection />;
  }

  const allCategories = await caller.categories.getMany({ pageSize: 50, page: 1 });
  const otherCategories = allCategories.items.filter((c) => c.slug !== toolCategory).slice(0, 6);

  const content = buildCategoryContent(category.name);
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://pdfs.com.br";
  const currentUrl = `${baseUrl}/ferramentas/${toolCategory}`;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: baseUrl },
          { name: "Ferramentas", url: `${baseUrl}/ferramentas` },
          { name: category.name, url: currentUrl },
        ]}
      />
      <FAQSchema faqs={content.faqs} />

      <main className="container flex-1 px-4 py-12 md:py-16 mx-auto max-w-6xl">
        {/* Fluxo 1 — Achar uma ferramenta */}
        <div className="space-y-32 md:space-y-40">
          {/* Breadcrumb visual + Hero — eyebrow + h1 dominante */}
          <header className="text-center max-w-3xl mx-auto">
            <nav
              aria-label="breadcrumb"
              className="mb-6 flex items-center justify-center gap-1.5 text-sm text-muted-foreground scroll-mt-24"
            >
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <span aria-hidden>/</span>
              <Link href="/ferramentas" className="hover:text-foreground transition-colors">
                Ferramentas
              </Link>
              <span aria-hidden>/</span>
              <span className="text-foreground">{category.name}</span>
            </nav>
            <span className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-semibold uppercase tracking-[0.18em]">
              <span className="h-1 w-1 rounded-full bg-primary" aria-hidden />
              Categoria
            </span>
            <h1 className="mb-5 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">{category.name}</h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">{category.description}</p>
          </header>

          {/* Lista de ferramentas — h2 como section label, sem competir com h1 */}
          {category.tools.length > 0 && (
            <section id="ferramentas-categoria" className="scroll-mt-24">
              <div className="mb-6 md:mb-8 flex items-baseline justify-between gap-4">
                <h2 className="text-xl md:text-2xl font-semibold text-foreground">
                  Ferramentas de {category.name.toLowerCase()}
                </h2>
                <p className="hidden md:block text-sm text-muted-foreground">Cada ferramenta resolve uma tarefa específica.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {category.tools.map((tool) => (
                  <ToolCard
                    key={tool._id}
                    name={tool.title}
                    description={tool.description}
                    category={category.name}
                    categorySlug={category.slug}
                    toolSlug={tool.link}
                    icon={tool.icon}
                    iconColor={tool.iconColor}
                    bgColor={tool.bgColor}
                  />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Fluxo 2 — Aprender sobre a categoria (educacional / GEO) */}
        <div className="mt-24 md:mt-32 space-y-12 md:space-y-16">
          <section className="rounded-2xl border border-border bg-card p-8 md:p-12 shadow-sm">
            <div className="max-w-3xl mx-auto">
              <div className="text-center">
                <span className="inline-flex items-center gap-2 mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                  <span className="h-1 w-1 rounded-full bg-primary" aria-hidden />
                  Sobre {category.name}
                </span>
                <h2 className="mb-8 text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                  O que são ferramentas de {category.name.toLowerCase()}?
                </h2>
              </div>
              <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>{category.description}</p>
                <p>
                  No pdfs.com.br, agrupamos sob <strong>{category.name}</strong> as ferramentas que resolvem as tarefas mais
                  frequentes desse domínio — de operações simples como conversão e compressão até manipulações mais específicas.
                  Cada ferramenta foi construída pra fazer <em>uma</em> coisa muito bem.
                </p>
                <p>
                  Todas funcionam direto no navegador, sem instalação, e a maioria processa os arquivos localmente — ou seja, seus
                  dados não saem do seu dispositivo. Quando há upload, ele é mínimo, criptografado em trânsito e o arquivo é
                  removido automaticamente após o processamento.
                </p>
              </div>
            </div>
          </section>

          {/* Para quem é + Benefícios */}
          <ToolAudienceBenefits
            audienceTitle={`Para quem são as ferramentas de ${category.name.toLowerCase()}`}
            audienceIntro={`As ferramentas de ${category.name.toLowerCase()} foram pensadas para qualquer pessoa que precise resolver essas tarefas com agilidade. Algumas categorias de uso comuns:`}
            audience={content.audience}
            benefitsTitle={`Vantagens das ferramentas de ${category.name.toLowerCase()} no pdfs.com.br`}
            benefitsIntro={`Os princípios que guiam cada ferramenta dessa categoria:`}
            benefits={content.benefits}
          />
        </div>

        {/* Fluxo 3 — Tirar dúvidas */}
        <div className="mt-24 md:mt-32 space-y-12 md:space-y-16">
          <section className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
            <h2 className="mb-6 text-2xl md:text-3xl font-bold text-foreground">
              Perguntas frequentes sobre {category.name.toLowerCase()}
            </h2>
            <ToolFAQ faqs={content.faqs} />
          </section>
        </div>

        {/* Fluxo 4 — CTA final */}
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
                Pronto pra usar uma ferramenta de {category.name.toLowerCase()}?
              </h2>
              <p className="mb-8 text-base md:text-lg text-primary-foreground/90 leading-relaxed">
                {category.tools.length > 0
                  ? `${category.tools.length}+ ferramentas de ${category.name.toLowerCase()}, todas direto no navegador. Sem cadastro, sem instalação.`
                  : `Ferramentas de ${category.name.toLowerCase()} direto no navegador, sem cadastro e sem instalação.`}
              </p>
              <a
                href="#ferramentas-categoria"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-foreground text-primary text-sm md:text-base font-semibold shadow-lg shadow-primary-foreground/20 transition-transform hover:scale-105"
              >
                Ver ferramentas de {category.name.toLowerCase()}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </section>
        </div>

        {/* Fluxo 5 — Outras categorias */}
        {otherCategories.length > 0 && (
          <div className="mt-24 md:mt-32 space-y-12 md:space-y-16">
            <section>
              <div className="mb-6 md:mb-8 flex items-baseline justify-between gap-4">
                <h2 className="text-xl md:text-2xl font-semibold text-foreground">Outras categorias</h2>
                <p className="hidden md:block text-sm text-muted-foreground">
                  Não encontrou o que precisava em {category.name.toLowerCase()}?
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
                {otherCategories.map((cat) => (
                  <CategoryCard
                    key={cat._id as string}
                    name={cat.name}
                    slug={cat.slug}
                    description={cat.description}
                    icon={cat.icon}
                    color={cat.color}
                    toolsCount={(cat as { toolsCount?: number }).toolsCount}
                  />
                ))}
              </div>
              <div className="mt-8 text-center">
                <Link
                  href="/ferramentas"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
                >
                  Ver todas as ferramentas
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
};
