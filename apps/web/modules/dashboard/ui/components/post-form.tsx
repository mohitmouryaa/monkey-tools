"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostStatus } from "@workspace/types";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import { Switch } from "@workspace/ui/components/switch";
import { Card, CardContent } from "@workspace/ui/components/card";
import { DatePicker } from "@workspace/ui/components/date-picker";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@workspace/ui/components/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import { createPostSchema, type CreatePostFormValues } from "@/modules/dashboard/schema/post";
import { usePostFileUpload } from "@/modules/dashboard/hooks/use-post-file-upload";
import { PostSeoFields } from "@/modules/dashboard/ui/components/post-seo-fields";
import { PostToolsMultiSelect } from "@/modules/dashboard/ui/components/post-tools-multi-select";

// EditorJsWrapper tem default export (3.6a). next/dynamic com default export
// resolve direto sem precisar do `.then(...)`.
const EditorJsWrapper = dynamic(() => import("@/modules/dashboard/ui/components/editor-js"), {
  ssr: false,
  loading: () => <div className="min-h-[400px] border rounded-lg p-4 bg-background animate-pulse" />,
});

export type PostFormValues = CreatePostFormValues;

interface PostFormProps {
  defaultValues?: Partial<PostFormValues>;
  onSubmit: (values: PostFormValues) => void;
  submitLabel?: string;
  disabled?: boolean;
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const PostForm = ({ defaultValues, onSubmit, submitLabel = "Save", disabled = false }: PostFormProps) => {
  const { uploadFile, isUploading } = usePostFileUpload();

  const form = useForm<PostFormValues>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      coverImage: "",
      content: { blocks: [] },
      status: PostStatus.DRAFT,
      publishedAt: undefined,
      isFeaturedGlobal: false,
      toolIds: [],
      seo: { title: "", description: "", ogImage: "" },
      ...defaultValues,
    },
  });

  // Auto-slug enquanto o usuário não toca no campo slug manualmente.
  // Usar `getFieldState("slug").isDirty` em vez de `formState.dirtyFields.slug`
  // para evitar que o uso do `dirtyFields` proxy entre como dependência do effect.
  const titleValue = form.watch("title");
  useEffect(() => {
    const slugDirty = form.getFieldState("slug").isDirty;
    if (!slugDirty && titleValue) {
      form.setValue("slug", slugify(titleValue), { shouldValidate: false });
    }
  }, [titleValue, form]);

  // Reset em edit mode quando defaultValues chegam (ex.: dados vindos de query).
  useEffect(() => {
    if (defaultValues) {
      form.reset({
        title: "",
        slug: "",
        excerpt: "",
        coverImage: "",
        content: { blocks: [] },
        status: PostStatus.DRAFT,
        publishedAt: undefined,
        isFeaturedGlobal: false,
        toolIds: [],
        seo: { title: "", description: "", ogImage: "" },
        ...defaultValues,
      });
    }
  }, [defaultValues, form]);

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const { url } = await uploadFile(file);
    form.setValue("coverImage", url, { shouldDirty: true, shouldValidate: true });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Post title" {...field} disabled={disabled} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="post-slug" {...field} disabled={disabled} />
                  </FormControl>
                  <FormDescription>Lowercase letters, numbers and hyphens.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Excerpt</FormLabel>
                  <FormControl>
                    <Textarea rows={3} placeholder="Short summary..." {...field} disabled={disabled} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Cover */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <FormField
              control={form.control}
              name="coverImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Image</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <Input type="file" accept="image/*" onChange={handleCoverUpload} disabled={disabled || isUploading} />
                      {field.value && (
                        // biome-ignore lint/performance/noImgElement: cover preview do admin (URL externa do S3)
                        <img src={field.value} alt="Cover" className="max-w-xs rounded border" />
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>Required for SCHEDULED/PUBLISHED.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Tools */}
        <Card>
          <CardContent className="pt-6">
            <FormField
              control={form.control}
              name="toolIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Related Tools</FormLabel>
                  <FormControl>
                    <PostToolsMultiSelect value={field.value ?? []} onChange={field.onChange} disabled={disabled} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Editor.js content */}
        <Card>
          <CardContent className="pt-6">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <EditorJsWrapper value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* SEO sub-form */}
        <Card>
          <CardContent className="pt-6">
            <PostSeoFields form={form} />
          </CardContent>
        </Card>

        {/* Status / publishedAt / featured */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value} disabled={disabled}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={PostStatus.DRAFT}>Draft</SelectItem>
                      <SelectItem value={PostStatus.SCHEDULED}>Scheduled</SelectItem>
                      <SelectItem value={PostStatus.PUBLISHED}>Published</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="publishedAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Publish Date</FormLabel>
                  <FormControl>
                    <DatePicker value={field.value} onChange={field.onChange} disabled={disabled} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isFeaturedGlobal"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <FormLabel>Global Featured</FormLabel>
                    <FormDescription>Show on homepage featured section.</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} disabled={disabled} />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={disabled}>
            {disabled && <Loader2 className="mr-2 size-4 animate-spin" />}
            {submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
};
