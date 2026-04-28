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
    <Accordion type="single" collapsible className="w-full space-y-3">
      {faqs.map((faq, index) => (
        <AccordionItem key={faq.question} value={`item-${index}`} className="border border-border/50 rounded-xl overflow-hidden">
          <AccordionTrigger className="w-full px-4 py-4 text-left text-lg font-semibold hover:bg-secondary/50 transition-colors hover:no-underline">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
