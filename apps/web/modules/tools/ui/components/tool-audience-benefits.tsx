"use client";

import { Sparkles } from "lucide-react";
import { SafeDynamicIcon } from "@/modules/common/ui/components/safe-dynamic-icon";

interface Item {
  label: string;
  description: string;
  iconName?: string;
}

interface Props {
  audienceTitle: string;
  audienceIntro: string;
  audience: Item[];
  benefitsTitle: string;
  benefitsIntro: string;
  benefits: Item[];
}

const ICON_PALETTE = [
  { color: "text-blue-600", ring: "ring-blue-200", bg: "bg-blue-50" },
  { color: "text-violet-600", ring: "ring-violet-200", bg: "bg-violet-50" },
  { color: "text-amber-600", ring: "ring-amber-200", bg: "bg-amber-50" },
  { color: "text-emerald-600", ring: "ring-emerald-200", bg: "bg-emerald-50" },
  { color: "text-rose-600", ring: "ring-rose-200", bg: "bg-rose-50" },
  { color: "text-cyan-600", ring: "ring-cyan-200", bg: "bg-cyan-50" },
  { color: "text-fuchsia-600", ring: "ring-fuchsia-200", bg: "bg-fuchsia-50" },
];

const Block = ({
  eyebrow,
  title,
  intro,
  items,
  railBg,
  eyebrowColor,
  paletteOffset = 0,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  items: Item[];
  railBg: string;
  eyebrowColor: string;
  paletteOffset?: number;
}) => (
  <div className="relative">
    <div className={`absolute left-0 top-1 bottom-1 w-px ${railBg}`} aria-hidden />

    <div className="pl-7 md:pl-9">
      <span
        className={`inline-flex items-center gap-2 mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] ${eyebrowColor}`}
      >
        <span className={`h-1 w-1 rounded-full ${railBg}`} aria-hidden />
        {eyebrow}
      </span>

      <h2 className="mb-4 text-2xl md:text-[28px] font-bold text-foreground tracking-tight leading-tight max-w-2xl">{title}</h2>

      <p className="mb-8 text-[15px] md:text-base text-muted-foreground leading-relaxed max-w-2xl">{intro}</p>

      <ul className="space-y-5">
        {items.map((item, i) => {
          const accent = ICON_PALETTE[(i + paletteOffset) % ICON_PALETTE.length]!;
          return (
            <li key={item.label} className="group flex gap-4">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${accent.bg} ring-1 ${accent.ring} transition-transform group-hover:scale-105`}
              >
                <SafeDynamicIcon
                  name={item.iconName}
                  className={`h-[18px] w-[18px] ${accent.color}`}
                  fallback={<Sparkles className={`h-[18px] w-[18px] ${accent.color}`} />}
                />
              </div>
              <div className="flex-1 pt-1 min-w-0">
                <p className="text-[15px] leading-relaxed">
                  <span className="font-semibold text-foreground">{item.label}</span>
                  <span className="text-muted-foreground"> — {item.description}</span>
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  </div>
);

export const ToolAudienceBenefits = ({
  audienceTitle,
  audienceIntro,
  audience,
  benefitsTitle,
  benefitsIntro,
  benefits,
}: Props) => {
  return (
    <section className="rounded-2xl border border-border bg-card p-8 md:p-12 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        <Block
          eyebrow="Para quem é"
          title={audienceTitle}
          intro={audienceIntro}
          items={audience}
          railBg="bg-indigo-200"
          eyebrowColor="text-indigo-600"
          paletteOffset={0}
        />
        <Block
          eyebrow="Vantagens"
          title={benefitsTitle}
          intro={benefitsIntro}
          items={benefits}
          railBg="bg-emerald-200"
          eyebrowColor="text-emerald-600"
          paletteOffset={2}
        />
      </div>
    </section>
  );
};
