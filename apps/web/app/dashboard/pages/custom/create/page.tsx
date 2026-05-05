import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth-utils";
import { CreateCustomPageView } from "@/modules/dashboard/ui/views/create-custom-page-view";

export const metadata: Metadata = {
  title: "Nova página",
  description: "Criar nova página personalizada.",
};

export default async function CreateCustomPagePage() {
  await requireAuth();
  return <CreateCustomPageView />;
}
