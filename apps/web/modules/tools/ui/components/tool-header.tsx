"use client";

import { Wrench } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";

interface ToolHeaderProps {
  title: string;
  introText?: string;
  iconName?: string;
  iconColor?: string;
  bgColor?: string;
}

export const ToolHeader = ({ title, introText, iconName, iconColor, bgColor }: ToolHeaderProps) => {
  // No banco, iconColor é a cor forte (sólida) e bgColor é a versão pastel para cards.
  // No hero queremos fundo na cor forte com ícone branco — invertendo o uso.
  const accent = iconColor || bgColor || "hsl(var(--primary))";
  const iconStroke = "#ffffff";

  return (
    <header className="flex flex-col items-center text-center pt-2 pb-4 md:pt-6 md:pb-6">
      <div
        className="flex items-center justify-center w-16 h-16 mb-6 rounded-2xl shadow-md"
        style={{ backgroundColor: accent }}
      >
        {iconName ? (
          <DynamicIcon
            name={iconName as IconName}
            className="w-8 h-8"
            style={{ color: iconStroke }}
            fallback={() => <Wrench className="w-8 h-8" style={{ color: iconStroke }} />}
          />
        ) : (
          <Wrench className="w-8 h-8" style={{ color: iconStroke }} />
        )}
      </div>

      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight max-w-3xl leading-tight">
        {title}
      </h1>

      {introText && (
        <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">{introText}</p>
      )}
    </header>
  );
};
