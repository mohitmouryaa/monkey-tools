"use client";

import type { UseFormReturn } from "react-hook-form";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@workspace/ui/components/form";

interface PostSeoFieldsProps {
  // biome-ignore lint/suspicious/noExplicitAny: React Hook Form type portability
  form: UseFormReturn<any>;
}

export const PostSeoFields = ({ form }: PostSeoFieldsProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">SEO Settings</h3>
        <p className="text-sm text-muted-foreground">
          Optional SEO metadata for the post (falls back to title/excerpt/coverImage).
        </p>
      </div>

      <FormField
        control={form.control}
        name="seo.title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>SEO Title</FormLabel>
            <FormControl>
              <Input placeholder="Defaults to post title" {...field} value={field.value ?? ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="seo.description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>SEO Description</FormLabel>
            <FormControl>
              <Textarea rows={3} placeholder="Defaults to excerpt" {...field} value={field.value ?? ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="seo.ogImage"
        render={({ field }) => (
          <FormItem>
            <FormLabel>OG Image URL</FormLabel>
            <FormControl>
              <Input placeholder="Defaults to cover image" {...field} value={field.value ?? ""} />
            </FormControl>
            <FormDescription>Public URL of the social preview image.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
