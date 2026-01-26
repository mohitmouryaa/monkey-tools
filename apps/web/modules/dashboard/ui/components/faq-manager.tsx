"use client";

import { Plus, Trash2 } from "lucide-react";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Button } from "@workspace/ui/components/button";
import { Textarea } from "@workspace/ui/components/textarea";
import { Card, CardContent } from "@workspace/ui/components/card";

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
    if (newFaqs[index]) {
      newFaqs[index][field] = value;
      onChange(newFaqs);
    }
  };

  const removeFAQ = (index: number) => {
    onChange(faqs.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <Card key={faq.question}>
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-4">
                <div>
                  <Label htmlFor={`question-${index}`} className="block mb-2 text-sm font-medium">
                    Question {index + 1}
                  </Label>
                  <Input
                    id={`question-${index}`}
                    placeholder="Enter question..."
                    value={faq.question}
                    onChange={(e) => updateFAQ(index, "question", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`answer-${index}`} className="block mb-2 text-sm font-medium">
                    Answer
                  </Label>
                  <Textarea
                    id={`answer-${index}`}
                    placeholder="Enter answer..."
                    value={faq.answer}
                    onChange={(e) => updateFAQ(index, "answer", e.target.value)}
                    rows={4}
                  />
                </div>
              </div>
              <Button type="button" variant="ghost" size="icon" onClick={() => removeFAQ(index)} className="mt-8">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button type="button" onClick={addFAQ} variant="outline" className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        Add FAQ {faqs.length > 0 && `(${faqs.length})`}
      </Button>

      {faqs.length === 0 && (
        <p className="py-4 text-sm text-center text-muted-foreground">
          No FAQs added yet. Click the button above to add your first FAQ.
        </p>
      )}
    </div>
  );
};
