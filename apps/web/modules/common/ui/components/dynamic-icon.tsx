"use client";

import { DynamicIcon as Icon, iconNames, type IconName } from "lucide-react/dynamic";

interface DynamicIconProps {
  name: IconName;
  style?: React.CSSProperties;
  className?: string;
  fallback?: React.ReactNode;
}

export const DynamicIcon = ({ name, className, style, fallback }: DynamicIconProps) => {
  // Check if the icon name is valid
  if (!iconNames.includes(name)) {
    console.warn(`[DynamicIcon] Invalid icon name: "${name}"`);
    return (
      fallback || (
        <div className={className} style={style}>
          ?
        </div>
      )
    );
  }

  return <Icon name={name} className={className} style={style} />;
};
