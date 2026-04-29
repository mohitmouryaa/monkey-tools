import Link from "next/link";
import { FileText, Shield } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-12 mt-16">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <span className="font-bold text-foreground">
              PDFs<span className="text-primary">.com.br</span>
            </span>
          </Link>
          <p className="text-sm text-muted-foreground text-center">
            Tudo que você precisa para trabalhar com PDFs.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Shield className="h-3.5 w-3.5" />
            <span>Seus arquivos são protegidos e apagados em 1h</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
