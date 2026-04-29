"use client";

import { Upload, Shield, Zap, Lock, FileText } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";

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
  title: "Como Funciona",
  subtitle: "Trabalhar com PDFs nunca foi tão fácil. Em três passos simples você resolve qualquer tarefa.",
  steps: [
    {
      iconName: "Upload",
      title: "Selecione seu arquivo",
      description: "Arraste e solte ou clique para escolher seus arquivos PDF do computador ou celular.",
      order: 0,
    },
    {
      iconName: "Settings",
      title: "Processe automaticamente",
      description: "Nossa ferramenta processa seu arquivo instantaneamente com segurança total.",
      order: 1,
    },
    {
      iconName: "Download",
      title: "Baixe o resultado",
      description: "Faça o download do arquivo processado. Simples assim, sem complicação.",
      order: 2,
    },
  ],
};

const trustBadges = [
  { Icon: Shield, title: "100% Seguro", description: "Arquivos protegidos", tone: "bg-green-100 text-green-700" },
  { Icon: Zap, title: "Rápido", description: "Processamento instantâneo", tone: "bg-blue-100 text-blue-700" },
  { Icon: Lock, title: "Privado", description: "Arquivos não armazenados", tone: "bg-emerald-100 text-emerald-700" },
  { Icon: FileText, title: "Grátis", description: "Sem cadastro", tone: "bg-orange-100 text-orange-700" },
];

export const HowItWorks = ({ howItWorksSection }: HowItWorksProps) => {
  const content = howItWorksSection ?? defaultContent;
  const sortedSteps = [...content.steps].sort((a, b) => a.order - b.order).slice(0, 3);

  return (
    <section className="bg-muted/70 border-t border-border pt-16 md:pt-20 pb-16 md:pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center">
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5">{content.title}</h2>
          <p className="text-base md:text-lg text-muted-foreground">{content.subtitle}</p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-10 w-full mb-12 md:mb-16 justify-items-center">
          <div className="hidden md:block absolute top-12 left-[16.66%] right-[16.66%] h-px bg-border" aria-hidden />
          {sortedSteps.map((step, index) => (
            <div key={step.title} className="relative flex flex-col items-center text-center max-w-xs">
              <div className="w-24 h-24 rounded-2xl bg-primary flex items-center justify-center mb-6 shadow-lg shadow-primary/20 relative z-10">
                <DynamicIcon
                  name={step.iconName as IconName}
                  className="w-10 h-10 text-primary-foreground"
                  fallback={() => <Upload className="w-10 h-10 text-primary-foreground" />}
                />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {index + 1}. {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="w-full max-w-4xl mx-auto pt-10 border-t border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
            {trustBadges.map(({ Icon, title, description, tone }) => (
              <div key={title} className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${tone}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground leading-tight">{title}</p>
                  <p className="text-xs text-muted-foreground">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
