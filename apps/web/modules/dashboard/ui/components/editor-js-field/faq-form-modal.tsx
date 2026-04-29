"use client";

import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import type { FaqBlockData } from "@workspace/types";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@workspace/ui/components/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import { faqBlockDataSchema } from "@/modules/dashboard/schema/page-blocks";
import type { BlockFormModalProps } from "./types";

export const FaqFormModal = ({ initialData, onCancel, onSave }: BlockFormModalProps<"faq">) => {
  const form = useForm<FaqBlockData>({
    resolver: zodResolver(faqBlockDataSchema),
    defaultValues: initialData,
  });

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "items",
  });

  useEffect(() => {
    form.reset(initialData);
  }, [initialData, form]);

  const addItem = () => {
    append({ question: "", answer: "" });
  };

  const handleSubmit = form.handleSubmit((values) => {
    onSave(values);
  });

  return (
    <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Editar FAQ</DialogTitle>
        <DialogDescription>Configure perguntas e respostas.</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título da seção (opcional)</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold">Itens</h4>
              <Button type="button" size="sm" variant="outline" onClick={addItem}>
                <Plus className="w-4 h-4 mr-2" />
                Adicionar
              </Button>
            </div>

            {fields.map((field, index) => (
              <Card key={field.id}>
                <CardContent className="pt-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Item {index + 1}</span>
                    <div className="flex items-center gap-1">
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
                    name={`items.${index}.question`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pergunta</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`items.${index}.answer`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Resposta</FormLabel>
                        <FormControl>
                          <Textarea rows={4} placeholder="Texto ou HTML simples (links com <a>, <strong>...)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            ))}

            {fields.length === 0 ? (
              <div className="text-sm text-muted-foreground text-center py-4">
                Nenhum item. Clique em "Adicionar" para criar um.
              </div>
            ) : null}

            {form.formState.errors.items?.message ? (
              <p className="text-sm text-destructive">{form.formState.errors.items.message}</p>
            ) : null}
          </div>

          <DialogFooter>
            <Button type="button" variant="ghost" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};
