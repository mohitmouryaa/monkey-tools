import Link from "next/link";
import { ArrowRight, Building2, Cloud, Code2, FileStack, Lock, Server, ShieldCheck, Sparkles, Workflow } from "lucide-react";
import { Button } from "@workspace/ui/components/button";

const USE_CASES = [
  {
    icon: FileStack,
    title: "Volume em escala",
    description:
      "Processe milhares de documentos por dia — conversão, compressão, OCR, extração — sem ficar refém de planos por arquivo.",
  },
  {
    icon: Workflow,
    title: "Automação por API",
    description:
      "Endpoints REST e webhooks para integrar conversão de PDF, manipulação de imagens e extração de texto direto no seu fluxo.",
  },
  {
    icon: Code2,
    title: "White-label e SDK",
    description:
      "Embarque as ferramentas no seu produto com a sua marca. SDK em JavaScript, Python e exemplos prontos pros principais frameworks.",
  },
  {
    icon: Cloud,
    title: "Implantação dedicada",
    description:
      "Para clientes com requisitos de soberania de dados ou compliance: instância dedicada em região brasileira, com isolamento total.",
  },
];

const PILLARS = [
  {
    icon: ShieldCheck,
    title: "Segurança em primeiro lugar",
    description:
      "Arquivos processados em ambiente isolado, removidos após o processamento, transporte criptografado e controles de acesso por chave de API.",
  },
  {
    icon: Server,
    title: "Performance previsível",
    description:
      "Infraestrutura otimizada pra alto throughput, com SLA contratual de disponibilidade e latência. Filas dedicadas pra picos de demanda.",
  },
  {
    icon: Lock,
    title: "Compliance e LGPD",
    description:
      "Tratamento de dados aderente à LGPD, contratos formais (DPA), opção de retenção zero e relatórios de auditoria sob demanda.",
  },
  {
    icon: Sparkles,
    title: "Suporte humano",
    description:
      "Time técnico em português, canais dedicados (Slack, e-mail, telefone) e onboarding guiado pra você sair do zero ao produção rápido.",
  },
];

export const EmpresasView = () => {
  return (
    <div className="bg-background">
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 py-20 md:py-28 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground mb-6">
            <Building2 className="h-3.5 w-3.5" aria-hidden />
            Soluções para empresas
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
            Manipulação de documentos em escala — para o seu produto e o seu time
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Mais de 30 ferramentas de PDF, imagem e documento, prontas pra rodar como API ou embarcadas no seu produto. Construído
            no Brasil, em português, com infraestrutura próxima dos seus clientes.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link href="mailto:contato@pdfs.com.br?subject=Solu%C3%A7%C3%B5es%20Empresariais">
                Falar com a gente
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/ferramentas">Ver as ferramentas</Link>
            </Button>
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            Ofertas B2B em fase de pré-lançamento. Cadastre-se pra entrar na lista de pioneiros.
          </p>
        </div>
      </section>

      <section className="container max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-24">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">Para quem é</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Quatro modos de levar nossa stack pro seu negócio
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {USE_CASES.map((item) => (
            <article
              key={item.title}
              className="group relative rounded-2xl border border-border/60 bg-card p-6 md:p-8 transition-all hover:border-primary/40 hover:shadow-lg"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <item.icon className="h-5 w-5" aria-hidden />
                </span>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border/60 bg-muted/30">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-24">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">Por que pdfs.com.br</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Construído pra rodar onde os seus dados estão
            </h2>
            <p className="mt-4 text-base text-muted-foreground max-w-2xl mx-auto">
              Concorrentes globais mandam seus arquivos pro outro lado do mundo. A gente roda em infraestrutura brasileira, com
              contratos em português, suporte no seu fuso e compliance LGPD por padrão.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PILLARS.map((item) => (
              <article key={item.title} className="rounded-2xl border border-border/60 bg-background p-6 md:p-7">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                  <item.icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container max-w-3xl mx-auto px-4 sm:px-6 py-20 md:py-28 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-5">Quer integrar antes de todo mundo?</h2>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Estamos selecionando empresas pra desenhar a primeira versão da API e do programa de parceiros. Conta pra gente seu caso
          de uso — a gente responde em até 1 dia útil.
        </p>
        <Button asChild size="lg">
          <Link href="mailto:contato@pdfs.com.br?subject=Solu%C3%A7%C3%B5es%20Empresariais">
            Falar com o time
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
          </Link>
        </Button>
      </section>
    </div>
  );
};
