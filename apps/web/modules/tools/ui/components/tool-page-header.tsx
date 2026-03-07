"use client";

import { Wrench } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import { toLucideIconName } from "@/modules/common/ui/lib/lucide-icon-name";

const CATEGORY_ICON_CLASS: Record<string, string> = {
  "pdf-tools": "bg-tool-compress",
  "image-tools": "bg-tool-bg-remove",
  "text-tools": "bg-tool-pdf-word",
  "text-ai-tools": "bg-tool-pdf-word",
  converters: "bg-tool-word-pdf",
};

function getIconColorClass(categorySlug: string): string {
  return CATEGORY_ICON_CLASS[categorySlug] ?? "bg-tool-merge";
}

interface ToolPageHeaderProps {
  title: string;
  description?: string;
  iconName?: string;
  categorySlug: string;
}

export function ToolPageHeader({
  title,
  description,
  iconName,
  categorySlug,
}: ToolPageHeaderProps) {
  const iconColorClass = getIconColorClass(categorySlug);
  const lucideName = iconName ? toLucideIconName(iconName) : null;

  return (
    <section className="tool-page-header py-10 md:py-14">
      <div className="container max-w-2xl text-center px-4 mx-auto">
        <div
          className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5 ${iconColorClass}`}
        >
          {lucideName ? (
            <DynamicIcon
              name={lucideName as IconName}
              className="h-8 w-8 text-primary-foreground"
              fallback={() => <Wrench className="h-8 w-8 text-primary-foreground" />}
            />
          ) : (
            <Wrench className="h-8 w-8 text-primary-foreground" />
          )}
        </div>
        <h1 className="text-3xl md:text-4xl font-black mb-3 tracking-tight text-foreground">
          {title}
        </h1>
        {description && (
          <p className="text-muted-foreground text-lg mb-8">{description}</p>
        )}
      </div>
    </section>
  );
}
