"use client";

import type { UseFormReturn } from "react-hook-form";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@workspace/ui/components/form";

interface PageSeoFieldsProps {
  // biome-ignore lint/suspicious/noExplicitAny: React Hook Form type portability
  form: UseFormReturn<any>;
}

export const PageSeoFields = ({ form }: PageSeoFieldsProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">SEO Settings</h3>
        <p className="text-sm text-muted-foreground">Configure SEO metadata for better search engine visibility</p>
      </div>

      <FormField
        control={form.control}
        name="seoTitle"
        render={({ field }) => (
          <FormItem>
            <FormLabel>SEO Title</FormLabel>
            <FormControl>
              <Input placeholder="Enter SEO title" {...field} />
            </FormControl>
            <FormDescription>Title that appears in search engine results</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="seoDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel>SEO Description</FormLabel>
            <FormControl>
              <Textarea placeholder="Enter SEO description" rows={3} {...field} />
            </FormControl>
            <FormDescription>Description that appears in search engine results (150-160 characters recommended)</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="seoKeywords"
        render={({ field }) => (
          <FormItem>
            <FormLabel>SEO Keywords</FormLabel>
            <FormControl>
              <Input placeholder="keyword1, keyword2, keyword3" {...field} />
            </FormControl>
            <FormDescription>Comma-separated keywords for search engines</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
