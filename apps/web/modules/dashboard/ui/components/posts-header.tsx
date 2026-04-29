"use client";

import { useRouter } from "next/navigation";
import { PostsHeader as PostsHeaderBase } from "@/modules/dashboard/posts/ui/posts-entity-components";

export const PostsHeader = ({ disabled }: { disabled?: boolean }) => {
  const router = useRouter();
  const handleCreate = () => router.push("/dashboard/posts/new");
  return (
    <PostsHeaderBase
      title="Posts"
      description="Create and manage blog posts"
      onNew={handleCreate}
      newButtonLabel="New post"
      disabled={disabled}
    />
  );
};
