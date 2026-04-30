import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import { DashboardOverviewView } from "@/modules/dashboard/ui/views/dashboard-overview-view";

export default async function Page() {
  await requireAuth();
  const data = await caller.dashboard.overview();
  return (
    <main className="flex-1">
      <DashboardOverviewView data={data} />
    </main>
  );
}
