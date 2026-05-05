import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@workspace/ui/components/accordion";

interface FAQ {
  question: string;
  answer: string;
}

interface ToolFAQProps {
  faqs: FAQ[];
}

export const ToolFAQ = ({ faqs }: ToolFAQProps) => {
  if (!faqs || faqs.length === 0) return null;

  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <AccordionItem key={faq.question} value={`item-${index}`} className="border-b border-border/60 last:border-b-0">
          <AccordionTrigger className="py-5 text-left text-base md:text-[17px] font-semibold text-foreground hover:no-underline">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="pb-5 text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
