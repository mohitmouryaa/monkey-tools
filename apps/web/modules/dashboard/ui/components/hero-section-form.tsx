"use client";

import type { UseFormReturn } from "react-hook-form";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import type { UpdateHomepageInput } from "@/modules/dashboard/schema/page";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@workspace/ui/components/form";

interface HeroSectionFormProps {
  form: UseFormReturn<UpdateHomepageInput>;
}

export const HeroSectionForm = ({ form }: HeroSectionFormProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Seção Hero</h3>
        <p className="text-sm text-muted-foreground">Configure a seção principal (hero) da página inicial</p>
      </div>

      <FormField
        control={form.control}
        name="heroSection.badge"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Texto do Badge</FormLabel>
            <FormControl>
              <Input placeholder="ex: Novo Recurso" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="heroSection.heading"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Título Principal</FormLabel>
            <FormControl>
              <Textarea placeholder="Digite o título principal" rows={2} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="heroSection.description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Descrição</FormLabel>
            <FormControl>
              <Textarea placeholder="Digite a descrição do hero" rows={3} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="heroSection.primaryButtonText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Texto do Botão Primário</FormLabel>
              <FormControl>
                <Input placeholder="ex: Começar Agora" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="heroSection.primaryButtonLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link do Botão Primário</FormLabel>
              <FormControl>
                <Input placeholder="/ferramentas" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="heroSection.secondaryButtonText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Texto do Botão Secundário</FormLabel>
              <FormControl>
                <Input placeholder="ex: Saiba Mais" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="heroSection.secondaryButtonLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link do Botão Secundário</FormLabel>
              <FormControl>
                <Input placeholder="/about" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
