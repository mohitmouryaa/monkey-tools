"use client";

import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import type { CardsBlockData } from "@workspace/types";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@workspace/ui/components/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import { cardsBlockDataSchema } from "@/modules/dashboard/schema/page-blocks";
import { IconPicker } from "@/modules/dashboard/ui/components/icon-picker";
import type { BlockFormModalProps } from "./types";

export const CardsFormModal = ({ initialData, onCancel, onSave }: BlockFormModalProps<"cards">) => {
  const form = useForm<CardsBlockData>({
    resolver: zodResolver(cardsBlockDataSchema),
    defaultValues: initialData,
  });

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "cards",
  });

  useEffect(() => {
    form.reset(initialData);
  }, [initialData, form]);

  const addCard = () => {
    append({ iconName: "", title: "", description: "", linkLabel: "", linkHref: "" });
  };

  const handleSubmit = form.handleSubmit((values) => {
    onSave(values);
  });

  return (
    <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Editar Cards</DialogTitle>
        <DialogDescription>Configure os cards do bloco.</DialogDescription>
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
          <FormField
            control={form.control}
            name="subtitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subtítulo (opcional)</FormLabel>
                <FormControl>
                  <Textarea rows={2} {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold">Cards</h4>
              <Button type="button" size="sm" variant="outline" onClick={addCard}>
                <Plus className="w-4 h-4 mr-2" />
                Adicionar
              </Button>
            </div>

            {fields.map((field, index) => (
              <Card key={field.id}>
                <CardContent className="pt-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Card {index + 1}</span>
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
                    name={`cards.${index}.iconName`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ícone (opcional)</FormLabel>
                        <FormControl>
                          <IconPicker value={field.value ?? ""} onChange={field.onChange} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`cards.${index}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`cards.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição</FormLabel>
                        <FormControl>
                          <Textarea rows={2} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <FormField
                      control={form.control}
                      name={`cards.${index}.linkLabel`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Link (texto, opcional)</FormLabel>
                          <FormControl>
                            <Input {...field} value={field.value ?? ""} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`cards.${index}.linkHref`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Link (href, opcional)</FormLabel>
                          <FormControl>
                            <Input {...field} value={field.value ?? ""} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}

            {fields.length === 0 ? (
              <div className="text-sm text-muted-foreground text-center py-4">
                Nenhum card. Clique em "Adicionar" para criar um.
              </div>
            ) : null}

            {form.formState.errors.cards?.message ? (
              <p className="text-sm text-destructive">{form.formState.errors.cards.message}</p>
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
