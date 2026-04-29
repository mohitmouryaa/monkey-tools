"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@workspace/ui/components/button";
import { useCreatePost } from "@/modules/dashboard/hooks/use-create-post";
import { PostForm, type PostFormValues } from "@/modules/dashboard/ui/components/post-form";

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
      <div className="container px-6 py-8 mx-auto max-w-7xl">
        <div className="mb-8 flex items-start gap-4">
          <Link href="/dashboard/posts" className="mt-1">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="size-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Create New Post</h1>
            <p className="text-muted-foreground mt-1">Write a new blog post</p>
          </div>
        </div>
        <PostForm onSubmit={onSubmit} submitLabel="Create Post" disabled={createPost.isPending} />
      </div>
    </div>
  );
};
