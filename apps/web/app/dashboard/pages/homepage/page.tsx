import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth-utils";
import { EditHomepageView } from "@/modules/dashboard/ui/views/edit-homepage-view";

export const metadata: Metadata = {
  title: "Editar homepage",
  description: "Editar a página inicial do site.",
};

export default async function EditHomepagePage() {
  await requireAuth();
  return <EditHomepageView />;
}
