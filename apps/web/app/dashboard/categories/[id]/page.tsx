import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import { CategoryView } from "@/modules/dashboard/ui/views/category-view";

export const metadata: Metadata = {
  title: "Categoria",
  description: "Detalhes da categoria de ferramentas.",
};

interface CategoryPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  await requireAuth();
  const { id } = await params;
  const category = await caller.categories.getOne({ id });
  return (
    <main className="flex-1">
      <CategoryView category={category} />
    </main>
  );
}
