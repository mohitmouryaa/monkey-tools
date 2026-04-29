"use client";

import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@workspace/ui/components/alert";
import { Button } from "@workspace/ui/components/button";

interface LegacyMigrationBannerProps {
  pageId?: string;
}

export const LegacyMigrationBanner = ({ pageId }: LegacyMigrationBannerProps) => {
  const router = useRouter();

  return (
    <Alert variant="destructive" className="my-6">
      <AlertTriangle />
      <AlertTitle>Página em formato legado</AlertTitle>
      <AlertDescription className="space-y-3">
        <p>O conteúdo desta página ainda está em HTML antigo e precisa ser migrado antes de ser editado no novo editor.</p>
        <p>
          Rode no terminal:{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
            pnpm --filter web migrate:pages
          </code>
        </p>
        {pageId ? <p className="text-xs opacity-75">ID: {pageId}</p> : null}
        <Button type="button" variant="outline" size="sm" onClick={() => router.refresh()}>
          Atualizar a página
        </Button>
      </AlertDescription>
    </Alert>
  );
};
