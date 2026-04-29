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

export const NewHeroSection = ({ heroSection }: NewHeroSectionProps) => {
  const isDefault = !heroSection;
  const heading = heroSection?.heading;
  const description =
    heroSection?.description ?? "Converter, juntar, comprimir e editar PDFs online gratuitamente. Rápido, seguro e simples.";

  return (
    <section className="container max-w-4xl mx-auto px-4 py-20 md:py-32 text-center">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
        {isDefault ? (
          <>
            Ferramentas gratuitas para <span className="text-primary">trabalhar com PDFs</span>
          </>
        ) : (
          heading
        )}
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-16">{description}</p>
    </section>
  );
};
