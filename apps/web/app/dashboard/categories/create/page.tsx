import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth-utils";
import { CreateCategoryView } from "@/modules/dashboard/ui/views/create-category-view";

export const metadata: Metadata = {
  title: "Nova categoria",
  description: "Criar nova categoria de ferramentas.",
};

export default async function CreateCategoryPage() {
  await requireAuth();
  return <CreateCategoryView />;
}
