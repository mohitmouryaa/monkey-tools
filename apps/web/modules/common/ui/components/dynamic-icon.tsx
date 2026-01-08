"use client";

import * as Icons from "lucide-react";
import type { IconName } from "lucide-react/dynamic";

interface DynamicIconProps {
  name: IconName;
  style?: React.CSSProperties;
  className?: string;
  fallback?: React.ReactNode;
}

export const DynamicIcon = ({ name, className, style, fallback }: DynamicIconProps) => {
  // Use static imports with fallback for invalid icons
  // biome-ignore lint/suspicious/noExplicitAny: <No Exact type available>
  const IconComponent = (Icons as any)[name];

  if (!IconComponent) {
    console.warn(`[DynamicIcon] Invalid icon name: "${name}"`);
    return (
      fallback || (
        <div className={className} style={style}>
          ?
        </div>
      )
    );
  }

  return <IconComponent className={className} style={style} />;
};
