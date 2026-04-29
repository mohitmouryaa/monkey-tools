"use client";

import { Upload } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import type { StepsBlockData } from "@workspace/types";

interface StepsBlockProps {
  data: StepsBlockData;
}

export function StepsBlock({ data }: StepsBlockProps) {
  const steps = data.steps ?? [];

  return (
    <section className="bg-muted/70 border-t border-border py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center">
        {(data.title || data.subtitle) && (
          <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
            {data.title && <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5">{data.title}</h2>}
            {data.subtitle && <p className="text-base md:text-lg text-muted-foreground">{data.subtitle}</p>}
          </div>
        )}

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-10 w-full justify-items-center">
          {steps.length === 3 && (
            <div className="hidden md:block absolute top-12 left-[16.66%] right-[16.66%] h-px bg-border" aria-hidden />
          )}
          {steps.map((step, index) => (
            <div key={`${step.title}-${index}`} className="relative flex flex-col items-center text-center max-w-xs">
              <div className="w-24 h-24 rounded-2xl bg-primary flex items-center justify-center mb-6 shadow-lg shadow-primary/20 relative z-10">
                <DynamicIcon
                  name={step.iconName as IconName}
                  className="w-10 h-10 text-primary-foreground"
                  fallback={() => <Upload className="w-10 h-10 text-primary-foreground" />}
                />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {index + 1}. {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
