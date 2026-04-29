"use client";

import { FileText } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";

interface VisualStep {
  icon: string;
  title: string;
  description: string;
  iconColor?: string;
  bgColor?: string;
}

interface ToolStepsProps {
  steps: VisualStep[];
}

const FALLBACK_BG_COLORS = [
  "hsl(217 91% 60%)", // azul
  "hsl(265 70% 58%)", // roxo
  "hsl(145 65% 42%)", // verde
];

export const ToolSteps = ({ steps }: ToolStepsProps) => {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="relative pt-6">
      {/* Linha conectora passando pelo centro vertical dos círculos (pt-6 = 24px + h-20/2 = 40px → top-16 = 64px) */}
      <div
        aria-hidden
        className="hidden md:block absolute top-16 left-0 right-0 h-px bg-border"
        style={{
          marginLeft: "calc(50% / 3)",
          marginRight: "calc(50% / 3)",
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 relative">
        {steps.map((step, index) => {
          const bg = step.bgColor || FALLBACK_BG_COLORS[index % FALLBACK_BG_COLORS.length];
          const fg = step.iconColor || "#ffffff";

          return (
            <div key={step.title} className="flex flex-col items-center text-center px-2">
              <div
                className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center shadow-lg mb-5"
                style={{ backgroundColor: bg }}
              >
                <DynamicIcon
                  name={step.icon as IconName}
                  className="w-9 h-9"
                  style={{ color: fg }}
                  fallback={() => <FileText className="w-9 h-9" style={{ color: fg }} />}
                />
              </div>

              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.2em] mb-3">
                Passo {index + 1}
              </span>

              <h3 className="text-base font-semibold text-foreground mb-2">{step.title}</h3>

              {step.description && (
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">{step.description}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
