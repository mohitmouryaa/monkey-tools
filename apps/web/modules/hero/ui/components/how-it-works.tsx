interface HowItWorksStep {
  iconName: string;
  title: string;
  description: string;
  order: number;
}

interface HowItWorksSection {
  title: string;
  subtitle: string;
  steps: HowItWorksStep[];
}

interface HowItWorksProps {
  howItWorksSection?: HowItWorksSection;
}

const defaultContent: HowItWorksSection = {
  title: "Simples, rápido e seguro",
  subtitle:
    "Todas as ferramentas funcionam diretamente no navegador. Seus arquivos são criptografados e apagados automaticamente após 1 hora.",
  steps: [
    { iconName: "Heart", title: "100% Gratuito", description: "Use todas as ferramentas sem custo algum.", order: 0 },
    {
      iconName: "Zap",
      title: "Rápido",
      description: "Processamento em poucos segundos, direto no navegador.",
      order: 1,
    },
    { iconName: "Shield", title: "Seguro", description: "Arquivos criptografados e apagados após 1 hora.", order: 2 },
  ],
};

export const HowItWorks = ({ howItWorksSection }: HowItWorksProps) => {
  const content = howItWorksSection ?? defaultContent;
  const sortedSteps = [...content.steps].sort((a, b) => a.order - b.order).slice(0, 3);

  return (
    <section className="container max-w-4xl mx-auto px-4 pb-20">
      <div className="bg-secondary rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-2xl font-bold text-foreground mb-3">{content.title}</h2>
        <p className="text-muted-foreground max-w-lg mx-auto mb-8">{content.subtitle}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {sortedSteps.map((step) => (
            <div key={step.title}>
              <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
