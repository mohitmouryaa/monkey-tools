import { ArrowRight, Zap } from "lucide-react";
import type { HeroBlockData } from "@workspace/types";

interface HeroBlockProps {
  data: HeroBlockData;
}

export function HeroBlock({ data }: HeroBlockProps) {
  return (
    <section className="relative bg-gradient-to-b from-primary/5 via-background to-background py-20 md:py-28">
      <div className="container max-w-5xl mx-auto px-4 text-center">
        {data.badge && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Zap className="w-4 h-4 fill-primary" />
            <span>{data.badge}</span>
          </div>
        )}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 leading-[1.05]">
          {data.heading}
        </h1>
        {data.description && (
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">{data.description}</p>
        )}
        {(data.primaryButtonText || data.secondaryButtonText) && (
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {data.primaryButtonText && data.primaryButtonLink && (
              <a
                href={data.primaryButtonLink}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm md:text-base font-semibold shadow-lg shadow-primary/20 transition-transform hover:scale-105"
              >
                {data.primaryButtonText}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            )}
            {data.secondaryButtonText && data.secondaryButtonLink && (
              <a
                href={data.secondaryButtonLink}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-border bg-background text-foreground text-sm md:text-base font-semibold transition-colors hover:bg-muted"
              >
                {data.secondaryButtonText}
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
