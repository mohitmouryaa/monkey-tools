import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  align?: "left" | "center";
  className?: string;
}

export const Breadcrumb = ({ items, align = "left", className }: BreadcrumbProps) => {
  return (
    <nav
      aria-label="breadcrumb"
      className={cn(
        "flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground",
        align === "center" && "justify-center",
        className,
      )}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={`${item.label}-${index}`} className="flex items-center gap-1.5 min-w-0">
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:text-foreground"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={cn("truncate max-w-[260px]", isLast && "text-foreground")}
                aria-current={isLast ? "page" : undefined}
              >
                {item.label}
              </span>
            )}
            {!isLast && <ChevronRight aria-hidden className="h-3.5 w-3.5 text-muted-foreground/60 shrink-0" />}
          </span>
        );
      })}
    </nav>
  );
};
