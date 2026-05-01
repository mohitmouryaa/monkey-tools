"use client";

import { DynamicIcon, iconNames, type IconName } from "lucide-react/dynamic";
import type { CSSProperties, ReactNode } from "react";

const validIcons = new Set<string>(iconNames as readonly string[]);

interface Props {
  name?: string | null;
  className?: string;
  style?: CSSProperties;
  fallback: ReactNode;
}

export const SafeDynamicIcon = ({ name, fallback, className, style }: Props) => {
  if (!name || !validIcons.has(name)) return <>{fallback}</>;
  return <DynamicIcon name={name as IconName} className={className} style={style} />;
};
