"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { CtaBlockData } from "@workspace/types";
import { Button } from "@workspace/ui/components/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@workspace/ui/components/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import { ctaBlockDataSchema } from "@/modules/dashboard/schema/page-blocks";
import type { BlockFormModalProps } from "./types";

export const CtaFormModal = ({ initialData, onCancel, onSave }: BlockFormModalProps<"cta">) => {
  const form = useForm<CtaBlockData>({
    resolver: zodResolver(ctaBlockDataSchema),
    defaultValues: initialData,
  });

  useEffect(() => {
    form.reset(initialData);
  }, [initialData, form]);

  const handleSubmit = form.handleSubmit((values) => {
    onSave(values);
  });

  return (
    <DialogContent className="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>Editar CTA</DialogTitle>
        <DialogDescription>Configure o bloco de chamada para ação.</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            control={form.control}
            name="heading"
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição (opcional)</FormLabel>
                <FormControl>
                  <Textarea rows={3} {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="buttonText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Texto do botão</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="buttonLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link do botão</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
