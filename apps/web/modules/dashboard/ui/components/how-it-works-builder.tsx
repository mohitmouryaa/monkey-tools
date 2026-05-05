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
        <h3 className="text-lg font-semibold">Seção Como Funciona</h3>
        <p className="text-sm text-muted-foreground">Configure a seção de guia passo a passo</p>
      </div>

      <FormField
        control={form.control}
        name="howItWorksSection.title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Título da Seção</FormLabel>
            <FormControl>
              <Input placeholder="ex.: Como Funciona" {...field} />
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
            <FormLabel>Subtítulo da Seção</FormLabel>
            <FormControl>
              <Textarea placeholder="Digite o subtítulo" rows={2} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold">Passos</h4>
          <Button type="button" onClick={addStep} size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Passo
          </Button>
        </div>

        {fields.map((field, index) => (
          <Card key={field.id}>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GripVertical className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Passo {index + 1}</span>
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
                      <FormLabel>Ícone</FormLabel>
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
                      <FormLabel>Título</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite o título do passo" {...field} />
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
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Digite a descrição do passo" rows={2} {...field} />
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
          <div className="text-center py-8 text-muted-foreground">Nenhum passo adicionado ainda. Clique em "Adicionar Passo" para criar um.</div>
        )}
      </div>
    </div>
  );
};
