import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth-utils";
import { AccountView } from "@/modules/dashboard/ui/views/account-view";

export const metadata: Metadata = {
  title: "Conta",
  description: "Configurações da conta de administrador.",
};

export default async function Page() {
  await requireAuth();
  return (
    <main className="flex-1">
      <AccountView />
    </main>
  );
}
