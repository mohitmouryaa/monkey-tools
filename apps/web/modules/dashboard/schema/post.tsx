import { z } from "zod";
import { PostStatus } from "@workspace/types";

export const postSeoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  ogImage: z.string().optional(),
});

const postBaseShape = {
  title: z.string().min(1, "Title is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  excerpt: z.string().min(1, "Excerpt is required"),
  coverImage: z.string().default(""),
  content: z.record(z.string(), z.any()),
  status: z.nativeEnum(PostStatus).default(PostStatus.DRAFT),
  publishedAt: z.date().optional(),
  isFeaturedGlobal: z.boolean().default(false),
  toolIds: z.array(z.string()).default([]),
  seo: postSeoSchema.optional(),
};

const requireCoverImageWhenPublishing = (data: { status: PostStatus; coverImage?: string }, ctx: z.RefinementCtx) => {
  if (
    (data.status === PostStatus.SCHEDULED || data.status === PostStatus.PUBLISHED) &&
    (!data.coverImage || data.coverImage.trim() === "")
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Cover image is required when scheduling or publishing",
      path: ["coverImage"],
    });
  }
};

export const createPostSchema = z.object(postBaseShape).superRefine(requireCoverImageWhenPublishing);

export type CreatePostFormValues = z.input<typeof createPostSchema>;

export const updatePostSchema = z
  .object({
    ...postBaseShape,
    id: z.string().min(1, "Post ID is required"),
  })
  .superRefine(requireCoverImageWhenPublishing);

export type UpdatePostFormValues = z.input<typeof updatePostSchema>;
