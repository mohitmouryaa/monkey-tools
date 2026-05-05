import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@workspace/ui/components/button";
import { FileQuestion, LayoutDashboard, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Recurso não encontrado · Admin | pdfs.com.br",
  robots: { index: false, follow: false },
};

export default function DashboardNotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-16">
      <div className="flex size-14 items-center justify-center rounded-full bg-secondary">
        <FileQuestion className="size-7 text-primary" />
      </div>
      <div className="max-w-md text-center">
        <h1 className="mb-2 text-2xl font-semibold text-foreground">Recurso não encontrado</h1>
        <p className="mx-auto max-w-sm text-sm text-muted-foreground">
          O recurso que você tentou acessar não existe, foi removido ou você não tem permissão para vê-lo.
        </p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Link href="/dashboard">
          <Button size="default" className="w-full gap-2 sm:w-auto">
            <LayoutDashboard className="size-4" />
            Ir para o dashboard
          </Button>
        </Link>
        <Link href="/">
          <Button size="default" variant="outline" className="w-full gap-2 sm:w-auto">
            <ArrowLeft className="size-4" />
            Voltar ao site
          </Button>
        </Link>
      </div>
    </div>
  );
}
