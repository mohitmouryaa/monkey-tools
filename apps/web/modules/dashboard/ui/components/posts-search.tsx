"use client";

import { usePostsSearch } from "@/modules/dashboard/hooks/use-posts-search";
import { PostsSearchInput } from "@/modules/dashboard/posts/ui/posts-entity-components";

export const PostsSearch = () => {
  const { searchValue, onSearchChange } = usePostsSearch();
  return <PostsSearchInput value={searchValue} onChange={onSearchChange} placeholder="Buscar posts" />;
};
