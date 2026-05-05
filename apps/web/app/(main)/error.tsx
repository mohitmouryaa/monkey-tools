"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function MainError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container max-w-2xl mx-auto px-4 py-20 text-center">
      <h2 className="text-2xl font-semibold text-foreground mb-3">Algo deu errado.</h2>
      <p className="text-muted-foreground mb-6">Tente novamente em instantes.</p>
      <button
        type="button"
        onClick={() => reset()}
        className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Tentar novamente
      </button>
    </div>
  );
}
