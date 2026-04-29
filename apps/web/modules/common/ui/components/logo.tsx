import Link from "next/link";
import { FileText } from "lucide-react";

export const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center transition-transform group-hover:scale-105">
        <FileText className="w-6 h-6 text-primary-foreground" strokeWidth={2.5} />
      </div>
      <span className="text-xl font-bold tracking-tight text-foreground">
        PDFS<span className="text-primary">.com.br</span>
      </span>
    </Link>
  );
};
