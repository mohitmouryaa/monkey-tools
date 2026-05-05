import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  ArrowLeft,
  Calendar,
  ExternalLink,
  Eye,
  EyeOff,
  Folder,
  Hash,
  Palette,
  Sparkles,
  Tag,
  Type,
} from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import type { caller } from "@/trpc/server";
import { DashboardBreadcrumb } from "@/modules/common/ui/components/dashboard-breadcrumb";
import { CategoryActions } from "@/modules/dashboard/ui/components/category-actions";

export type CategoryDto = Awaited<ReturnType<typeof caller.categories.getOne>>;

interface CategoryViewProps {
  category: CategoryDto;
}

const HEX_RE = /^#[0-9a-fA-F]{6}$/;

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
      {meta && <div className="font-mono text-xs text-muted-foreground">{meta}</div>}
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
  <span className="text-sm italic text-muted-foreground/60">{label}</span>
);

export const CategoryView = ({ category }: CategoryViewProps) => {
  const safeColor = HEX_RE.test(category.color || "") ? category.color : "#6366f1";
  const publicUrl = category.slug ? `/ferramentas/${category.slug}` : "";

  const createdAt = (category as { createdAt?: string | Date }).createdAt;
  const updatedAt = (category as { updatedAt?: string | Date }).updatedAt;

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <DashboardBreadcrumb
          className="mb-6"
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Categorias", href: "/dashboard/categories" },
            { label: category.name },
          ]}
        />

        <div className="flex flex-col gap-3 mb-12 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/dashboard/categories"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors group text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Voltar para Categorias
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
            <CategoryActions id={category._id} name={category.name} variant="toolbar" />
          </div>
        </div>

        <header className="pb-12 mb-16 border-b border-border/50">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div
              className="flex items-center justify-center rounded-2xl size-20 shrink-0 ring-1 ring-border/50"
              style={{ backgroundColor: `${safeColor}1a` }}
            >
              <DynamicIcon
                name={(category.icon || "folder") as IconName}
                className="size-10"
                style={{ color: safeColor }}
                fallback={() => <Folder className="size-10" style={{ color: safeColor }} />}
              />
            </div>

            <div className="flex-1 min-w-0 space-y-5">
              <div className="space-y-3">
                <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">{category.name}</h1>
                {category.description && (
                  <p className="max-w-3xl text-base leading-relaxed md:text-lg text-muted-foreground">
                    {category.description}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Badge variant={category.isActive ? "default" : "outline"} className="gap-1.5">
                  {category.isActive ? <Eye className="size-3" /> : <EyeOff className="size-3" />}
                  {category.isActive ? "Publicada" : "Rascunho"}
                </Badge>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded-md bg-muted/50 text-muted-foreground">
                  <Hash className="size-3" />
                  {category.slug}
                </span>
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded-md"
                  style={{ backgroundColor: `${safeColor}1a`, color: safeColor }}
                >
                  <span className="rounded-full size-2" style={{ backgroundColor: safeColor }} />
                  {safeColor.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="grid gap-x-12 gap-y-16 lg:grid-cols-3">
          <div className="space-y-16 lg:col-span-2">
            <section className="space-y-6">
              <SectionHeader icon={Tag} label="Identidade" />
              <dl className="grid gap-6 sm:grid-cols-2">
                <Field label="Nome" icon={Type}>
                  <span className="font-medium">{category.name}</span>
                </Field>
                <Field label="Slug" icon={Hash}>
                  <span className="font-mono">{category.slug}</span>
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Descrição">
                    {category.description ? (
                      <p className="leading-relaxed">{category.description}</p>
                    ) : (
                      <EmptyValue label="Sem descrição" />
                    )}
                  </Field>
                </div>
              </dl>
            </section>

            <section className="space-y-6">
              <SectionHeader icon={Palette} label="Aparência" />
              <dl className="grid gap-6 sm:grid-cols-2">
                <Field label="Ícone" icon={Sparkles}>
                  {category.icon ? (
                    <span className="inline-flex items-center gap-2">
                      <span
                        className="flex items-center justify-center rounded-md size-8 ring-1 ring-border/40"
                        style={{ backgroundColor: `${safeColor}1a` }}
                      >
                        <DynamicIcon
                          name={category.icon as IconName}
                          className="size-4"
                          style={{ color: safeColor }}
                          fallback={() => <Folder className="size-4" style={{ color: safeColor }} />}
                        />
                      </span>
                      <span className="font-mono">{category.icon}</span>
                    </span>
                  ) : (
                    <EmptyValue />
                  )}
                </Field>
                <Field label="Cor">
                  <span className="inline-flex items-center gap-2">
                    <span className="rounded size-5 ring-1 ring-border/50" style={{ backgroundColor: safeColor }} />
                    <span className="font-mono uppercase">{safeColor}</span>
                  </span>
                </Field>
              </dl>
            </section>

            <section className="space-y-6">
              <SectionHeader icon={Eye} label="Visibilidade" />
              <div className="flex items-start justify-between gap-4 p-4 border rounded-lg shadow-sm">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">
                    {category.isActive ? "Categoria publicada" : "Categoria em rascunho"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {category.isActive
                      ? "Visível para os usuários no site público."
                      : "Oculta do site público — só você consegue ver."}
                  </p>
                </div>
                <Badge variant={category.isActive ? "default" : "outline"} className="gap-1.5 shrink-0">
                  {category.isActive ? <Eye className="size-3" /> : <EyeOff className="size-3" />}
                  {category.isActive ? "Publicada" : "Rascunho"}
                </Badge>
              </div>
            </section>
          </div>

          <aside className="space-y-12">
            <section className="space-y-6">
              <SectionHeader label="Resumo" />
              <dl className="space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-border/30">
                  <dt className="text-sm font-medium text-muted-foreground">Situação</dt>
                  <dd
                    className={`text-sm font-semibold ${
                      category.isActive ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"
                    }`}
                  >
                    {category.isActive ? "Publicada" : "Rascunho"}
                  </dd>
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-border/30">
                  <dt className="text-sm font-medium text-muted-foreground">Slug</dt>
                  <dd className="font-mono text-sm text-right text-foreground">{category.slug}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm font-medium text-muted-foreground">ID</dt>
                  <dd className="font-mono text-xs text-muted-foreground">{category._id.slice(-12)}</dd>
                </div>
              </dl>
            </section>

            <section className="space-y-6">
              <SectionHeader icon={Calendar} label="Cronologia" />
              <dl className="space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-border/30">
                  <dt className="text-sm font-medium text-muted-foreground">Criada em</dt>
                  <dd className="text-sm text-right text-foreground">
                    {createdAt ? format(new Date(createdAt), "d MMM yyyy", { locale: ptBR }) : "—"}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm font-medium text-muted-foreground">Atualizada em</dt>
                  <dd className="text-sm text-right text-foreground">
                    {updatedAt ? format(new Date(updatedAt), "d MMM yyyy 'às' HH:mm", { locale: ptBR }) : "—"}
                  </dd>
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
                    Ver categoria ao vivo
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </Link>
                )}
                <CategoryActions id={category._id} name={category.name} variant="aside" />
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
};
