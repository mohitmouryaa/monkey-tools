"use client";

import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useQuery } from "@tanstack/react-query";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import {
  ArrowLeft,
  Edit,
  ExternalLink,
  Code,
  Link as LinkIcon,
  Eye,
  EyeOff,
  Calendar,
  Layers,
  MessageCircleQuestion,
  Palette,
  Sparkles,
  Hash,
  FileText,
  BookOpen,
  Type,
  Wrench,
  Star,
  Search,
  Tag,
} from "lucide-react";
import { PostStatus } from "@workspace/types";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@workspace/ui/components/accordion";
import { useTRPC } from "@/trpc/client";
import { useUpdateTool } from "@/modules/dashboard/hooks/use-update-tool";
import { useSuspenseTool } from "@/modules/dashboard/hooks/use-suspense-tools";
import { ToolForm, type ToolFormValues } from "@/modules/dashboard/ui/components/tool-form";

interface ToolViewProps {
  id: string;
}

const POST_STATUS_LABEL: Record<PostStatus, string> = {
  [PostStatus.DRAFT]: "Rascunho",
  [PostStatus.SCHEDULED]: "Agendado",
  [PostStatus.PUBLISHED]: "Publicado",
};

const buildPublicUrl = (link: string, categorySlug?: string | null) => {
  if (!link) return "";
  if (!categorySlug) return link.startsWith("/") ? link : `/${link}`;
  const linkPart = link.startsWith("/") ? link : `/${link}`;
  return `/ferramentas/${categorySlug}${linkPart}`;
};

const countWords = (html?: string | null) => {
  if (!html) return 0;
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
};

const SectionHeader = ({
  icon: Icon,
  label,
  meta,
}: {
  icon?: React.ComponentType<{ className?: string }>;
  label: string;
  meta?: React.ReactNode;
}) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between gap-3">
      <h2 className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-muted-foreground">
        {Icon && <Icon className="size-3.5" />}
        {label}
      </h2>
      {meta && <div className="text-xs font-mono text-muted-foreground">{meta}</div>}
    </div>
    <div className="h-px bg-linear-to-r from-border via-border/50 to-transparent" />
  </div>
);

