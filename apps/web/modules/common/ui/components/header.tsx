import { caller } from "@/trpc/server";
import Link from "next/link";
import { FileText } from "lucide-react";

export const Header = async () => {
  const categories = await caller.categories.getMany({});

  return (
    <header className="border-b border-border/50 sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
      <div className="container max-w-6xl mx-auto flex items-center justify-between h-16 px-4">
        <Link href="/" className="flex items-center gap-2 group">
          <FileText className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold text-foreground tracking-tight">
            PDFs<span className="text-primary">.com.br</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          {categories.items.slice(0, 5).map((category) => (
            <Link key={category._id} href={`/ferramentas/${category.slug}`} className="hover:text-foreground transition-colors">
              {category.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};
