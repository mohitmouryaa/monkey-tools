"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { DashboardBreadcrumb } from "@/modules/common/ui/components/dashboard-breadcrumb";
import { CreateCustomPageForm } from "../components/create-custom-page-form";

export const CreateCustomPageView = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <DashboardBreadcrumb
          className="mb-6"
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Páginas", href: "/dashboard/pages" },
            { label: "Nova página personalizada" },
          ]}
        />

        <header className="flex flex-col gap-4 pb-6 mb-8 border-b sm:flex-row sm:items-end sm:justify-between border-border/50">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/dashboard/pages")}
              className="flex items-center justify-center transition-all rounded-lg group size-10 hover:bg-muted"
              aria-label="Voltar"
              type="button"
            >
              <ArrowLeft className="w-5 h-5 transition-colors text-muted-foreground group-hover:text-foreground" />
            </button>
            <div className="space-y-1.5">
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl text-foreground">Nova página personalizada</h1>
              <p className="text-sm text-muted-foreground">Crie uma nova página personalizada para seu site.</p>
            </div>
          </div>
        </header>

        <CreateCustomPageForm />
      </div>
    </div>
  );
};
