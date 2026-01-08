import { Suspense } from "react";
import dynamic from "next/dynamic";
import { caller } from "@/trpc/server";
import { HeroSection } from "@/modules/hero/ui/components/hero-section";
import { ScrollButton } from "@/modules/hero/ui/components/scroll-button";
import { ImportantToolsLoader } from "@/modules/hero/ui/components/important-tools-loader";

const CtaSection = dynamic(() => import("@/modules/hero/ui/components/cta-section").then((mod) => mod.CtaSection), {
  loading: () => <div className="w-full h-150 bg-blue-50 dark:bg-blue-900/20 animate-pulse" />,
});

export const HeroView = async () => {
  const categoriesPromise = caller.categories.getMany({});
  const toolsPromise = caller.tools.getMany({ pageSize: 8, page: 1 });

  return (
    <>
      <Suspense fallback={<div className="w-full h-150 bg-background animate-pulse" />}>
        <HeroSection categoriesPromise={categoriesPromise} />
      </Suspense>

      <Suspense fallback={<div className="w-full h-100 bg-muted/30 animate-pulse" />}>
        <ImportantToolsLoader toolsPromise={toolsPromise} categoriesPromise={categoriesPromise} />
      </Suspense>

      <CtaSection />
      <ScrollButton />
    </>
  );
};
