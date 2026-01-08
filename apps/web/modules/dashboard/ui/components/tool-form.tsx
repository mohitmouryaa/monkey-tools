"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import type { z } from "zod";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import type { Category } from "@workspace/database";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import { Switch } from "@workspace/ui/components/switch";
import { createToolSchema } from "@/modules/dashboard/schema/tool";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@workspace/ui/components/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import { VisualStepsBuilder } from "./visual-steps-builder";
import { RichTextEditor } from "./rich-text-editor";
import { FAQManager } from "./faq-manager";

export type ToolFormValues = z.infer<typeof createToolSchema>;

interface ToolFormProps {
  defaultValues?: Partial<ToolFormValues>;
  onSubmit: (values: ToolFormValues) => void;
  submitLabel?: string;
  disabled?: boolean;
}

export const ToolForm = ({ defaultValues, onSubmit, submitLabel = "Save", disabled = false }: ToolFormProps) => {
  const trpc = useTRPC();
  const { data: categories, isLoading: isLoadingCategories } = useQuery(trpc.categories.getMany.queryOptions({}));

  const form = useForm<ToolFormValues>({
    resolver: zodResolver(createToolSchema),
    defaultValues: {
      title: "",
      link: "",
      componentName: "",
      description: "",
      categoryId: "",
      icon: "",
      iconColor: "",
      bgColor: "",
      seoTitle: "",
      seoDescription: "",
      seoKeywords: "",
      h1Heading: "",
      introText: "",
      stepsTitle: "",
      visualSteps: [],
      richContent: "",
      faqs: [],
      closingText: "",
      isActive: true,
      ...defaultValues,
    },
  });

  // Reset form when defaultValues change (important for edit mode)
  useEffect(() => {
    if (defaultValues) {
      form.reset({
        title: "",
        link: "",
        componentName: "",
        description: "",
        categoryId: "",
        icon: "",
        iconColor: "",
        bgColor: "",
        seoTitle: "",
        seoDescription: "",
        seoKeywords: "",
        h1Heading: "",
        introText: "",
        stepsTitle: "",
        visualSteps: [],
        richContent: "",
        faqs: [],
        closingText: "",
        isActive: true,
        ...defaultValues,
      });
    }
  }, [defaultValues, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">General Information</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tool Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. PDF to JPG" {...field} disabled={disabled} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="componentName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Component Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. pdf-to-jpg" {...field} disabled={disabled} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Brief description of the tool..." {...field} disabled={disabled} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tool URL Path</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. /pdf-to-jpg" {...field} disabled={disabled} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} disabled={disabled || isLoadingCategories}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories?.items.map((category: Category) => (
                        <SelectItem key={category._id} value={category._id as string}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Visual Configuration</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. FileText" {...field} disabled={disabled} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="iconColor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon Color</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. #FF0000 or text-red-500" {...field} disabled={disabled} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="bgColor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Background Color</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. bg-blue-50" {...field} disabled={disabled} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start justify-between p-3 border rounded-lg shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Active Status</FormLabel>
                    <FormDescription>Publicly visible.</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} disabled={disabled} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">SEO Configuration</h3>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="seoTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SEO Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Meta title for search engines" {...field} disabled={disabled} />
                  </FormControl>
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
                    <Input placeholder="Meta description..." {...field} disabled={disabled} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="seoKeywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Keywords</FormLabel>
                  <FormControl>
                    <Input placeholder="pdf, convert, jpg, image (comma separated)" {...field} disabled={disabled} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Page Content</h3>
          
          <FormField
            control={form.control}
            name="h1Heading"
            render={({ field }) => (
              <FormItem>
                <FormLabel>H1 Heading (Optional)</FormLabel>
                <FormDescription>Custom H1 for the tool page. Leave empty to use tool title.</FormDescription>
                <FormControl>
                  <Input placeholder="e.g., Compress PDF: reduce file size online for free" {...field} disabled={disabled} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="introText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Introduction Text</FormLabel>
                <FormDescription>Short intro below H1 heading (80-120 words recommended)</FormDescription>
                <FormControl>
                  <Textarea placeholder="Brief introduction to the tool..." {...field} disabled={disabled} rows={3} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="stepsTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Steps Section Title (Optional)</FormLabel>
                <FormDescription>Custom title for "How It Works" section. Leave empty for default.</FormDescription>
                <FormControl>
                  <Input placeholder="e.g., How to Compress PDF Files" {...field} disabled={disabled} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="visualSteps"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How It Works Steps</FormLabel>
                <FormDescription>Visual steps with icons (max 5)</FormDescription>
                <FormControl>
                  <VisualStepsBuilder
                    value={field.value || []}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="richContent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rich Content</FormLabel>
                <FormDescription>
                  Add detailed content: benefits, who it's for, features, etc.
                </FormDescription>
                <FormControl>
                  <RichTextEditor
                    value={field.value || ""}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="faqs"
            render={({ field }) => (
              <FormItem>
                <FormLabel>FAQs</FormLabel>
                <FormDescription>Frequently asked questions for this tool</FormDescription>
                <FormControl>
                  <FAQManager
                    faqs={field.value || []}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="closingText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Closing Text</FormLabel>
                <FormDescription>Final call-to-action or summary (80-120 words recommended)</FormDescription>
                <FormControl>
                  <Textarea placeholder="Closing message for the tool page..." {...field} disabled={disabled} rows={3} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="w-full md:w-auto" disabled={disabled}>
            {disabled && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
};
