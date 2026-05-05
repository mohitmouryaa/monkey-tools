"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Clock, ExternalLink } from "lucide-react";
import { PostStatus } from "@workspace/types";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { usePostById } from "@/modules/dashboard/hooks/use-post-by-id";
import { useUpdatePost } from "@/modules/dashboard/hooks/use-update-post";
import { PostForm, type PostFormValues } from "@/modules/dashboard/ui/components/post-form";
import { DashboardBreadcrumb } from "@/modules/common/ui/components/dashboard-breadcrumb";

interface EditPostViewProps {
  id: string;
}

// O retorno de `posts.getById` é serializado pelo router com um generic
// (`serializePost<T>`) que só preserva `_id` e `tools` no tipo. Os demais
// campos do Post existem em runtime mas não no tipo. Recasteamos aqui para
// o shape real persistido pelo `PostModel`.
type PostData = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string;
  // biome-ignore lint/suspicious/noExplicitAny: Editor.js content shape é dinâmico
  content: Record<string, any>;
  status: PostStatus;
  publishedAt?: Date | string;
  updatedAt?: Date | string;
  createdAt?: Date | string;
  isFeaturedGlobal: boolean;
  tools: Array<{ _id: string }>;
  seo?: { title?: string; description?: string; ogImage?: string };
};

const RELATIVE_UNITS: Array<[Intl.RelativeTimeFormatUnit, number]> = [
  ["year", 60 * 60 * 24 * 365],
  ["month", 60 * 60 * 24 * 30],
  ["day", 60 * 60 * 24],
  ["hour", 60 * 60],
  ["minute", 60],
  ["second", 1],
];

const formatRelative = (date: Date) => {
  const diffSeconds = Math.round((date.getTime() - Date.now()) / 1000);
  const rtf = new Intl.RelativeTimeFormat("pt-BR", { numeric: "auto" });
  for (const [unit, secondsInUnit] of RELATIVE_UNITS) {
    const value = Math.round(diffSeconds / secondsInUnit);
    if (Math.abs(value) >= 1 || unit === "second") return rtf.format(value, unit);
  }
  return rtf.format(0, "second");
};

const STATUS_LABEL: Record<PostStatus, string> = {
  [PostStatus.DRAFT]: "Rascunho",
  [PostStatus.SCHEDULED]: "Agendado",
  [PostStatus.PUBLISHED]: "Publicado",
};

const STATUS_VARIANT: Record<PostStatus, "default" | "secondary" | "outline"> = {
  [PostStatus.DRAFT]: "secondary",
  [PostStatus.SCHEDULED]: "outline",
  [PostStatus.PUBLISHED]: "default",
};

export const EditPostView = ({ id }: EditPostViewProps) => {
  const router = useRouter();
  const post = usePostById(id);
  const update = useUpdatePost();

  const data = post.data as unknown as PostData;
  const isPublished = data.status === PostStatus.PUBLISHED;
  const updatedDate = data.updatedAt ? new Date(data.updatedAt) : null;
  const updatedAbsolute = updatedDate
    ? new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium", timeStyle: "short" }).format(updatedDate)
    : null;

  const onSubmit = (values: PostFormValues) => {
    update.mutate({ id, ...values });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <DashboardBreadcrumb
          className="mb-6"
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Posts", href: "/dashboard/posts" },
            { label: data.title },
          ]}
        />

        <header className="flex flex-col gap-4 pb-6 mb-8 border-b sm:flex-row sm:items-end sm:justify-between border-border/50">
          <div className="flex items-start min-w-0 gap-4">
            <button
              onClick={() => router.push("/dashboard/posts")}
              className="flex items-center justify-center transition-all rounded-lg shrink-0 group size-10 hover:bg-muted"
              aria-label="Voltar"
              type="button"
            >
              <ArrowLeft className="w-5 h-5 transition-colors text-muted-foreground group-hover:text-foreground" />
            </button>
            <div className="space-y-1.5 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight truncate md:text-3xl text-foreground">{data.title}</h1>
                <Badge variant={STATUS_VARIANT[data.status]}>{STATUS_LABEL[data.status]}</Badge>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                <span className="font-mono truncate">/{data.slug}</span>
                {updatedDate && updatedAbsolute && (
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="size-3.5" />
                    <span title={updatedAbsolute}>Atualizado {formatRelative(updatedDate)}</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {isPublished && (
            <Button asChild variant="outline" size="sm" className="shrink-0">
              <a href={`/blog/${data.slug}`} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="size-4" />
                Ver no site
              </a>
            </Button>
          )}
        </header>

        <PostForm
          defaultValues={{
            title: data.title,
            slug: data.slug,
            excerpt: data.excerpt,
            coverImage: data.coverImage ?? "",
            content: data.content,
            status: data.status,
            publishedAt: data.publishedAt ? new Date(data.publishedAt) : undefined,
            isFeaturedGlobal: data.isFeaturedGlobal,
            toolIds: (data.tools ?? []).map((t) => t._id),
            seo: data.seo ?? { title: "", description: "", ogImage: "" },
          }}
          onSubmit={onSubmit}
          submitLabel="Salvar alterações"
          disabled={update.isPending}
        />
      </div>
    </div>
  );
};
