"use client";

import { AlertTriangle } from "lucide-react";
import type { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface SectionErrorBoundaryProps {
  children: ReactNode;
  message?: string;
  resetKeys?: ReadonlyArray<unknown>;
}

const DEFAULT_MESSAGE = "Não foi possível carregar esta seção agora.";

export const SectionErrorBoundary = ({ children, message = DEFAULT_MESSAGE, resetKeys }: SectionErrorBoundaryProps) => {
  return (
    <ErrorBoundary
      resetKeys={resetKeys ? [...resetKeys] : undefined}
      fallback={
        <div className="container max-w-3xl mx-auto px-4 py-10">
          <div className="flex items-start gap-3 rounded-lg border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" aria-hidden />
            <p>{message}</p>
          </div>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
};
