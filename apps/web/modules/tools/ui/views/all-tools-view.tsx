import type { Category, Tool } from "@workspace/database";
import { ToolsFilterGrid } from "@/modules/tools/ui/components/tools-filter-grid";
import { CategoryCard } from "@/modules/tools/ui/components/category-card";
import { ToolFAQ } from "@/modules/tools/ui/components/tool-faq";
import { FAQSchema } from "@/modules/tools/ui/components/faq-schema";
import { BreadcrumbSchema } from "@/modules/tools/ui/components/breadcrumb-schema";
import { ToolAudienceBenefits } from "@/modules/tools/ui/components/tool-audience-benefits";

interface AllToolsViewProps {
  tools: Tool[];
  categories: (Category & { toolsCount?: number })[];
  h1Heading?: string;
  description?: string;
}

// TECH DEBT: conteúdo SEO/GEO do hub é mock genérico. Quando houver campos
// dedicados em Page (homepage hub), migrar pra dinâmico via admin.
const HUB_AUDIENCE = [
  { label: "Estudantes", description: "envie trabalhos sem se preocupar com tamanho ou formato.", iconName: "GraduationCap" },
  { label: "Profissionais", description: "relatórios, contratos e documentos prontos pra anexar.", iconName: "Briefcase" },
  { label: "Criadores de conteúdo", description: "imagens otimizadas e arquivos prontos pra publicação.", iconName: "Sparkles" },
  { label: "Pequenas empresas", description: "automatize tarefas repetitivas sem instalar software.", iconName: "Building2" },
  { label: "Desenvolvedores", description: "ferramentas de conversão e processamento via web.", iconName: "Code2" },
];

const HUB_BENEFITS = [
  { label: "100% gratuito", description: "todas as ferramentas, sem custos ou taxas escondidas.", iconName: "Gift" },
  { label: "Sem cadastro", description: "use imediatamente, sem precisar criar conta.", iconName: "UserX" },
  {
    label: "Funciona em qualquer dispositivo",
    description: "desktop, tablet ou celular — basta um navegador moderno.",
    iconName: "Smartphone",
  },
  {
    label: "Privado e seguro",
    description: "muitas ferramentas processam direto no navegador, sem upload.",
    iconName: "ShieldCheck",
  },
  { label: "Resultados instantâneos", description: "o arquivo fica pronto em segundos, não em minutos.", iconName: "Zap" },
  { label: "Qualidade preservada", description: "tecnologia inteligente mantém legibilidade e aparência.", iconName: "Award" },
  { label: "Open by default", description: "compatível com formatos abertos e padrões da web.", iconName: "Globe" },
];

const HUB_FAQS = [
  {
    question: "Todas as ferramentas do pdfs.com.br são gratuitas?",
    answer:
      "Sim. Todas as ferramentas listadas são 100% gratuitas, sem cadastro obrigatório e sem limite arbitrário de uso por dia. Você pode usar quantas vezes precisar.",
  },
  {
    question: "Preciso instalar algum programa?",
    answer:
      "Não. As ferramentas funcionam direto no navegador, em qualquer dispositivo com acesso à internet. Não é necessário instalar nada no computador ou no celular.",
  },
  {
    question: "Meus arquivos ficam armazenados nos servidores?",
    answer:
      "A maioria das ferramentas processa os arquivos direto no navegador, sem upload para servidor. Quando há upload, os arquivos são removidos automaticamente após o processamento. Privacidade e segurança são prioridade.",
  },
  {
    question: "Posso usar para fins comerciais?",
    answer:
      "Sim. Você pode usar as ferramentas livremente para qualquer finalidade, inclusive trabalho profissional e comercial.",
  },
  {
    question: "As ferramentas funcionam em celulares e tablets?",
    answer:
      "Sim. O site é responsivo e todas as ferramentas funcionam em smartphones (iOS e Android) e tablets, além de desktops.",
  },
  {
    question: "Há limite de tamanho do arquivo?",
    answer:
      "Há um limite por arquivo para garantir performance e estabilidade. Para arquivos muito grandes, considere dividir antes ou usar planos premium quando disponíveis.",
  },
  {
    question: "Como o pdfs.com.br se mantém gratuito?",
    answer:
      "O serviço é mantido por publicidade leve e por planos premium opcionais. O uso básico continua gratuito e ilimitado.",
  },
];

