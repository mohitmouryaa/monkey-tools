import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import { EditCategoryView } from "@/modules/dashboard/ui/views/edit-category-view";

interface EditCategoryPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditCategoryPage({ params }: EditCategoryPageProps) {
  await requireAuth();
  const { id } = await params;
  const category = await caller.categories.getOne({ id });
  return (
    <main className="flex-1">
      <EditCategoryView category={category} />
    </main>
  );
}
