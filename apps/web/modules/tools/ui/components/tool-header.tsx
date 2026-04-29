"use client";

import { Wrench } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";

interface ToolHeaderProps {
  title: string;
  introText?: string;
  iconName?: string;
}

export const ToolHeader = ({ title, introText, iconName }: ToolHeaderProps) => {
  return (
    <div className="mb-8 text-center">
      <div className="flex flex-col items-center gap-4 mb-4">
        <div className="p-3 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
          {iconName ? (
            <DynamicIcon name={iconName as IconName} className="w-8 h-8" fallback={() => <Wrench className="w-8 h-8" />} />
          ) : (
            <Wrench className="w-8 h-8" />
          )}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">{title}</h1>
      </div>
      {introText && <p className="text-lg text-muted-foreground">{introText}</p>}
    </div>
  );
};
