"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  ArrowLeft,
  Calendar,
  Code2,
  Edit,
  Eye,
  EyeOff,
  FileCode2,
  Hash,
  Loader2,
  Sparkles,
  Trash2,
  Type,
} from "lucide-react";
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
import { ScriptForm } from "@/modules/dashboard/ui/components/script-form";
import { useDeleteGlobalScript, useUpdateGlobalScript } from "@/modules/dashboard/hooks/use-scripts";
import { useSuspenseScript } from "@/modules/dashboard/hooks/use-suspense-scripts";
import type { CreateGlobalScriptInput } from "@/modules/dashboard/schema/global-script";

interface ScriptViewProps {
  id: string;
}

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

const LOCATION_LABEL: Record<"HEAD" | "BODY", string> = {
  HEAD: "Head",
  BODY: "Body",
};

const LOCATION_DESCRIPTION: Record<"HEAD" | "BODY", string> = {
  HEAD: "Carregado antes do conteúdo da página renderizar.",
  BODY: "Carregado no fim do body, depois do conteúdo principal.",
};

export const ScriptView = ({ id }: ScriptViewProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmingRemove, setIsConfirmingRemove] = useState(false);

  const script = useSuspenseScript({ id });
  const updateScript = useUpdateGlobalScript();
  const removeScript = useDeleteGlobalScript();

  const data = script.data;
  const accent = data.location === "HEAD" ? "#0ea5e9" : "#8b5cf6";

  const handleUpdate = (values: CreateGlobalScriptInput) => {
    updateScript.mutate(
      { id, data: values },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      },
    );
  };

  const handleRemove = () => {
    removeScript.mutate(
      { id },
      {
        onSuccess: () => {
          router.push("/dashboard/scripts");
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
              { label: "Scripts globais", href: "/dashboard/scripts" },
              { label: data.name, href: `/dashboard/scripts/${id}` },
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
                  <h2 className="text-2xl font-bold tracking-tight md:text-3xl text-foreground">Editar script</h2>
                  <Badge variant="secondary" className="font-normal">
                    {data.name}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Alterações no script entram no ar imediatamente após salvar.
                </p>
              </div>
            </div>
          </header>

          <ScriptForm
            defaultValues={{
              name: data.name,
              content: data.content,
              location: data.location,
              isActive: data.isActive,
            }}
            onSubmit={handleUpdate}
            onCancel={() => setIsEditing(false)}
            submitLabel="Salvar alterações"
            disabled={updateScript.isPending}
          />
        </div>
      </div>
    );
  }

  const createdAt = (data as { createdAt?: string | Date }).createdAt;
  const updatedAt = (data as { updatedAt?: string | Date }).updatedAt;

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <DashboardBreadcrumb
          className="mb-6"
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Scripts globais", href: "/dashboard/scripts" },
            { label: data.name },
          ]}
        />

        <div className="flex flex-col gap-3 mb-12 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/dashboard/scripts"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors group text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Voltar para Scripts
          </Link>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-muted-foreground hover:text-destructive"
              onClick={() => setIsConfirmingRemove(true)}
              disabled={removeScript.isPending}
            >
              {removeScript.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
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
              style={{ backgroundColor: `${accent}1a` }}
            >
              <FileCode2 className="size-10" style={{ color: accent }} />
            </div>

            <div className="flex-1 min-w-0 space-y-5">
              <div className="space-y-3">
                <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">{data.name}</h1>
                <p className="max-w-3xl text-base leading-relaxed md:text-lg text-muted-foreground">
                  {LOCATION_DESCRIPTION[data.location]}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Badge variant={data.isActive ? "default" : "outline"} className="gap-1.5">
                  {data.isActive ? <Eye className="size-3" /> : <EyeOff className="size-3" />}
                  {data.isActive ? "Ativo" : "Inativo"}
                </Badge>
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono uppercase tracking-wider rounded-md"
                  style={{ backgroundColor: `${accent}1a`, color: accent }}
                >
                  <Code2 className="size-3" />
                  {LOCATION_LABEL[data.location]}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded-md bg-muted/50 text-muted-foreground">
                  <Hash className="size-3" />
                  {data._id.slice(-8)}
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="grid gap-x-12 gap-y-16 lg:grid-cols-3">
          <div className="space-y-16 lg:col-span-2">
            <section className="space-y-6">
              <SectionHeader icon={Type} label="Identificação" />
              <dl className="grid gap-6 sm:grid-cols-2">
                <Field label="Nome">
                  <span className="font-medium">{data.name}</span>
                </Field>
                <Field label="Localização" icon={Code2}>
                  <span className="font-mono uppercase tracking-wider">{LOCATION_LABEL[data.location]}</span>
                </Field>
              </dl>
            </section>

            <section className="space-y-6">
              <SectionHeader
                icon={Sparkles}
                label="Conteúdo"
                meta={`${data.content.length.toLocaleString("pt-BR")} caracteres`}
              />
              <pre className="p-4 overflow-auto font-mono text-xs leading-relaxed border rounded-lg max-h-96 bg-muted/40 text-foreground border-border/50 whitespace-pre-wrap break-all">
                {data.content}
              </pre>
            </section>

            <section className="space-y-6">
              <SectionHeader icon={Eye} label="Visibilidade" />
              <div className="flex items-start justify-between gap-4 p-4 border rounded-lg shadow-sm">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">
                    {data.isActive ? "Script ativo" : "Script inativo"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {data.isActive
                      ? "Está sendo injetado em todas as páginas públicas neste momento."
                      : "Está salvo aqui, mas não é injetado no site público."}
                  </p>
                </div>
                <Badge variant={data.isActive ? "default" : "outline"} className="gap-1.5 shrink-0">
                  {data.isActive ? <Eye className="size-3" /> : <EyeOff className="size-3" />}
                  {data.isActive ? "Ativo" : "Inativo"}
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
                      data.isActive ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"
                    }`}
                  >
                    {data.isActive ? "Ativo" : "Inativo"}
                  </dd>
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-border/30">
                  <dt className="text-sm font-medium text-muted-foreground">Localização</dt>
                  <dd className="font-mono text-sm text-right text-foreground uppercase tracking-wider">
                    {LOCATION_LABEL[data.location]}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm font-medium text-muted-foreground">ID</dt>
                  <dd className="font-mono text-xs text-muted-foreground">{data._id.slice(-12)}</dd>
                </div>
              </dl>
            </section>

            <section className="space-y-6">
              <SectionHeader icon={Calendar} label="Cronologia" />
              <dl className="space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-border/30">
                  <dt className="text-sm font-medium text-muted-foreground">Criado em</dt>
                  <dd className="text-sm text-right text-foreground">
                    {createdAt ? format(new Date(createdAt), "d MMM yyyy", { locale: ptBR }) : "—"}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm font-medium text-muted-foreground">Atualizado em</dt>
                  <dd className="text-sm text-right text-foreground">
                    {updatedAt ? format(new Date(updatedAt), "d MMM yyyy 'às' HH:mm", { locale: ptBR }) : "—"}
                  </dd>
                </div>
              </dl>
            </section>

            <section className="space-y-4">
              <SectionHeader label="Ações rápidas" />
              <div className="flex flex-col">
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center justify-between px-1 py-3 text-sm font-medium transition-colors border-b text-foreground border-border/30 hover:bg-muted/50"
                >
                  Editar script
                  <Edit className="w-4 h-4 text-muted-foreground" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsConfirmingRemove(true)}
                  disabled={removeScript.isPending}
                  className="inline-flex items-center justify-between px-1 py-3 text-sm font-medium transition-colors text-destructive hover:bg-destructive/5 disabled:opacity-50"
                >
                  Remover script
                  {removeScript.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                </button>
              </div>
            </section>
          </aside>
        </div>
      </div>

      <Dialog open={isConfirmingRemove} onOpenChange={setIsConfirmingRemove}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir “{data.name}”?</DialogTitle>
            <DialogDescription>
              Esta ação não pode ser desfeita. O script deixará de ser injetado no site público imediatamente.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsConfirmingRemove(false)} disabled={removeScript.isPending}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleRemove} disabled={removeScript.isPending} className="gap-2">
              {removeScript.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
