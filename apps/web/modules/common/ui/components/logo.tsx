import Link from "next/link";
import { FileText } from "lucide-react";

export const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2.5 font-extrabold text-xl cursor-pointer group">
      <div className="w-9 h-9 rounded-lg hero-gradient flex items-center justify-center shrink-0 transition-transform group-hover:scale-105">
        <FileText className="h-5 w-5 text-primary-foreground" />
      </div>
      <span className="leading-none tracking-tight text-foreground">
        pdfs<span className="text-primary">.com.br</span>
      </span>
    </Link>
  );
};
