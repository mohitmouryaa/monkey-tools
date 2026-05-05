"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useCreatePost } from "@/modules/dashboard/hooks/use-create-post";
import { PostForm, type PostFormValues } from "@/modules/dashboard/ui/components/post-form";
import { DashboardBreadcrumb } from "@/modules/common/ui/components/dashboard-breadcrumb";

export const CreatePostView = () => {
  const router = useRouter();
  const createPost = useCreatePost();

  const onSubmit = (values: PostFormValues) => {
    createPost.mutate(values, {
      onSuccess: (data) => {
        router.push(`/dashboard/posts/${data._id}`);
      },
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <DashboardBreadcrumb
          className="mb-6"
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Posts", href: "/dashboard/posts" },
            { label: "Novo post" },
          ]}
        />

        <header className="flex flex-col gap-4 pb-6 mb-8 border-b sm:flex-row sm:items-end sm:justify-between border-border/50">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/dashboard/posts")}
              className="flex items-center justify-center transition-all rounded-lg group size-10 hover:bg-muted"
              aria-label="Voltar"
              type="button"
            >
              <ArrowLeft className="w-5 h-5 transition-colors text-muted-foreground group-hover:text-foreground" />
            </button>
            <div className="space-y-1.5">
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl text-foreground">Novo post</h1>
              <p className="text-sm text-muted-foreground">
                Escreva um novo post do blog com conteúdo, SEO e ferramentas relacionadas.
              </p>
            </div>
          </div>
        </header>

        <PostForm onSubmit={onSubmit} submitLabel="Criar post" disabled={createPost.isPending} />
      </div>
    </div>
  );
};
