import { Search, Gamepad2 } from "lucide-react";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import Link from "next/link";

export const NewHeroSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-primary/30 mb-6">
          <Gamepad2 className="w-4 h-4 text-primary" />
          <span className="text-sm text-primary">Your HQ for free tools</span>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          Choose your tools!
        </h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          The best free tools for you to use safely: we delete your files as soon as you finish using the tools. You benefit because it's safe.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link href="#tools">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
              <Gamepad2 className="w-5 h-5 mr-2" />
              Start now
            </Button>
          </Link>
          <Link href="/tools">
            <Button size="lg" variant="outline" className="border-muted-foreground/30 text-foreground hover:bg-secondary">
              View all tools
            </Button>
          </Link>
        </div>
        <div className="relative max-w-xl mx-auto md:hidden">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input 
            placeholder="Search for tool..." 
            className="pl-12 h-12 bg-secondary border-border text-base"
          />
        </div>
      </div>
    </section>
  );
};
