import { Suspense } from "react";
import { unstable_cache } from "next/cache";
import { caller } from "@/trpc/server";
import { tagForTool } from "@/modules/tools/lib/cache";
import { ToolSteps } from "@/modules/tools/ui/components/tool-steps";
import { ToolFAQ } from "@/modules/tools/ui/components/tool-faq";
import { FAQSchema } from "@/modules/tools/ui/components/faq-schema";
import { RelatedTools } from "@/modules/tools/ui/components/related-tools";
import { SoftwareSchema } from "@/modules/tools/ui/components/software-schema";
import { BreadcrumbSchema } from "@/modules/tools/ui/components/breadcrumb-schema";
import { HowToSchema } from "@/modules/tools/ui/components/howto-schema";
import { YouTubeEmbed } from "@/modules/tools/ui/components/youtube-embed";
import { JsonLd } from "@/modules/common/ui/components/json-ld";
import { buildVideoJsonLd } from "@/lib/seo";
import { ToolHeader } from "@/modules/tools/ui/components/tool-header";
import { ToolAudienceBenefits } from "@/modules/tools/ui/components/tool-audience-benefits";
import { ToolLoading } from "@/modules/common/ui/components/tool-loading";
import { Breadcrumb } from "@/modules/common/ui/components/breadcrumb";
import { PDFLibProvider } from "@/modules/common/providers/pdf-lib-provider";
import { InvalidToolSelection } from "@/modules/common/ui/components/invalid-tool-selection";
import { AdPlaceholder } from "@/modules/common/ui/components/ad-placeholder";
import { PostCard } from "@/modules/blog/ui/components/post-card";

interface ToolViewProps {
  toolCategory: string;
  tool: string;
}

interface FeaturedPostSummary {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  publishedAt?: string | Date | null;
  tools?: Array<{ _id: string; title: string }>;
}

