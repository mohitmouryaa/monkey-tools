import { PostsHeader as PostsHeaderBase } from "@/modules/dashboard/posts/ui/posts-entity-components";

export const PostsHeader = ({ disabled }: { disabled?: boolean }) => {
  return (
    <PostsHeaderBase
      title="Posts"
      description="Crie e gerencie posts do blog"
      newButtonHref="/dashboard/posts/new"
      newButtonLabel="Novo post"
      disabled={disabled}
    />
  );
};
