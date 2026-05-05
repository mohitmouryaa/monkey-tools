import { updateTag } from "next/cache";

export const BLOG_TAG = "blog";

export const tagForBlogSlug = (slug: string) => `blog:${slug}`;

export function revalidateBlog(slug?: string | null) {
  updateTag(BLOG_TAG);
  if (slug) {
    updateTag(tagForBlogSlug(slug));
  }
}
