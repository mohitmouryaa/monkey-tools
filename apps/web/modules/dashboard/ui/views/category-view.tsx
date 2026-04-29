"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  ArrowLeft,
  Calendar,
  Edit,
  ExternalLink,
  Eye,
  EyeOff,
  Folder,
  Hash,
  Loader2,
  Palette,
  Sparkles,
  Tag,
  Trash2,
  Type,
} from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { DashboardBreadcrumb } from "@/modules/common/ui/components/dashboard-breadcrumb";
import type { CategoryFormValues } from "@/modules/dashboard/schema/category";
import { CategoryForm } from "@/modules/dashboard/ui/components/category-form";
import { useUpdateCategory } from "@/modules/dashboard/hooks/use-update-category";
import { useRemoveCategory } from "@/modules/dashboard/hooks/use-remove-category";
import { useSuspenseCategory } from "@/modules/dashboard/hooks/use-suspense-categories";

interface CategoryViewProps {
  id: string;
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

export const CategoryView = ({ id }: CategoryViewProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmingRemove, setIsConfirmingRemove] = useState(false);

  const category = useSuspenseCategory({ id });
  const updateCategory = useUpdateCategory();
  const removeCategory = useRemoveCategory();

  const categoryData = category.data;
  const safeColor = HEX_RE.test(categoryData.color || "") ? categoryData.color : "#6366f1";
  const publicUrl = categoryData.slug ? `/ferramentas/${categoryData.slug}` : "";

