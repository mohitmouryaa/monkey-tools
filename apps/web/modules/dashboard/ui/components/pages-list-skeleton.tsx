import { Skeleton } from "@workspace/ui/components/skeleton";

export const PagesListSkeleton = ({ count = 6 }: { count?: number }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholder
        <Skeleton key={i} className="h-40 w-full rounded-xl" />
      ))}
    </div>
  );
};
