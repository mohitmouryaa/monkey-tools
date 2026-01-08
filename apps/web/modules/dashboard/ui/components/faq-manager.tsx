"use client";

import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import { Plus, Trash2 } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQManagerProps {
  faqs: FAQ[];
  onChange: (faqs: FAQ[]) => void;
}

export const FAQManager = ({ faqs = [], onChange }: FAQManagerProps) => {
  const addFAQ = () => {
    onChange([...faqs, { question: "", answer: "" }]);
  };

  const updateFAQ = (index: number, field: keyof FAQ, value: string) => {
    const newFaqs = [...faqs];
    newFaqs[index][field] = value;
    onChange(newFaqs);
  };

  const removeFAQ = (index: number) => {
    onChange(faqs.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <Card key={index}>
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Question {index + 1}</label>
                  <Input
                    placeholder="Enter question..."
                    value={faq.question}
                    onChange={(e) => updateFAQ(index, "question", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Answer</label>
                  <Textarea
                    placeholder="Enter answer..."
                    value={faq.answer}
                    onChange={(e) => updateFAQ(index, "answer", e.target.value)}
                    rows={4}
                  />
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeFAQ(index)}
                className="mt-8"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button type="button" onClick={addFAQ} variant="outline" className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add FAQ {faqs.length > 0 && `(${faqs.length})`}
      </Button>

      {faqs.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4">
          No FAQs added yet. Click the button above to add your first FAQ.
        </p>
      )}
    </div>
  );
};

