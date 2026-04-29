import { ArrowRight } from "lucide-react";
import type { CtaBlockData } from "@workspace/types";

interface CtaBlockProps {
  data: CtaBlockData;
}

export function CtaBlock({ data }: CtaBlockProps) {
  return (
    <div className="my-16 md:my-20 max-w-5xl mx-auto px-4 sm:px-6">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-primary/80 px-6 py-12 md:px-12 md:py-20 text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary-foreground/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 -bottom-32 h-80 w-80 rounded-full bg-primary-foreground/10 blur-3xl"
        />
        <div className="relative max-w-2xl mx-auto">
          <h2 className="mb-4 text-3xl md:text-4xl font-bold text-primary-foreground tracking-tight">{data.heading}</h2>
          {data.description && (
            <p className="mb-8 text-base md:text-lg text-primary-foreground/90 leading-relaxed">{data.description}</p>
          )}
          <a
            href={data.buttonLink}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-foreground text-primary text-sm md:text-base font-semibold shadow-lg shadow-primary-foreground/20 transition-transform hover:scale-105"
          >
            {data.buttonText}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </section>
    </div>
  );
}
