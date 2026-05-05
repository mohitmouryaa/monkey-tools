"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { HeroBlockData } from "@workspace/types";
import { Button } from "@workspace/ui/components/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@workspace/ui/components/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import { heroBlockDataSchema } from "@/modules/dashboard/schema/page-blocks";
import type { BlockFormModalProps } from "./types";

export const HeroFormModal = ({ initialData, onCancel, onSave }: BlockFormModalProps<"hero">) => {
  const form = useForm<HeroBlockData>({
    resolver: zodResolver(heroBlockDataSchema),
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
        <DialogTitle>Editar Hero</DialogTitle>
        <DialogDescription>Configure o cabeçalho destacado.</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            control={form.control}
            name="badge"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Badge (opcional)</FormLabel>
                <FormControl>
                  <Input placeholder="ex: Novo" {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="heading"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input placeholder="ex: Sobre nós" {...field} />
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
              name="primaryButtonText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Botão primário (texto)</FormLabel>
                  <FormControl>
                    <Input placeholder="opcional" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="primaryButtonLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Botão primário (link)</FormLabel>
                  <FormControl>
                    <Input placeholder="opcional" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="secondaryButtonText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Botão secundário (texto)</FormLabel>
                  <FormControl>
                    <Input placeholder="opcional" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="secondaryButtonLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Botão secundário (link)</FormLabel>
                  <FormControl>
                    <Input placeholder="opcional" {...field} value={field.value ?? ""} />
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
