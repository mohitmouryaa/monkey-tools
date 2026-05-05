import { Skeleton } from "@workspace/ui/components/skeleton";

export const ToolsSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-6">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton
            // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholder
            key={i}
            className="h-24 rounded-lg"
          />
        ))}
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 gap-2">
          <Skeleton className="h-9 w-full max-w-sm" />
          <Skeleton className="h-9 w-32" />
          <Skeleton className="h-9 w-32" />
        </div>
        <Skeleton className="h-9 w-24" />
      </div>
      <Skeleton className="h-[420px] w-full rounded-lg" />
    </div>
  );
};
