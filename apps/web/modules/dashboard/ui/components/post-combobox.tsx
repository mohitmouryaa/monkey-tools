"use client";

import { useQuery } from "@tanstack/react-query";
import { PostStatus } from "@workspace/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import { useTRPC } from "@/trpc/client";

const NONE_VALUE = "__none__";
const NONE_LABEL = "Sem post em destaque";

interface PostListItem {
  _id: string;
  title: string;
}

interface PostComboboxProps {
  value: string | null | undefined;
  onChange: (value: string | null) => void;
  disabled?: boolean;
}

export const PostCombobox = ({ value, onChange, disabled = false }: PostComboboxProps) => {
  const trpc = useTRPC();
  const { data, isLoading } = useQuery(
    trpc.posts.list.queryOptions({
      status: PostStatus.PUBLISHED,
      pageSize: 50,
      page: 1,
      search: "",
    }),
  );

  const selectValue = value ?? NONE_VALUE;

  const handleValueChange = (next: string) => {
    if (next === NONE_VALUE) {
      onChange(null);
      return;
    }
    onChange(next);
  };

  return (
    <Select value={selectValue} onValueChange={handleValueChange} disabled={disabled || isLoading}>
      <SelectTrigger>
        <SelectValue placeholder={NONE_LABEL} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={NONE_VALUE}>{NONE_LABEL}</SelectItem>
        {(data?.items as unknown as PostListItem[] | undefined)?.map((post) => (
          <SelectItem key={post._id} value={post._id}>
            {post.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
