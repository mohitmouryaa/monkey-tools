import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth-utils";
import { CreateToolView } from "@/modules/dashboard/ui/views/create-tool-view";

export const metadata: Metadata = {
  title: "Nova ferramenta",
  description: "Criar nova ferramenta.",
};

export default async function CreateToolPage() {
  await requireAuth();
  return <CreateToolView />;
}
