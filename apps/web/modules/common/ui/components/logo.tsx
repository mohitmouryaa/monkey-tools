import Link from "next/link";
import Image from "next/image";

export const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      <Image
        src="/logo.png"
        alt="PDFS.com.br"
        width={44}
        height={44}
        priority
        className="w-11 h-11 rounded-xl transition-transform group-hover:scale-105"
      />
      <span className="text-xl font-bold tracking-tight text-foreground">
        PDFS<span className="text-primary">.com.br</span>
      </span>
    </Link>
  );
};
