import { z } from "zod";
import { PostStatus } from "@workspace/types";

export const postSeoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  ogImage: z.string().optional(),
});

export const createPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  excerpt: z.string().min(1, "Excerpt is required"),
  coverImage: z.string().min(1, "Cover image is required"),
  content: z.record(z.string(), z.any()),
  status: z.nativeEnum(PostStatus).default(PostStatus.DRAFT),
  publishedAt: z.date().optional(),
  isFeaturedGlobal: z.boolean().default(false),
  toolIds: z.array(z.string()).default([]),
  seo: postSeoSchema.optional(),
});

export type CreatePostFormValues = z.input<typeof createPostSchema>;

export const updatePostSchema = createPostSchema.extend({
  id: z.string().min(1, "Post ID is required"),
});

export type UpdatePostFormValues = z.input<typeof updatePostSchema>;
