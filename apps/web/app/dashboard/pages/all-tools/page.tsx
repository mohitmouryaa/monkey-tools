import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth-utils";
import { EditAllToolsPageView } from "@/modules/dashboard/ui/views/edit-all-tools-page-view";

export const metadata: Metadata = {
  title: "Editar lista de ferramentas",
  description: "Editar a página de listagem de ferramentas.",
};

export default async function EditAllToolsPagePage() {
  await requireAuth();
  return <EditAllToolsPageView />;
}
