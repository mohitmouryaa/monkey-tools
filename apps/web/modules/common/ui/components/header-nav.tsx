"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface NavLink {
  _id: string;
  name: string;
  href: string;
}

interface HeaderNavProps {
  toolLinks: NavLink[];
}

export function HeaderNav({ toolLinks }: HeaderNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
        {toolLinks.map((link) => (
          <Link
            key={link._id}
            href={link.href}
            className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
          >
            {link.name}
          </Link>
        ))}
      </nav>
      <button
        type="button"
        className="lg:hidden p-2 rounded-lg hover:bg-accent transition-colors"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
      {mobileOpen && (
        <div className="lg:hidden absolute left-1/2 -translate-x-1/2 w-screen top-full border-t bg-card px-4 py-3 space-y-1 shadow-lg">
          {toolLinks.map((link) => (
            <Link
              key={link._id}
              href={link.href}
              className="block px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
