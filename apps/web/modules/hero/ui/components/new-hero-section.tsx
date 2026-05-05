import { Zap } from "lucide-react";

interface HeroSectionContent {
  badge: string;
  heading: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
}

interface NewHeroSectionProps {
  heroSection?: HeroSectionContent;
}

export const NewHeroSection = (_props: NewHeroSectionProps) => {
  return (
    <section className="relative bg-gradient-to-b from-primary/5 via-background to-background py-20 md:py-28">
      <div className="container max-w-5xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Zap className="w-4 h-4 fill-primary" />
          <span>100% gratuito · Sem cadastro · Sem instalação</span>
        </div>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.05]">
          Ferramentas PDF <span className="text-primary">Online Grátis</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Simples, rápido e seguro. Transforme seus documentos em segundos.
        </p>
      </div>
    </section>
  );
};
