"use client";

import { ArrowRight } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import type { CardsBlockData } from "@workspace/types";

interface CardsBlockProps {
  data: CardsBlockData;
}

export function CardsBlock({ data }: CardsBlockProps) {
  const cards = data.cards ?? [];

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {(data.title || data.subtitle) && (
          <div className="text-center mb-10 md:mb-14 max-w-3xl mx-auto">
            {data.title && <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{data.title}</h2>}
            {data.subtitle && <p className="text-base md:text-lg text-muted-foreground">{data.subtitle}</p>}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div key={`${card.title}-${index}`} className="rounded-xl border bg-card p-6 transition-shadow hover:shadow-md">
              {card.iconName && (
                <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <DynamicIcon name={card.iconName as IconName} className="size-5" />
                </div>
              )}
              <h3 className="text-lg font-semibold text-foreground mb-2">{card.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{card.description}</p>
              {card.linkLabel && card.linkHref && (
                <a
                  href={card.linkHref}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  {card.linkLabel}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
