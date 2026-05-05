import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@workspace/ui/components/accordion";
import type { FaqBlockData } from "@workspace/types";

interface FaqBlockProps {
  data: FaqBlockData;
}

export function FaqBlock({ data }: FaqBlockProps) {
  const items = data.items ?? [];

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {data.title && <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 md:mb-10 text-center">{data.title}</h2>}

        <Accordion type="single" collapsible className="w-full">
          {items.map((item, index) => (
            <AccordionItem key={item.question} value={`faq-${index}`}>
              <AccordionTrigger className="text-base md:text-lg font-semibold">{item.question}</AccordionTrigger>
              <AccordionContent>
                <div
                  className="text-sm md:text-base text-muted-foreground leading-relaxed [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-[3px] [&_strong]:font-semibold [&_strong]:text-foreground [&_em]:italic"
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: editor inline tools sanitiza no admin
                  dangerouslySetInnerHTML={{ __html: item.answer }}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
