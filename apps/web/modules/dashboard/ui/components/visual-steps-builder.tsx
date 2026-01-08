"use client";

import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import { Trash2 } from "lucide-react";
import { IconPicker } from "./icon-picker";

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
        bgColor: "#3b82f6"
      }
    ]);
  };

  const updateStep = (index: number, field: keyof VisualStep, newValue: string) => {
    const newSteps = [...value];
    newSteps[index] = { ...newSteps[index], [field]: newValue };
    onChange(newSteps);
  };

  const removeStep = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {value.map((step, index) => (
        <Card key={index}>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {/* First Row: Icon, Icon Color, BG Color, Delete */}
              <div className="grid grid-cols-12 gap-4">
                {/* Icon Picker */}
                <div className="col-span-4">
                  <label className="text-sm font-medium mb-2 block">Icon</label>
                  <IconPicker 
                    value={step.icon} 
                    onChange={(icon) => updateStep(index, "icon", icon)}
                    placeholder="Select icon..."
                  />
                </div>

                {/* Icon Color */}
                <div className="col-span-3">
                  <label className="text-sm font-medium mb-2 block">Icon Color</label>
                  <Input
                    type="text"
                    placeholder="#ffffff"
                    value={step.iconColor || "#ffffff"}
                    onChange={(e) => updateStep(index, "iconColor", e.target.value)}
                  />
                </div>

                {/* Background Color */}
                <div className="col-span-3">
                  <label className="text-sm font-medium mb-2 block">BG Color</label>
                  <Input
                    type="text"
                    placeholder="#3b82f6"
                    value={step.bgColor || "#3b82f6"}
                    onChange={(e) => updateStep(index, "bgColor", e.target.value)}
                  />
                </div>

                {/* Delete Button */}
                <div className="col-span-2 flex items-end">
                  <Button type="button" variant="destructive" size="icon" onClick={() => removeStep(index)} className="w-full">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Second Row: Title */}
              <div>
                <label className="text-sm font-medium mb-2 block">Step Title</label>
                <Input
                  placeholder="e.g., Upload your PDF file"
                  value={step.title}
                  onChange={(e) => updateStep(index, "title", e.target.value)}
                />
              </div>

              {/* Third Row: Description */}
              <div>
                <label className="text-sm font-medium mb-2 block">Step Description</label>
                <Textarea
                  placeholder="Describe this step..."
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
          Add Step {value.length > 0 && `(${value.length}/5)`}
        </Button>
      )}

      {value.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4">
          No steps added yet. Click the button above to add your first step.
        </p>
      )}
    </div>
  );
};