const Field = ({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) => (
  <div className="space-y-2">
    <dt className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
      {Icon && <Icon className="size-3" />}
      {label}
    </dt>
    <dd className="text-sm leading-relaxed text-foreground">{children}</dd>
  </div>
);

const EmptyValue = ({ label = "Não configurado" }: { label?: string }) => (
  <span className="italic text-sm text-muted-foreground/60">{label}</span>
);

interface FeaturedPostData {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  status: PostStatus;
  publishedAt?: string | Date | null;
}

const FeaturedPostCard = ({ id }: { id: string }) => {
  const trpc = useTRPC();
  const {
    data: rawData,
    isLoading,
    isError,
  } = useQuery({
    ...trpc.posts.getById.queryOptions({ id }),
    staleTime: 30_000,
  });
  const data = rawData as unknown as FeaturedPostData | undefined;

  if (isLoading) {
    return (
      <div className="space-y-3 animate-pulse">
        <div className="aspect-video w-full bg-muted/50 rounded-md" />
        <div className="space-y-2">
          <div className="h-4 w-3/4 bg-muted/50 rounded" />
          <div className="h-3 w-1/2 bg-muted/50 rounded" />
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return <EmptyValue label="Post não encontrado" />;
  }

  const status = data.status as PostStatus;
  const isPublished = status === PostStatus.PUBLISHED;

  return (
    <Link href={`/dashboard/posts/${data._id}`} className="block space-y-3 group">
      {data.coverImage && (
        <div className="relative w-full overflow-hidden rounded-md aspect-video bg-muted/30 ring-1 ring-border/50">
          {/* biome-ignore lint/performance/noImgElement: domínios externos não configurados no next/image */}
          <img
            src={data.coverImage}
            alt={data.title}
            className="absolute inset-0 object-cover w-full h-full transition-transform group-hover:scale-105"
          />
        </div>
      )}
      <div className="space-y-1.5">
        <h3 className="text-sm font-medium leading-snug transition-colors text-foreground line-clamp-2 group-hover:text-primary">
          {data.title}
        </h3>
        {data.excerpt && <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">{data.excerpt}</p>}
        <div className="flex items-center gap-2 pt-1">
          <Badge variant={isPublished ? "default" : "outline"} className="text-[10px] font-normal h-5">
            {POST_STATUS_LABEL[status] ?? status}
          </Badge>
          {data.publishedAt && (
            <span className="text-[10px] text-muted-foreground">
              {format(new Date(data.publishedAt), "d MMM yyyy", { locale: ptBR })}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export const ToolView = ({ id }: ToolViewProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const tool = useSuspenseTool(id);
  const updateTool = useUpdateTool();

  const handleUpdate = (values: ToolFormValues) => {
    updateTool.mutate(
      { id, data: values },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      },
    );
  };

  const toolData = tool.data;

  if (isEditing) {
    const editPublicUrl = buildPublicUrl(toolData.link, toolData.category?.slug);
    return (
      <div className="min-h-screen bg-background">
        <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <nav aria-label="Navegação" className="flex items-center gap-2 mb-6 text-xs font-medium text-muted-foreground">
            <Link href="/dashboard" className="transition-colors hover:text-foreground">
              Dashboard
            </Link>
            <span aria-hidden>/</span>
            <Link href="/dashboard/tools" className="transition-colors hover:text-foreground">
              Ferramentas
            </Link>
            <span aria-hidden>/</span>
            <Link
              href={`/dashboard/tools/${id}`}
              className="transition-colors hover:text-foreground line-clamp-1 max-w-[200px]"
              onClick={(e) => {
                e.preventDefault();
                setIsEditing(false);
              }}
            >
              {toolData.title}
            </Link>
            <span aria-hidden>/</span>
            <span className="text-foreground">Editar</span>
          </nav>

          <header className="flex flex-col gap-4 pb-6 mb-8 border-b sm:flex-row sm:items-end sm:justify-between border-border/50">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center justify-center transition-all rounded-lg group size-10 hover:bg-muted"
                aria-label="Voltar"
                type="button"
              >
                <ArrowLeft className="w-5 h-5 transition-colors text-muted-foreground group-hover:text-foreground" />
              </button>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold tracking-tight md:text-3xl text-foreground">Editar ferramenta</h2>
                  <Badge variant="secondary" className="font-normal">
                    {toolData.title}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">Ajustes salvos atualizam a página pública imediatamente.</p>
              </div>
            </div>

            {editPublicUrl && (
              <Button asChild variant="outline" size="sm" className="gap-2">
                <Link href={editPublicUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                  Ver ao vivo
                </Link>
              </Button>
            )}
          </header>

          <ToolForm
            defaultValues={(() => {
              const { videoUploadDate, ...rest } = toolData;
              return {
                ...rest,
                categoryId: toolData.category?._id || "",
                seoTitle: toolData.seoTitle || "",
                seoDescription: toolData.seoDescription || "",
                seoKeywords: toolData.seoKeywords || "",
                h1Heading: toolData.h1Heading || "",
                introText: toolData.introText || "",
                stepsTitle: toolData.stepsTitle || "",
                visualSteps: toolData.visualSteps || [],
                richContent: toolData.richContent || "",
                faqs: toolData.faqs || [],
                closingText: toolData.closingText || "",
                videoId: toolData.videoId || "",
                videoTitle: toolData.videoTitle || "",
                videoDescription: toolData.videoDescription || "",
                videoThumbnailUrl: toolData.videoThumbnailUrl || "",
                videoUploadDate: videoUploadDate ? new Date(videoUploadDate).toISOString().slice(0, 10) : "",
                videoDurationISO: toolData.videoDurationISO || "",
                featuredPostId: toolData.featuredPostId ? String(toolData.featuredPostId) : null,
              };
            })()}
            onSubmit={handleUpdate}
            onCancel={() => setIsEditing(false)}
            submitLabel="Salvar Alterações"
            disabled={updateTool.isPending}
          />
        </div>
      </div>
    );
  }

  const keywords =
    toolData.seoKeywords
      ?.split(",")
      .map((k) => k.trim())
      .filter(Boolean) || [];
  const visualSteps = toolData.visualSteps || [];
  const faqs = toolData.faqs || [];
  const featuredPostId = toolData.featuredPostId ? String(toolData.featuredPostId) : null;
  const richWordCount = countWords(toolData.richContent);
  const publicUrl = buildPublicUrl(toolData.link, toolData.category?.slug);

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Navegação" className="flex items-center gap-2 mb-6 text-xs font-medium text-muted-foreground">
          <Link href="/dashboard" className="transition-colors hover:text-foreground">
            Dashboard
          </Link>
          <span aria-hidden>/</span>
          <Link href="/dashboard/tools" className="transition-colors hover:text-foreground">
            Ferramentas
          </Link>
          <span aria-hidden>/</span>
          <span className="text-foreground line-clamp-1 max-w-[260px]">{toolData.title}</span>
        </nav>

        {/* Top bar */}
        <div className="flex items-center justify-between mb-12">
          <Link
            href="/dashboard/tools"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors group text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Voltar para Ferramentas
          </Link>
          <div className="flex items-center gap-2">
            {publicUrl && (
              <Button asChild variant="outline" size="sm" className="gap-2">
                <Link href={publicUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                  Ver ao vivo
                </Link>
              </Button>
            )}
            <Button onClick={() => setIsEditing(true)} size="sm" className="gap-2 transition-all shadow-sm hover:shadow">
              <Edit className="w-4 h-4" />
              Editar
            </Button>
          </div>
        </div>

        {/* Hero header */}
        <header className="pb-12 mb-16 border-b border-border/50">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div
              className="flex items-center justify-center rounded-2xl size-20 shrink-0 ring-1 ring-border/50"
              style={{ backgroundColor: toolData.bgColor || undefined }}
            >
              {toolData.icon ? (
                <DynamicIcon
                  name={toolData.icon as IconName}
                  className="size-10"
                  style={{ color: toolData.iconColor || undefined }}
                  fallback={() => <Wrench className="size-10 text-muted-foreground" />}
                />
              ) : (
                <Wrench className="size-10 text-muted-foreground" />
              )}
            </div>

            <div className="flex-1 min-w-0 space-y-5">
              <div className="space-y-3">
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl text-foreground">{toolData.title}</h1>
                {toolData.description && (
                  <p className="max-w-3xl text-base leading-relaxed md:text-lg text-muted-foreground">{toolData.description}</p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Badge variant={toolData.isActive ? "default" : "outline"} className="gap-1.5">
                  {toolData.isActive ? <Eye className="size-3" /> : <EyeOff className="size-3" />}
                  {toolData.isActive ? "Publicada" : "Rascunho"}
                </Badge>
                {toolData.category?.name && (
                  <Badge variant="secondary" className="gap-1.5 font-normal">
                    <Tag className="size-3" />
                    {toolData.category.name}
                  </Badge>
                )}
                {toolData.link && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded-md bg-muted/50 text-muted-foreground">
                    <LinkIcon className="size-3" />
                    {toolData.link}
                  </span>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Content grid */}
        <div className="grid gap-x-12 gap-y-16 lg:grid-cols-3">
          {/* Main column */}
          <div className="space-y-16 lg:col-span-2">
            {/* Identidade Visual */}
            <section className="space-y-6">
              <SectionHeader icon={Palette} label="Identidade Visual" />
              <dl className="grid gap-6 sm:grid-cols-3">
                <Field label="Ícone" icon={Sparkles}>
                  {toolData.icon ? <span className="font-mono">{toolData.icon}</span> : <EmptyValue />}
                </Field>
                <Field label="Cor do Ícone">
                  {toolData.iconColor ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="size-5 rounded ring-1 ring-border/50" style={{ backgroundColor: toolData.iconColor }} />
                      <span className="font-mono uppercase">{toolData.iconColor}</span>
                    </span>
                  ) : (
                    <EmptyValue />
                  )}
                </Field>
                <Field label="Cor de Fundo">
                  {toolData.bgColor ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="size-5 rounded ring-1 ring-border/50" style={{ backgroundColor: toolData.bgColor }} />
                      <span className="font-mono uppercase">{toolData.bgColor}</span>
                    </span>
                  ) : (
                    <EmptyValue />
                  )}
                </Field>
              </dl>
            </section>

            {/* Conteúdo da Página */}
            <section className="space-y-8">
              <SectionHeader icon={FileText} label="Conteúdo da Página" />

              <Field label="Título H1" icon={Hash}>
                {toolData.h1Heading ? (
                  <span className="text-base font-medium">{toolData.h1Heading}</span>
                ) : (
                  <EmptyValue label="Usa o título da ferramenta como H1" />
                )}
              </Field>

              <Field label="Texto de Introdução" icon={Type}>
                {toolData.introText ? <p className="leading-relaxed">{toolData.introText}</p> : <EmptyValue />}
              </Field>

              <div className="space-y-4">
                <div className="flex items-end justify-between gap-3">
                  <Field label={toolData.stepsTitle ? "Título da Seção" : "Como Funciona"} icon={Layers}>
                    {toolData.stepsTitle ? (
                      <span className="font-medium">{toolData.stepsTitle}</span>
                    ) : (
                      <EmptyValue label="Título padrão" />
                    )}
                  </Field>
                  <span className="text-xs font-mono text-muted-foreground shrink-0">
                    {visualSteps.length} {visualSteps.length === 1 ? "passo" : "passos"}
                  </span>
                </div>
                {visualSteps.length > 0 ? (
                  <ol className="space-y-3">
                    {visualSteps.map((step, i) => (
                      <li
                        key={`${step.title}-${i}`}
                        className="flex gap-4 p-4 transition-colors border rounded-lg border-border/50 bg-card/30 hover:bg-card/60"
                      >
                        <div
                          className="flex items-center justify-center rounded-md size-10 shrink-0 ring-1 ring-border/30"
                          style={{ backgroundColor: step.bgColor || undefined }}
                        >
                          {step.icon ? (
                            <DynamicIcon
                              name={step.icon as IconName}
                              className="size-5"
                              style={{ color: step.iconColor || undefined }}
                              fallback={() => <Hash className="size-5 text-muted-foreground" />}
                            />
                          ) : (
                            <Hash className="size-5 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                            <h4 className="font-medium text-foreground">{step.title}</h4>
                          </div>
                          {step.description && (
                            <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <EmptyValue label="Nenhum passo configurado" />
                )}
              </div>

              <div className="space-y-3">
                <dt className="flex items-center justify-between gap-2 text-xs font-medium text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <BookOpen className="size-3" />
                    Conteúdo Rico
                  </span>
                  {richWordCount > 0 && (
                    <span className="font-mono">
                      {richWordCount} palavra{richWordCount === 1 ? "" : "s"}
                    </span>
                  )}
                </dt>
                {toolData.richContent ? (
                  <div
                    // biome-ignore lint/security/noDangerouslySetInnerHtml: HTML produzido pelo editor TipTap controlado
                    dangerouslySetInnerHTML={{ __html: toolData.richContent }}
                    className="max-w-none prose prose-sm dark:prose-invert prose-headings:text-foreground prose-headings:font-semibold prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-ul:text-muted-foreground prose-ol:text-muted-foreground"
                  />
                ) : (
                  <EmptyValue label="Sem conteúdo rico" />
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-end justify-between gap-3">
                  <dt className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    <MessageCircleQuestion className="size-3" />
                    Perguntas Frequentes
                  </dt>
                  <span className="text-xs font-mono text-muted-foreground shrink-0">
                    {faqs.length} {faqs.length === 1 ? "pergunta" : "perguntas"}
                  </span>
                </div>
                {faqs.length > 0 ? (
                  <Accordion type="multiple" className="border-t border-border/50">
                    {faqs.map((faq, i) => (
                      <AccordionItem key={`${faq.question}-${i}`} value={String(i)} className="border-border/50">
                        <AccordionTrigger className="text-sm font-medium text-left hover:no-underline">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <EmptyValue label="Nenhuma FAQ configurada" />
                )}
              </div>

              <Field label="Texto de Encerramento" icon={Sparkles}>
                {toolData.closingText ? <p className="leading-relaxed">{toolData.closingText}</p> : <EmptyValue />}
              </Field>
            </section>

            {/* SEO */}
            <section className="space-y-6">
              <SectionHeader icon={Search} label="Otimização para Mecanismos de Busca" />
              <dl className="space-y-6">
                <Field label="Título SEO">
                  {toolData.seoTitle ? <span className="text-base font-medium">{toolData.seoTitle}</span> : <EmptyValue />}
                </Field>
                <Field label="Meta Descrição">{toolData.seoDescription || <EmptyValue />}</Field>
                <Field label="Palavras-chave">
                  {keywords.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {keywords.map((keyword) => (
                        <span
                          key={keyword}
                          className="inline-flex items-center px-3 py-1 text-xs font-medium transition-colors rounded-md text-foreground/80 bg-muted/50 hover:bg-muted"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <EmptyValue />
                  )}
                </Field>
              </dl>
            </section>

            {/* Configuração Técnica */}
            <section className="space-y-6">
              <SectionHeader icon={Code} label="Configuração Técnica" />
              <dl className="grid gap-6 sm:grid-cols-2">
                <Field label="Nome do Componente" icon={Code}>
                  <span className="font-mono">{toolData.componentName}</span>
                </Field>
                <Field label="Rota" icon={LinkIcon}>
                  <div className="flex items-center gap-2">
                    <span className="font-mono">{toolData.link}</span>
                    {publicUrl && (
                      <Link
                        href={publicUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:opacity-70"
                        aria-label="Abrir ferramenta"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Link>
                    )}
                  </div>
                </Field>
              </dl>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-12">
            <section className="space-y-6">
              <SectionHeader label="Resumo" />
              <dl className="space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-border/30">
                  <dt className="text-sm font-medium text-muted-foreground">Situação</dt>
                  <dd
                    className={`text-sm font-semibold ${
                      toolData.isActive ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"
                    }`}
                  >
                    {toolData.isActive ? "Publicada" : "Rascunho"}
                  </dd>
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-border/30">
                  <dt className="text-sm font-medium text-muted-foreground">Categoria</dt>
                  <dd className="text-sm font-medium text-right text-foreground">
                    {toolData.category?.name || <EmptyValue label="Nenhuma" />}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm font-medium text-muted-foreground">ID</dt>
                  <dd className="font-mono text-xs text-muted-foreground">{toolData._id.slice(-12)}</dd>
                </div>
              </dl>
            </section>

            <section className="space-y-6">
              <SectionHeader icon={Calendar} label="Cronologia" />
              <dl className="space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-border/30">
                  <dt className="text-sm font-medium text-muted-foreground">Criada em</dt>
                  <dd className="text-sm text-right text-foreground">
                    {toolData.createdAt ? format(new Date(toolData.createdAt), "d MMM yyyy", { locale: ptBR }) : "—"}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm font-medium text-muted-foreground">Atualizada em</dt>
                  <dd className="text-sm text-right text-foreground">
                    {toolData.updatedAt ? format(new Date(toolData.updatedAt), "d MMM yyyy 'às' HH:mm", { locale: ptBR }) : "—"}
                  </dd>
                </div>
              </dl>
            </section>

            <section className="space-y-6">
              <SectionHeader icon={Star} label="Post em Destaque" />
              {featuredPostId ? <FeaturedPostCard id={featuredPostId} /> : <EmptyValue label="Nenhum post vinculado" />}
            </section>

            <section className="space-y-6">
              <SectionHeader label="Métricas de Conteúdo" />
              <dl className="grid grid-cols-3 gap-3">
                <div className="p-3 text-center border rounded-md border-border/50 bg-card/30">
                  <dd className="text-xl font-semibold tabular-nums text-foreground">{visualSteps.length}</dd>
                  <dt className="mt-1 text-[10px] font-medium tracking-wider uppercase text-muted-foreground">Passos</dt>
                </div>
                <div className="p-3 text-center border rounded-md border-border/50 bg-card/30">
                  <dd className="text-xl font-semibold tabular-nums text-foreground">{faqs.length}</dd>
                  <dt className="mt-1 text-[10px] font-medium tracking-wider uppercase text-muted-foreground">FAQs</dt>
                </div>
                <div className="p-3 text-center border rounded-md border-border/50 bg-card/30">
                  <dd className="text-xl font-semibold tabular-nums text-foreground">{richWordCount}</dd>
                  <dt className="mt-1 text-[10px] font-medium tracking-wider uppercase text-muted-foreground">Palavras</dt>
                </div>
              </dl>
            </section>

            <section className="space-y-4">
              <SectionHeader label="Ações Rápidas" />
              <div className="flex flex-col">
                {publicUrl && (
                  <Link
                    href={publicUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between px-1 py-3 text-sm font-medium transition-colors border-b text-foreground border-border/30 hover:bg-muted/50"
                  >
                    Ver ferramenta ao vivo
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </Link>
                )}
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center justify-between px-1 py-3 text-sm font-medium transition-colors text-foreground hover:bg-muted/50"
                >
                  Editar ferramenta
                  <Edit className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
};
