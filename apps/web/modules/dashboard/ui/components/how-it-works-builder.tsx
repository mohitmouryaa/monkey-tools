"use client";

import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { type UseFormReturn, useFieldArray } from "react-hook-form";
import { IconPicker } from "@/modules/dashboard/ui/components/icon-picker";
import type { UpdateHomepageInput } from "@/modules/dashboard/schema/page";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@workspace/ui/components/form";

interface HowItWorksBuilderProps {
  form: UseFormReturn<UpdateHomepageInput>;
}

export const HowItWorksBuilder = ({ form }: HowItWorksBuilderProps) => {
  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "howItWorksSection.steps",
  });

  const addStep = () => {
    append({
      iconName: "circle",
      title: "",
      description: "",
      order: fields.length,
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">How It Works Section</h3>
        <p className="text-sm text-muted-foreground">Configure the step-by-step guide section</p>
      </div>

      <FormField
        control={form.control}
        name="howItWorksSection.title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Section Title</FormLabel>
            <FormControl>
              <Input placeholder="e.g., How It Works" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="howItWorksSection.subtitle"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Section Subtitle</FormLabel>
            <FormControl>
              <Textarea placeholder="Enter subtitle" rows={2} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold">Steps</h4>
          <Button type="button" onClick={addStep} size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add Step
          </Button>
        </div>

        {fields.map((field, index) => (
          <Card key={field.id}>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GripVertical className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Step {index + 1}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {index > 0 && (
                      <Button type="button" variant="ghost" size="sm" onClick={() => move(index, index - 1)}>
                        ↑
                      </Button>
                    )}
                    {index < fields.length - 1 && (
                      <Button type="button" variant="ghost" size="sm" onClick={() => move(index, index + 1)}>
                        ↓
                      </Button>
                    )}
                    <Button type="button" variant="ghost" size="sm" onClick={() => remove(index)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name={`howItWorksSection.steps.${index}.iconName`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Icon</FormLabel>
                      <FormControl>
                        <IconPicker value={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`howItWorksSection.steps.${index}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter step title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`howItWorksSection.steps.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter step description" rows={2} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        ))}

        {fields.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">No steps added yet. Click "Add Step" to create one.</div>
        )}
      </div>
    </div>
  );
};
