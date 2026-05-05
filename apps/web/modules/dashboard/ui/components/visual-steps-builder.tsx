"use client";

import { IconPicker } from "./icon-picker";
import { Trash2 } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import { Card, CardContent } from "@workspace/ui/components/card";

interface VisualStep {
  icon: string;
  title: string;
  description: string;
  iconColor?: string;
  bgColor?: string;
}

interface VisualStepsBuilderProps {
  value: VisualStep[];
  onChange: (steps: VisualStep[]) => void;
}

export const VisualStepsBuilder = ({ value = [], onChange }: VisualStepsBuilderProps) => {
  const addStep = () => {
    if (value.length >= 5) return;
    onChange([
      ...value,
      {
        icon: "Upload",
        title: "",
        description: "",
        iconColor: "#ffffff",
        bgColor: "#3b82f6",
      },
    ]);
  };

  const updateStep = (index: number, field: keyof VisualStep, newValue: string) => {
    const newSteps = [...value];
    if (!newSteps[index]) return;
    newSteps[index] = { ...newSteps[index], [field]: newValue };
    onChange(newSteps);
  };

  const removeStep = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {value.map((step, index) => (
        <Card key={step.title}>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {/* First Row: Icon, Icon Color, BG Color, Delete */}
              <div className="grid grid-cols-12 gap-4">
                {/* Icon Picker */}
                <div className="col-span-4">
                  <span className="block mb-2 text-sm font-medium">Ícone</span>
                  <IconPicker
                    value={step.icon}
                    onChange={(icon) => updateStep(index, "icon", icon)}
                    placeholder="Selecione o ícone..."
                  />
                </div>

                {/* Icon Color */}
                <div className="col-span-3">
                  <span className="block mb-2 text-sm font-medium">Cor do Ícone</span>
                  <Input
                    type="text"
                    placeholder="#ffffff"
                    value={step.iconColor || "#ffffff"}
                    onChange={(e) => updateStep(index, "iconColor", e.target.value)}
                  />
                </div>

                {/* Background Color */}
                <div className="col-span-3">
                  <span className="block mb-2 text-sm font-medium">Cor de Fundo</span>
                  <Input
                    type="text"
                    placeholder="#3b82f6"
                    value={step.bgColor || "#3b82f6"}
                    onChange={(e) => updateStep(index, "bgColor", e.target.value)}
                  />
                </div>

                {/* Delete Button */}
                <div className="flex items-end col-span-2">
                  <Button type="button" variant="destructive" size="icon" onClick={() => removeStep(index)} className="w-full">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Second Row: Title */}
              <div>
                <span className="block mb-2 text-sm font-medium">Título do Passo</span>
                <Input
                  placeholder="ex: Envie seu arquivo PDF"
                  value={step.title}
                  onChange={(e) => updateStep(index, "title", e.target.value)}
                />
              </div>

              {/* Third Row: Description */}
              <div>
                <span className="block mb-2 text-sm font-medium">Descrição do Passo</span>
                <Textarea
                  placeholder="Descreva este passo..."
                  value={step.description}
                  onChange={(e) => updateStep(index, "description", e.target.value)}
                  rows={2}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {value.length < 5 && (
        <Button type="button" onClick={addStep} variant="outline" className="w-full">
          Adicionar Passo {value.length > 0 && `(${value.length}/5)`}
        </Button>
      )}

      {value.length === 0 && (
        <p className="py-4 text-sm text-center text-muted-foreground">
          Nenhum passo adicionado. Clique no botão acima para adicionar o primeiro passo.
        </p>
      )}
    </div>
  );
};
