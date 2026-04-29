import { Logo } from "./logo";
import { caller } from "@/trpc/server";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export const Footer = async () => {
  // Fetch categories and custom pages from backend
  const [categories, customPages] = await Promise.all([caller.categories.getMany({}), caller.pages.getFooterPages()]);

  // Platform links (static)
  const platformLinks = [
    { name: "Ferramentas Gratuitas", href: "/" },
    { name: "Todas as Ferramentas", href: "/ferramentas" },
    { name: "DesignOnline", href: "https://designonline.com.br", external: true },
  ];

  return (
    <footer className="py-12 bg-card border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-6xl mx-auto">
          {/* Logo and Description */}
          <div>
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground">
              Ferramentas online gratuitas, rápidas e seguras. Parte da plataforma DesignOnline.
            </p>
          </div>

          {/* Plataformas Section */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Plataformas</h4>
            <ul className="space-y-2">
              {platformLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                  >
                    {link.name}
                    {link.external && <ExternalLink className="w-3 h-3" />}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ferramentas Section - Dynamic from Categories */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Ferramentas</h4>
            <ul className="space-y-2">
              {categories.items.slice(0, 4).map((category) => (
                <li key={category._id}>
                  <Link
                    href={`/ferramentas/${category.slug}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Section - Dynamic from Custom Pages */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2">
              {customPages.map((page) => (
                <li key={page._id}>
                  <Link href={`/${page.slug}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {page.footerLabel || page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 max-w-6xl mx-auto">
          <p className="text-sm text-muted-foreground">© 2026 pdfs.com.br. Todos os direitos reservados.</p>
          <p className="text-sm text-muted-foreground">
            Parte da plataforma{" "}
            <Link
              href="https://designonline.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              DesignOnline.com.br
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};
