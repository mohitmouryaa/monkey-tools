"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { Switch } from "@workspace/ui/components/switch";
import { useCreateCustomPage } from "@/modules/dashboard/hooks/use-create-custom-page";
import { useUpdateCustomPage } from "@/modules/dashboard/hooks/use-update-custom-page";
import {
  type CreateCustomPageFormValues,
  createCustomPageSchema,
  type UpdateCustomPageFormValues,
  updateCustomPageSchema,
} from "@/modules/dashboard/schema/page";
import { PageSeoFields } from "./page-seo-fields";
import { RichTextEditor } from "./rich-text-editor";

interface CustomPageFormProps {
  mode: "create" | "edit";
  defaultValues?: Partial<UpdateCustomPageFormValues>;
}

type PageFormValues = CreateCustomPageFormValues | UpdateCustomPageFormValues;

export const CustomPageForm = ({ mode, defaultValues }: CustomPageFormProps) => {
  const createCustomPage = useCreateCustomPage();
  const updateCustomPage = useUpdateCustomPage();

  const isCreate = mode === "create";
  const schema = isCreate ? createCustomPageSchema : updateCustomPageSchema;

  const form = useForm<PageFormValues>({
    // biome-ignore lint/suspicious/noExplicitAny: Resolver type mismatch with union types
    resolver: zodResolver(schema) as any,
    defaultValues: {
      title: "",
      slug: "",
      seoTitle: "",
      seoDescription: "",
      seoKeywords: "",
      content: "",
      showInFooter: true,
      footerOrder: 0,
      footerLabel: "",
      isActive: true,
      ...defaultValues,
    },
  });

  const onSubmit = (data: PageFormValues) => {
    if (isCreate) {
      createCustomPage.mutate(data as CreateCustomPageFormValues, {
        onError: (error) => toast.error(error.message),
      });
    } else {
      updateCustomPage.mutate(data as UpdateCustomPageFormValues, {
        onError: (error) => toast.error(error.message),
      });
    }
  };

  const isPending = createCustomPage.isPending || updateCustomPage.isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Basic Information</h3>
                <p className="text-sm text-muted-foreground">Configure the basic page information</p>
              </div>

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Page Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Privacy Policy" {...field} />
                    </FormControl>
                    <FormDescription>Title displayed on the page</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., privacy-policy" {...field} />
                    </FormControl>
                    <FormDescription>URL path (lowercase letters, numbers, and hyphens only)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <PageSeoFields form={form} />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Page Content</h3>
                <p className="text-sm text-muted-foreground">Write your page content using the rich text editor</p>
              </div>

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <RichTextEditor value={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Footer Settings</h3>
                <p className="text-sm text-muted-foreground">Control how this page appears in the footer</p>
              </div>

              <FormField
                control={form.control}
                name="showInFooter"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Show in Footer</FormLabel>
                      <FormDescription>Toggle whether this page should appear in the site footer</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              {form.watch("showInFooter") && (
                <>
                  <FormField
                    control={form.control}
                    name="footerOrder"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Footer Order</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormDescription>Lower numbers appear first (0 = first)</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="footerLabel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Footer Label (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Leave empty to use page title" {...field} value={field.value || ""} />
                        </FormControl>
                        <FormDescription>Custom text to display in footer (defaults to page title)</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Active Status</FormLabel>
                    <FormDescription>Pages that are inactive will only be visible to admins</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : isCreate ? "Create Page" : "Update Page"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
