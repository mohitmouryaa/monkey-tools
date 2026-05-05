import type { Metadata } from "next";
import { DashboardLayout } from "@/modules/dashboard/ui/views/dashboard-layout";

export const metadata: Metadata = {
  title: {
    template: "%s · Admin | pdfs.com.br",
    default: "Admin | pdfs.com.br",
  },
  description: "Painel administrativo do pdfs.com.br.",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
