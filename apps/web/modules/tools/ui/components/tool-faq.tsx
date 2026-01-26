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
        <AccordionItem key={faq.question} value={`item-${index}`}>
          <AccordionTrigger className="text-left text-lg font-semibold">{faq.question}</AccordionTrigger>
          <AccordionContent className="text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
