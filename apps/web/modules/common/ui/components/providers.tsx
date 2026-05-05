"use client";

import { TRPCReactProvider } from "@/trpc/client";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TRPCReactProvider>
      <NuqsAdapter>
        <NextThemesProvider attribute="class" defaultTheme="light" disableTransitionOnChange enableColorScheme>
          {children}
        </NextThemesProvider>
      </NuqsAdapter>
    </TRPCReactProvider>
  );
}