  const handleUpdate = (values: CategoryFormValues) => {
    updateCategory.mutate(
      { id, data: values },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      },
    );
  };

  const handleRemove = () => {
    removeCategory.mutate(
      { id },
      {
        onSuccess: () => {
          router.push("/dashboard/categories");
        },
      },
    );
  };

  if (isEditing) {
    return (
      <div className="min-h-screen bg-background">
        <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <DashboardBreadcrumb
            className="mb-6"
            items={[
              { label: "Dashboard", href: "/dashboard" },
              { label: "Categorias", href: "/dashboard/categories" },
              {
                label: categoryData.name,
                href: `/dashboard/categories/${id}`,
              },
              { label: "Editar" },
            ]}
          />

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
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-2xl font-bold tracking-tight md:text-3xl text-foreground">Editar categoria</h2>
                  <Badge variant="secondary" className="font-normal">
                    {categoryData.name}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">Alterações salvas atualizam o site público imediatamente.</p>
              </div>
            </div>

            {publicUrl && (
              <Button asChild variant="outline" size="sm" className="gap-2">
                <Link href={publicUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                  Ver ao vivo
                </Link>
              </Button>
            )}
          </header>

          <CategoryForm
            defaultValues={{
              name: categoryData.name,
              slug: categoryData.slug,
              description: categoryData.description || "",
              icon: categoryData.icon || "folder",
              color: categoryData.color || "#6366f1",
              isActive: categoryData.isActive ?? true,
            }}
            onSubmit={handleUpdate}
            onCancel={() => setIsEditing(false)}
            submitLabel="Salvar alterações"
            disabled={updateCategory.isPending}
          />
        </div>
      </div>
    );
  }

  const createdAt = (categoryData as { createdAt?: string | Date }).createdAt;
  const updatedAt = (categoryData as { updatedAt?: string | Date }).updatedAt;

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <DashboardBreadcrumb
          className="mb-6"
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Categorias", href: "/dashboard/categories" },
            { label: categoryData.name },
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
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-muted-foreground hover:text-destructive"
              onClick={() => setIsConfirmingRemove(true)}
              disabled={removeCategory.isPending}
            >
              {removeCategory.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
              Remover
            </Button>
            <Button onClick={() => setIsEditing(true)} size="sm" className="gap-2 transition-all shadow-sm hover:shadow">
              <Edit className="w-4 h-4" />
              Editar
            </Button>
          </div>
        </div>

        <header className="pb-12 mb-16 border-b border-border/50">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div
              className="flex items-center justify-center rounded-2xl size-20 shrink-0 ring-1 ring-border/50"
              style={{ backgroundColor: `${safeColor}1a` }}
            >
              <DynamicIcon
                name={(categoryData.icon || "folder") as IconName}
                className="size-10"
                style={{ color: safeColor }}
                fallback={() => <Folder className="size-10" style={{ color: safeColor }} />}
              />
            </div>

            <div className="flex-1 min-w-0 space-y-5">
              <div className="space-y-3">
                <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">{categoryData.name}</h1>
                {categoryData.description && (
                  <p className="max-w-3xl text-base leading-relaxed md:text-lg text-muted-foreground">
                    {categoryData.description}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Badge variant={categoryData.isActive ? "default" : "outline"} className="gap-1.5">
                  {categoryData.isActive ? <Eye className="size-3" /> : <EyeOff className="size-3" />}
                  {categoryData.isActive ? "Publicada" : "Rascunho"}
                </Badge>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded-md bg-muted/50 text-muted-foreground">
                  <Hash className="size-3" />
                  {categoryData.slug}
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
                  <span className="font-medium">{categoryData.name}</span>
                </Field>
                <Field label="Slug" icon={Hash}>
                  <span className="font-mono">{categoryData.slug}</span>
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Descrição">
                    {categoryData.description ? (
                      <p className="leading-relaxed">{categoryData.description}</p>
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
                  {categoryData.icon ? (
                    <span className="inline-flex items-center gap-2">
                      <span
                        className="flex items-center justify-center rounded-md size-8 ring-1 ring-border/40"
                        style={{ backgroundColor: `${safeColor}1a` }}
                      >
                        <DynamicIcon
                          name={categoryData.icon as IconName}
                          className="size-4"
                          style={{ color: safeColor }}
                          fallback={() => <Folder className="size-4" style={{ color: safeColor }} />}
                        />
                      </span>
                      <span className="font-mono">{categoryData.icon}</span>
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
                    {categoryData.isActive ? "Categoria publicada" : "Categoria em rascunho"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {categoryData.isActive
                      ? "Visível para os usuários no site público."
                      : "Oculta do site público — só você consegue ver."}
                  </p>
                </div>
                <Badge variant={categoryData.isActive ? "default" : "outline"} className="gap-1.5 shrink-0">
                  {categoryData.isActive ? <Eye className="size-3" /> : <EyeOff className="size-3" />}
                  {categoryData.isActive ? "Publicada" : "Rascunho"}
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
                      categoryData.isActive ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"
                    }`}
                  >
                    {categoryData.isActive ? "Publicada" : "Rascunho"}
                  </dd>
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-border/30">
                  <dt className="text-sm font-medium text-muted-foreground">Slug</dt>
                  <dd className="font-mono text-sm text-right text-foreground">{categoryData.slug}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm font-medium text-muted-foreground">ID</dt>
                  <dd className="font-mono text-xs text-muted-foreground">{categoryData._id.slice(-12)}</dd>
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
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center justify-between px-1 py-3 text-sm font-medium transition-colors border-b text-foreground border-border/30 hover:bg-muted/50"
                >
                  Editar categoria
                  <Edit className="w-4 h-4 text-muted-foreground" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsConfirmingRemove(true)}
                  disabled={removeCategory.isPending}
                  className="inline-flex items-center justify-between px-1 py-3 text-sm font-medium transition-colors text-destructive hover:bg-destructive/5 disabled:opacity-50"
                >
                  Remover categoria
                  {removeCategory.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                </button>
              </div>
            </section>
          </aside>
        </div>
      </div>

      <Dialog open={isConfirmingRemove} onOpenChange={setIsConfirmingRemove}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir “{categoryData.name}”?</DialogTitle>
            <DialogDescription>
              Esta ação não pode ser desfeita. As ferramentas vinculadas perderão a referência a esta categoria.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsConfirmingRemove(false)} disabled={removeCategory.isPending}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleRemove} disabled={removeCategory.isPending} className="gap-2">
              {removeCategory.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
