import Link from "next/link";
import { caller } from "@/trpc/server";
import { Logo } from "./logo";
import { MegaNav, type NavCategory } from "./mega-nav";
import { MobileNav } from "./mobile-nav";
import { NavSearch, type SearchIndex } from "./nav-search";

export const Header = async () => {
  const [navCategories, searchIndex] = await Promise.all([
    caller.categories.getAllForNav() as Promise<NavCategory[]>,
    caller.categories.getSearchIndex() as Promise<SearchIndex>,
  ]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 flex h-16 items-center justify-between gap-6">
        <Logo />

        <nav className="hidden md:flex items-center gap-8 text-sm">
          <MegaNav categories={navCategories} />
          <Link href="/blog" className="font-medium text-muted-foreground hover:text-foreground transition-colors">
            Blog
          </Link>
          <Link href="/empresas" className="font-medium text-muted-foreground hover:text-foreground transition-colors">
            Para empresas
          </Link>
        </nav>

        <div className="hidden md:block w-72">
          <NavSearch index={searchIndex} />
        </div>

        <MobileNav categories={navCategories} searchIndex={searchIndex} />
      </div>
    </header>
  );
};
