import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth-utils";
import { CreateScriptView } from "@/modules/dashboard/ui/views/create-script-view";

export const metadata: Metadata = {
  title: "Novo script",
  description: "Criar novo script global.",
};

export default async function CreateScriptPage() {
  await requireAuth();
  return <CreateScriptView />;
}
