import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { unstable_cache } from "next/cache";
import type { OutputData } from "@editorjs/editorjs";
import { PostStatus } from "@workspace/types";
import { caller } from "@/trpc/server";
import { PostView } from "@/modules/blog/ui/views/post-view";

interface BlogSlugPageProps {
  params: Promise<{ slug: string }>;
}

interface PostDetailTool {
  _id: string;
  title: string;
  link: string;
  description?: string;
  icon?: string;
  iconColor?: string;
  bgColor?: string;
  category?: { name: string; slug: string } | null;
}

interface PostDetail {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  content: OutputData;
  publishedAt?: string | Date | null;
  updatedAt?: string | Date | null;
  seo?: { title?: string; description?: string; ogImage?: string } | null;
  tools?: PostDetailTool[];
}

interface RelatedPost {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  publishedAt?: string | Date | null;
  tools?: Array<{ _id: string; title: string }>;
}

const fetchPostBySlug = (slug: string) =>
  unstable_cache(
    async () => {
      try {
        const result = await caller.posts.getBySlug({ slug });
        return result as unknown as PostDetail;
      } catch {
        return null;
      }
    },
    ["blog-post-v2", slug],
    { revalidate: 60, tags: ["blog", `blog:${slug}`] },
  )();

const fetchRelatedPosts = (slug: string) =>
  unstable_cache(
    async () => {
      const result = await caller.posts.list({ page: 1, pageSize: 4, status: PostStatus.PUBLISHED });
      const items = (result as unknown as { items: RelatedPost[] }).items;
      return items.filter((p) => p.slug !== slug).slice(0, 3);
    },
    ["blog-related-v1", slug],
    { revalidate: 60, tags: ["blog"] },
  )();

export async function generateMetadata({ params }: BlogSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);

  if (!post) {
    return {
      title: "Post não encontrado",
      description: "O artigo solicitado não foi encontrado.",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://pdfs.com.br";
  const title = post.seo?.title ?? post.title;
  const description = post.seo?.description ?? post.excerpt;
  const ogImage = post.seo?.ogImage ?? post.coverImage;
  const url = `${baseUrl}/blog/${post.slug}`;
  const keywords = (post.tools ?? []).map((t) => t.title);

  return {
    title,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: ogImage ? [{ url: ogImage }] : undefined,
      publishedTime: post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
      modifiedTime: post.updatedAt ? new Date(post.updatedAt).toISOString() : undefined,
      siteName: "pdfs.com.br",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function BlogSlugPage({ params }: BlogSlugPageProps) {
  const { slug } = await params;
  const [post, relatedPosts] = await Promise.all([fetchPostBySlug(slug), fetchRelatedPosts(slug)]);

  if (!post) notFound();

  return <PostView post={post} relatedPosts={relatedPosts} />;
}
