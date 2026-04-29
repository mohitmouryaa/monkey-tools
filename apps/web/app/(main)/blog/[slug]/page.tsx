import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { unstable_cache } from "next/cache";
import type { OutputData } from "@editorjs/editorjs";
import { caller } from "@/trpc/server";
import { PostContentRenderer } from "@/modules/blog/ui/components/post-content-renderer";

interface BlogSlugPageProps {
  params: Promise<{ slug: string }>;
}

interface PostDetail {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  content: OutputData;
  publishedAt?: string | Date | null;
  seo?: { title?: string; description?: string; ogImage?: string } | null;
  tools?: Array<{ _id: string; title: string; link: string }>;
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
    ["blog-post-v1", slug],
    { revalidate: 60, tags: ["blog", `blog:${slug}`] },
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

  const title = post.seo?.title ?? post.title;
  const description = post.seo?.description ?? post.excerpt;
  const ogImage = post.seo?.ogImage ?? post.coverImage;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: ogImage ? [{ url: ogImage }] : undefined,
      publishedTime: post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
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
  const post = await fetchPostBySlug(slug);

  if (!post) notFound();

  return (
    <article className="container px-4 py-12 mx-auto max-w-4xl">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">{post.title}</h1>
        {post.excerpt && <p className="mt-3 text-lg text-muted-foreground">{post.excerpt}</p>}
      </header>

      {post.coverImage && (
        <div className="relative w-full mb-10 overflow-hidden rounded-2xl aspect-[16/9]">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(min-width: 1024px) 800px, 100vw"
            className="object-cover"
            priority
          />
        </div>
      )}

      <PostContentRenderer content={post.content} tools={post.tools ?? []} />

      {post.tools && post.tools.length > 0 && (
        <footer className="pt-10 mt-12 border-t border-border">
          <h2 className="mb-4 text-xl font-semibold text-foreground">Ferramentas relacionadas</h2>
          <ul className="space-y-2">
            {post.tools.map((tool) => (
              <li key={tool._id} className="text-muted-foreground">
                {tool.title}
              </li>
            ))}
          </ul>
        </footer>
      )}
    </article>
  );
}
