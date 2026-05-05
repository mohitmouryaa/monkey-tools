import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth-utils";
import { EditCustomPageView } from "@/modules/dashboard/ui/views/edit-custom-page-view";

export const metadata: Metadata = {
  title: "Editar página",
  description: "Editar página personalizada.",
};

interface EditCustomPagePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditCustomPagePage({ params }: EditCustomPagePageProps) {
  await requireAuth();
  const { id } = await params;
  return <EditCustomPageView pageId={id} />;
}
