"use client";

import { Newspaper } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSuspensePosts } from "@/modules/dashboard/hooks/use-suspense-posts";
import { useRemovePost } from "@/modules/dashboard/hooks/use-remove-post";
import { PostsList, PostsListItem, PostsEmpty } from "@/modules/dashboard/posts/ui/posts-entity-components";

type PostListItem = {
  _id: string;
  title: string;
  status: string;
  slug: string;
};

export const PostsView = () => {
  const posts = useSuspensePosts();

  return (
    <PostsList
      items={posts.data.items as unknown as PostListItem[]}
      getKey={(p) => p._id}
      renderItem={(p) => <PostItem data={p} />}
      emptyView={<PostsEmptySection />}
    />
  );
};

const PostsEmptySection = () => {
  const router = useRouter();
  return <PostsEmpty message="Ainda não há posts. Crie o primeiro para começar." onNew={() => router.push("/dashboard/posts/new")} />;
};

const PostItem = ({ data }: { data: PostListItem }) => {
  const remove = useRemovePost();
  const handleRemove = () => {
    if (confirm(`Excluir post "${data.title}"?`)) {
      remove.mutate({ id: data._id });
    }
  };
  return (
    <PostsListItem
      href={`/dashboard/posts/${data._id}`}
      title={data.title}
      subtitle={`/${data.slug} · ${data.status}`}
      image={
        <div className="flex items-center justify-center size-8">
          <Newspaper className="size-5" />
        </div>
      }
      onRemove={handleRemove}
      isRemoving={remove.isPending}
    />
  );
};
