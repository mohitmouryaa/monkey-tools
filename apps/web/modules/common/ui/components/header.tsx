import { caller } from "@/trpc/server";
import Link from "next/link";
import { Logo } from "./logo";

export const Header = async () => {
  const categories = await caller.categories.getMany({});

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {categories.items.slice(0, 5).map((category) => (
            <Link
              key={category._id}
              href={`/ferramentas/${category.slug}`}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {category.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};