export const AllToolsView = ({ tools, categories, h1Heading, description }: AllToolsViewProps) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://pdfs.com.br";

  const heroTitle = h1Heading || "Todas as Ferramentas Online Grátis";
  const heroIntro =
    description ||
    "pdfs.com.br reúne ferramentas online gratuitas para PDF, imagens, texto, conversões e muito mais. Tudo direto no navegador, sem cadastro e sem instalação. Encontre a ferramenta certa para sua tarefa em segundos.";

  // Map de tools com category populada (para o filter-grid)
  const flatTools = tools
    .filter((t) => t._id && typeof t.category === "object" && t.category)
    .map((t) => {
      const cat = t.category as { _id?: string; name: string; slug: string };
      return {
        _id: t._id as string,
        title: t.title,
        description: t.description,
        link: t.link,
        icon: t.icon,
        iconColor: t.iconColor,
        bgColor: t.bgColor,
        category: {
          _id: cat._id || "",
          name: cat.name,
          slug: cat.slug,
        },
      };
    });

  const filterCategories = categories.map((c) => ({
    _id: (c._id as string) || "",
    name: c.name,
    slug: c.slug,
  }));

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: baseUrl },
          { name: "Ferramentas", url: `${baseUrl}/ferramentas` },
        ]}
      />
      <FAQSchema faqs={HUB_FAQS} />

      <main className="container flex-1 px-4 py-12 md:py-16 mx-auto max-w-6xl">
        {/* Fluxo 1 — Achar uma ferramenta */}
        <div className="space-y-32 md:space-y-40">
          {/* Hero — eyebrow + h1 dominante */}
          <header className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-semibold uppercase tracking-[0.18em]">
              <span className="h-1 w-1 rounded-full bg-primary" aria-hidden />
              Catálogo de ferramentas
            </span>
            <h1 className="mb-5 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">{heroTitle}</h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">{heroIntro}</p>
          </header>

          {/* Categorias em destaque — h2 como section label, não competindo com h1 */}
          {categories.length > 0 && (
            <section>
              <div className="mb-6 md:mb-8 flex items-baseline justify-between gap-4">
                <h2 className="text-xl md:text-2xl font-semibold text-foreground">Categorias</h2>
                <p className="hidden md:block text-sm text-muted-foreground">
                  Cada categoria reúne ferramentas para um tipo de tarefa.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
                {categories.map((cat) => (
                  <CategoryCard
                    key={cat._id as string}
                    name={cat.name}
                    slug={cat.slug}
                    description={cat.description}
                    icon={cat.icon}
                    color={cat.color}
                    toolsCount={cat.toolsCount}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Todas as ferramentas — filter + grid */}
          <section id="todas-ferramentas" className="scroll-mt-24">
            <div className="mb-6 md:mb-8 flex items-baseline justify-between gap-4">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground">Todas as ferramentas</h2>
              <p className="hidden md:block text-sm text-muted-foreground">Filtre por categoria e use direto no navegador.</p>
            </div>
            <ToolsFilterGrid tools={flatTools} categories={filterCategories} />
          </section>
        </div>

        {/* Fluxo 2 — Conhecer o site (educacional / GEO) */}
        <div className="mt-24 md:mt-32 space-y-12 md:space-y-16">
          <section className="rounded-2xl border border-border bg-card p-8 md:p-12 shadow-sm">
            <div className="max-w-3xl mx-auto">
              <div className="text-center">
                <span className="inline-flex items-center gap-2 mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                  <span className="h-1 w-1 rounded-full bg-primary" aria-hidden />
                  Sobre o pdfs.com.br
                </span>
                <h2 className="mb-8 text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                  Ferramentas online para resolver tarefas com arquivos — em segundos
                </h2>
              </div>
              <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  pdfs.com.br nasceu para ser a forma mais simples de trabalhar com arquivos pela web. Você abre o site, escolhe a
                  ferramenta, faz a tarefa e baixa o resultado. Sem instalar programa, sem criar conta, sem esperar e-mail de
                  confirmação.
                </p>
                <p>
                  Cada ferramenta é construída para resolver <strong>uma única coisa muito bem</strong> — comprimir um PDF,
                  converter uma imagem, juntar páginas, limpar metadados — em vez de empilhar funções dentro de uma interface
                  complicada. É a filosofia das ferramentas Unix aplicada ao navegador.
                </p>
                <p>
                  Tudo é gratuito por padrão. Quando faz sentido, oferecemos opções premium para uso intensivo, mas a
                  funcionalidade básica de cada ferramenta continua aberta para qualquer pessoa.
                </p>
              </div>
            </div>
          </section>

          {/* Para quem é + Benefícios */}
          <ToolAudienceBenefits
            audienceTitle="Para quem servem nossas ferramentas"
            audienceIntro="Construímos pdfs.com.br pensando em qualquer pessoa que precise resolver tarefas com arquivos sem fricção. Algumas categorias de uso onde brilhamos:"
            audience={HUB_AUDIENCE}
            benefitsTitle="Por que escolher pdfs.com.br"
            benefitsIntro="Os princípios que guiam cada ferramenta do site:"
            benefits={HUB_BENEFITS}
          />
        </div>

        {/* Fluxo 3 — Tirar dúvidas */}
        <div className="mt-24 md:mt-32 space-y-12 md:space-y-16">
          <section className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
            <h2 className="mb-6 text-2xl md:text-3xl font-bold text-foreground">Perguntas frequentes</h2>
            <ToolFAQ faqs={HUB_FAQS} />
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
                Pronto pra resolver sua tarefa?
              </h2>
              <p className="mb-8 text-base md:text-lg text-primary-foreground/90 leading-relaxed">
                {tools.length > 0
                  ? `${tools.length}+ ferramentas gratuitas, todas direto no navegador. Sem cadastro, sem instalação. Encontre a sua e resolva em segundos.`
                  : "Ferramentas gratuitas, todas direto no navegador. Sem cadastro, sem instalação. Encontre a sua e resolva em segundos."}
              </p>
              <a
                href="#todas-ferramentas"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-foreground text-primary text-sm md:text-base font-semibold shadow-lg shadow-primary-foreground/20 transition-transform hover:scale-105"
              >
                Ver todas as ferramentas
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
      </main>
    </div>
  );
};
