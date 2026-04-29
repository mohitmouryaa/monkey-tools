import { requireAuth } from "@/lib/auth-utils";
import { AccountView } from "@/modules/dashboard/ui/views/account-view";

export default async function Page() {
  await requireAuth();
  return (
    <main className="flex-1">
      <AccountView />
    </main>
  );
}
