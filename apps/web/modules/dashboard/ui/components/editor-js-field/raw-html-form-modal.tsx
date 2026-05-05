"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { RawHtmlBlockData } from "@workspace/types";
import { Button } from "@workspace/ui/components/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@workspace/ui/components/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@workspace/ui/components/form";
import { Textarea } from "@workspace/ui/components/textarea";
import { rawHtmlBlockDataSchema } from "@/modules/dashboard/schema/page-blocks";
import type { BlockFormModalProps } from "./types";

export const RawHtmlFormModal = ({ initialData, onCancel, onSave }: BlockFormModalProps<"raw-html">) => {
  const form = useForm<RawHtmlBlockData>({
    resolver: zodResolver(rawHtmlBlockDataSchema),
    defaultValues: initialData,
  });

  useEffect(() => {
    form.reset(initialData);
  }, [initialData, form]);

  const handleSubmit = form.handleSubmit((values) => {
    onSave(values);
  });

  return (
    <DialogContent className="sm:max-w-2xl">
      <DialogHeader>
        <DialogTitle>Editar HTML cru</DialogTitle>
        <DialogDescription>
          Bloco usado pela migração do conteúdo legado. Edite com cuidado — o HTML é renderizado direto na página pública.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            control={form.control}
            name="html"
            render={({ field }) => (
              <FormItem>
                <FormLabel>HTML</FormLabel>
                <FormControl>
                  <Textarea rows={16} className="font-mono text-xs" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