export const ToolView = async ({ toolCategory, tool }: ToolViewProps) => {
  if (!toolCategory || !tool) {
    return <InvalidToolSelection />;
  }

  const category = await unstable_cache(
    async () => caller.categories.getCategoryWithTools({ slug: toolCategory }),
    ["tool-category-with-tools-v1", toolCategory, tool],
    { revalidate: 3600, tags: [tagForTool(tool)] },
  )();
  const toolData = category.tools.find((t) => [`/${tool}`, tool].includes(t.link));

  if (!toolData) {
    return <InvalidToolSelection />;
  }

  let featuredPost: FeaturedPostSummary | null = null;
  if (toolData.featuredPostId) {
    try {
      const result = await caller.posts.getByIdPublic({ id: String(toolData.featuredPostId) });
      featuredPost = result as unknown as FeaturedPostSummary;
    } catch {
      featuredPost = null;
    }
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://pdfs.com.br";
    const currentUrl = `${baseUrl}/ferramentas/${toolCategory}/${tool}`;

    const { default: ToolComponent } = await import(`@/modules/tools/ui/components/${tool}`);

    // TECH DEBT (página de ferramenta): os campos abaixo já existem no schema do Tool,
    // mas registros legados podem estar vazios. Quando estiverem, usamos mocks genéricos
    // para preservar o layout SEO/GEO. TODO: backfill no banco para todas as ferramentas
    // (introText, visualSteps, faqs, closingText) e remover esses fallbacks.
    const heroSubtitle =
      toolData.introText ||
      `${toolData.title} é uma ferramenta gratuita online que funciona direto no navegador, sem instalação. Rápida, segura e disponível para qualquer pessoa que precise resolver tarefas com seus arquivos.`;

    const visualSteps =
      toolData.visualSteps && toolData.visualSteps.length > 0
        ? toolData.visualSteps
        : [
            {
              icon: "FileText",
              title: "Envie seu arquivo",
              description: "Clique ou arraste e solte seu arquivo na área de upload.",
              iconColor: "#ffffff",
              bgColor: "hsl(217 91% 60%)",
            },
            {
              icon: "FileText",
              title: "Processamento automático",
              description: "Nossa ferramenta processa seu arquivo na melhor qualidade automaticamente.",
              iconColor: "#ffffff",
              bgColor: "hsl(265 70% 58%)",
            },
            {
              icon: "FileText",
              title: "Baixe o resultado",
              description: "Receba seu arquivo pronto, na hora, para usar onde precisar.",
              iconColor: "#ffffff",
              bgColor: "hsl(145 65% 42%)",
            },
          ];

    const faqs =
      toolData.faqs && toolData.faqs.length > 0
        ? toolData.faqs
        : [
            {
              question: `${toolData.title} é gratuito?`,
              answer: `Sim. ${toolData.title} é totalmente gratuito e pode ser usado quantas vezes quiser, sem cadastro obrigatório.`,
            },
            {
              question: "Preciso criar uma conta para usar?",
              answer: "Não. Você pode usar a ferramenta direto no navegador, sem precisar criar conta nem instalar nada.",
            },
            {
              question: "Meus arquivos ficam armazenados nos seus servidores?",
              answer:
                "Não. Os arquivos são removidos automaticamente após o processamento. Privacidade e segurança são nossas prioridades.",
            },
            {
              question: "Funciona em celulares e tablets?",
              answer: "Sim. A ferramenta funciona em qualquer dispositivo com navegador moderno — desktop, celular ou tablet.",
            },
            {
              question: "Há limite de tamanho do arquivo?",
              answer: "Há um limite por arquivo para garantir performance. Para arquivos maiores, considere planos premium.",
            },
          ];

    const closingText =
      toolData.closingText ||
      `Se você precisa de uma solução simples para usar ${toolData.title.toLowerCase()}, está no lugar certo. Construímos esta ferramenta para ser rápida, confiável e acessível a qualquer pessoa, sem conhecimento técnico ou softwares caros. Experimente agora e resolva sua tarefa em segundos, sem complicação.`;

    // TECH DEBT: bloco "Para quem é" + "Principais benefícios" é puramente mock no momento.
    // Conteúdo crítico para SEO/GEO (citável por IA). Próximo passo: criar campos
    // `audience` e `benefits` no schema Tool e popular via admin por ferramenta.
    const audienceTitle = "Para quem é esta ferramenta";
    const audienceIntro = `Nossa ferramenta de ${toolData.title.toLowerCase()} foi desenhada para qualquer pessoa que precise resolver essa tarefa de forma rápida e eficiente, sem instalar nada. Ela é especialmente útil para:`;
    const audience = [
      {
        label: "Estudantes",
        description: "envie trabalhos e pesquisas sem se preocupar com limites de tamanho.",
        iconName: "GraduationCap",
      },
      { label: "Profissionais", description: "envie documentos e relatórios por e-mail sem complicação.", iconName: "Briefcase" },
      {
        label: "Criadores de conteúdo",
        description: "otimize arquivos para sites mais rápidos e melhor experiência.",
        iconName: "Sparkles",
      },
      {
        label: "Desenvolvedores",
        description: "reduza o peso de assets para aplicações web e produtos digitais.",
        iconName: "Code2",
      },
      {
        label: "Pequenas empresas",
        description: "arquive documentos com eficiência e economize espaço de armazenamento.",
        iconName: "Building2",
      },
    ];

    const benefitsTitle = "Principais benefícios";
    const benefitsIntro = `Veja as vantagens de usar nossa ferramenta gratuita de ${toolData.title.toLowerCase()}:`;
    const benefits = [
      { label: "100% online", description: "não exige instalação, funciona direto no seu navegador.", iconName: "Globe" },
      { label: "Gratuito", description: "uso ilimitado, sem custos e sem taxas escondidas.", iconName: "Gift" },
      { label: "Sem cadastro", description: "comece imediatamente, sem precisar criar uma conta.", iconName: "UserX" },
      {
        label: "Funciona em qualquer dispositivo",
        description: "compatível com desktop, tablet e celular.",
        iconName: "Smartphone",
      },
      { label: "Resultados instantâneos", description: "receba o arquivo pronto em segundos, não em minutos.", iconName: "Zap" },
      {
        label: "Privado e seguro",
        description: "todo o processamento acontece no seu navegador, seus arquivos não saem do dispositivo.",
        iconName: "ShieldCheck",
      },
      {
        label: "Qualidade preservada",
        description: "tecnologia inteligente mantém a legibilidade e a aparência do documento.",
        iconName: "Award",
      },
    ];

    return (
      <div className="bg-muted/40 min-h-screen">
        <SoftwareSchema tool={toolData} url={currentUrl} />
        <BreadcrumbSchema
          items={[
            { name: "Home", url: baseUrl },
            { name: category.name, url: `${baseUrl}/ferramentas/${toolCategory}` },
            { name: toolData.title, url: currentUrl },
          ]}
        />
        <HowToSchema
          toolId={toolData._id as string}
          name={`Como usar ${toolData.title}`}
          description={toolData.seoDescription || toolData.description}
          steps={visualSteps.map((step) => ({ name: step.title, text: step.description }))}
        />

        <div className="container mx-auto max-w-4xl px-4 py-12 md:py-16">
          <Breadcrumb
            className="mb-6"
            items={[
              { label: "Início", href: "/" },
              { label: "Ferramentas", href: "/ferramentas" },
              { label: category.name, href: `/ferramentas/${toolCategory}` },
              { label: toolData.title },
            ]}
          />

          {/* Fluxo 1 — A ferramenta em si */}
          <div className="space-y-12 md:space-y-16">
            {/* Hero */}
            <ToolHeader
              title={toolData.h1Heading || toolData.title}
              introText={heroSubtitle}
              iconName={toolData.icon || undefined}
              iconColor={toolData.iconColor || undefined}
              bgColor={toolData.bgColor || undefined}
            />

            {/* Ad - Top (logo após hero, antes do tool card) */}
            <AdPlaceholder position="top" />

            {/* Tool card (upload + processamento) */}
            <section className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
              <Suspense fallback={<ToolLoading />}>
                <PDFLibProvider>
                  <ToolComponent />
                </PDFLibProvider>
              </Suspense>
            </section>

            {toolData.videoId && (
              <section className="space-y-4">
                <h2 className="text-xl md:text-2xl font-bold text-foreground">Veja como usar em vídeo</h2>
                <YouTubeEmbed videoId={toolData.videoId} title={toolData.videoTitle || toolData.title} />
                {toolData.videoUploadDate && toolData.videoDurationISO && (
                  <JsonLd
                    id={`ld-video-${toolData._id}`}
                    data={buildVideoJsonLd({
                      name: toolData.videoTitle || toolData.title,
                      description: toolData.videoDescription || toolData.description,
                      thumbnailUrl: toolData.videoThumbnailUrl || `https://i.ytimg.com/vi/${toolData.videoId}/hqdefault.jpg`,
                      uploadDate: toolData.videoUploadDate,
                      durationISO: toolData.videoDurationISO,
                      embedUrl: `https://www.youtube.com/embed/${toolData.videoId}`,
                    })}
                  />
                )}
              </section>
            )}
          </div>

          {/* Fluxo 2 — Educacional / explicativo */}
          <div className="mt-24 md:mt-32 space-y-12 md:space-y-16">
            {/* Como Funciona (visual steps) — sem card, deixa os círculos coloridos respirarem */}
            <section className="px-2 md:px-4 py-4 md:py-6">
              <h2 className="mb-6 text-center text-xl md:text-2xl font-bold text-foreground">
                {toolData.stepsTitle || `Como funciona ${toolData.title}`}
              </h2>
              <ToolSteps steps={visualSteps} />
            </section>

            {/* Para quem é + Principais benefícios (SEO/GEO citável) */}
            <ToolAudienceBenefits
              audienceTitle={audienceTitle}
              audienceIntro={audienceIntro}
              audience={audience}
              benefitsTitle={benefitsTitle}
              benefitsIntro={benefitsIntro}
              benefits={benefits}
            />

            {/* SEO Content */}
            {toolData.richContent && (
              <section className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
                <div
                  className="prose prose-lg dark:prose-invert max-w-none
                    [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-4
                    [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-3
                    [&_p]:text-base [&_p]:my-3 [&_p]:leading-relaxed
                    [&_ul]:list-disc! [&_ul]:pl-6! [&_ul]:my-3!
                    [&_ol]:list-decimal! [&_ol]:pl-6! [&_ol]:my-3!
                    [&_li]:my-1.5! [&_li]:list-item!
                    [&_strong]:font-semibold [&_em]:italic
                    [&_a]:text-primary [&_a]:underline"
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: Content is from trusted admin
                  dangerouslySetInnerHTML={{ __html: toolData.richContent }}
                />
              </section>
            )}

            {/* Aprenda mais */}
            {featuredPost && (
              <section>
                <h2 className="mb-6 text-xl md:text-2xl font-bold text-foreground">Aprenda mais</h2>
                <div className="grid grid-cols-1 gap-6 md:max-w-md">
                  <PostCard post={featuredPost} />
                </div>
              </section>
            )}
          </div>

          {/* Fluxo 3 — Confiança / fechamento (FAQ, closing, related) */}
          <div className="mt-24 md:mt-32 space-y-12 md:space-y-16">
            {/* FAQs */}
            <section className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
              <h2 className="mb-6 text-xl md:text-2xl font-bold text-foreground">Perguntas Frequentes</h2>
              <ToolFAQ faqs={faqs} />
              <FAQSchema faqs={faqs} />
            </section>

            {/* Closing Text — prosa solta, sem card, para variar ritmo após FAQ */}
            <section className="px-2 md:px-4 py-2">
              <p className="text-base leading-relaxed text-muted-foreground max-w-3xl">{closingText}</p>
            </section>

            {/* Related Tools */}
            <RelatedTools currentToolId={toolData._id as string} tools={category.tools} categorySlug={toolCategory} />
          </div>

          <div className="mt-12 md:mt-16">
            <AdPlaceholder position="bottom" />
          </div>
        </div>
      </div>
    );
  } catch {
    return <InvalidToolSelection />;
  }
};
