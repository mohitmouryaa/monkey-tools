import { Header } from "@/modules/common/ui/components/header";
import { Footer } from "@/modules/common/ui/components/footer";

export default function HeroLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="light min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
