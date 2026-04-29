"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { PostStatus } from "@workspace/types";
import { Button } from "@workspace/ui/components/button";
import { usePostById } from "@/modules/dashboard/hooks/use-post-by-id";
import { useUpdatePost } from "@/modules/dashboard/hooks/use-update-post";
import { PostForm, type PostFormValues } from "@/modules/dashboard/ui/components/post-form";

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
  isFeaturedGlobal: boolean;
  tools: Array<{ _id: string }>;
  seo?: { title?: string; description?: string; ogImage?: string };
};

export const EditPostView = ({ id }: EditPostViewProps) => {
  const post = usePostById(id);
  const update = useUpdatePost();

  const onSubmit = (values: PostFormValues) => {
    update.mutate({ id, ...values });
  };

  const data = post.data as unknown as PostData;

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-6 py-8 mx-auto max-w-7xl">
        <div className="mb-8 flex items-start gap-4">
          <Link href="/dashboard/posts" className="mt-1">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="size-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Edit Post</h1>
            <p className="text-muted-foreground mt-1">{data.title}</p>
          </div>
        </div>
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
          submitLabel="Save Changes"
          disabled={update.isPending}
        />
      </div>
    </div>
  );
};
