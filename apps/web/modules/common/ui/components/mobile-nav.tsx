"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, FolderOpen, ChevronRight } from "lucide-react";
import { SafeDynamicIcon } from "@/modules/common/ui/components/safe-dynamic-icon";
import { Button } from "@workspace/ui/components/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@workspace/ui/components/sheet";
import type { NavCategory } from "./mega-nav";
import { NavSearch, type SearchIndex } from "./nav-search";

interface MobileNavProps {
  categories: NavCategory[];
  searchIndex: SearchIndex;
}

export const MobileNav = ({ categories, searchIndex }: MobileNavProps) => {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Abrir menu" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-sm overflow-y-auto p-0">
        <SheetHeader className="border-b border-border/60 px-5 py-4">
          <SheetTitle className="text-base">Menu</SheetTitle>
        </SheetHeader>

        <div className="border-b border-border/60 px-5 py-4">
          <NavSearch index={searchIndex} />
        </div>

        <div className="px-5 py-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Ferramentas</p>
          <ul className="space-y-2">
            {categories.map((category) => {
              const accent = category.color || "hsl(217 91% 60%)";
              return (
                <li key={category._id}>
                  <Link
                    href={`/ferramentas/${category.slug}`}
                    onClick={close}
                    className="flex items-center gap-3 rounded-lg border border-border/60 px-3 py-2.5 hover:bg-accent transition-colors"
                  >
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md"
                      style={{
                        background: `color-mix(in srgb, ${accent} 12%, transparent)`,
                        color: accent,
                      }}
                      aria-hidden
                    >
                      <SafeDynamicIcon
                        name={category.icon}
                        className="h-4 w-4"
                        fallback={<FolderOpen className="h-4 w-4" />}
                      />
                    </span>
                    <span className="flex-1 text-sm font-medium text-foreground">{category.name}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" aria-hidden />
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href="/ferramentas"
            onClick={close}
            className="mt-3 inline-flex items-center text-sm font-semibold text-primary hover:underline"
          >
            Ver todas as ferramentas →
          </Link>
        </div>

        <div className="border-t border-border/60 px-5 py-4">
          <ul className="space-y-1">
            <li>
              <Link
                href="/blog"
                onClick={close}
                className="block rounded-md px-2 py-2 text-sm font-medium text-foreground hover:bg-accent transition-colors"
              >
                Blog
              </Link>
            </li>
            {/* Oculto temporariamente — não excluir.
            <li>
              <Link
                href="/empresas"
                onClick={close}
                className="block rounded-md px-2 py-2 text-sm font-medium text-foreground hover:bg-accent transition-colors"
              >
                Para empresas
              </Link>
            </li>
            */}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
};
