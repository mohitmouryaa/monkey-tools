"use client";

import { useRouter } from "next/navigation";
import { PostsHeader as PostsHeaderBase } from "@/modules/dashboard/posts/ui/posts-entity-components";

export const PostsHeader = ({ disabled }: { disabled?: boolean }) => {
  const router = useRouter();
  const handleCreate = () => router.push("/dashboard/posts/new");
  return (
    <PostsHeaderBase
      title="Posts"
      description="Crie e gerencie posts do blog"
      onNew={handleCreate}
      newButtonLabel="Novo post"
      disabled={disabled}
    />
  );
};
