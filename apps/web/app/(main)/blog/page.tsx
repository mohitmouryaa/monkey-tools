import type { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { PostStatus } from "@workspace/types";
import { caller } from "@/trpc/server";
import { PostCard } from "@/modules/blog/ui/components/post-card";
import { PostFilterBar } from "@/modules/blog/ui/components/post-filter-bar";
import { FeaturedPostsSection } from "@/modules/blog/ui/components/featured-posts-section";
import { BlogPagination } from "@/modules/blog/ui/components/blog-pagination";
import { PAGINATION } from "@/modules/common/constants";

export const metadata: Metadata = {
  title: "Blog - Monkey Tools",
  description: "Aprenda a usar nossas ferramentas com tutoriais, dicas e novidades.",
};

interface BlogPageProps {
  searchParams: Promise<{
    page?: string;
    q?: string;
    tool?: string;
  }>;
}

interface PostListItem {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  publishedAt?: string | Date | null;
  tools?: Array<{ _id: string; title: string }>;
}

interface BlogListResult {
  items: PostListItem[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

const fetchBlogList = unstable_cache(
  async (page: number, pageSize: number, q: string, toolId: string | undefined) => {
    const [list, featured] = await Promise.all([
      caller.posts.list({
        page,
        pageSize,
        search: q,
        toolId,
        status: PostStatus.PUBLISHED,
      }),
      caller.posts.getFeatured({ limit: 3 }),
    ]);
    return {
      list: list as unknown as BlogListResult,
      featured: featured as unknown as PostListItem[],
    };
  },
  ["blog-list-v1"],
  { revalidate: 60, tags: ["blog"] },
);

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const sp = await searchParams;
  const page = Number(sp.page) > 0 ? Number(sp.page) : PAGINATION.DEFAULT_PAGE;
  const pageSize = PAGINATION.DEFAULT_PAGE_SIZE;
  const q = sp.q ?? "";
  const tool = sp.tool || undefined;

  const { list, featured } = await fetchBlogList(page, pageSize, q, tool);

  const showFeatured = page === 1 && !q && !tool;

  return (
    <div className="container px-4 py-12 mx-auto max-w-6xl">
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Blog</h1>
        <p className="mt-2 text-muted-foreground">
          Aprenda a usar nossas ferramentas com tutoriais, dicas e novidades.
        </p>
      </header>

      <div className="mb-8">
        <PostFilterBar />
      </div>

      {showFeatured && <FeaturedPostsSection posts={featured} />}

      {list.items.length === 0 ? (
        <div className="py-16 text-center text-muted-foreground">Nenhum artigo encontrado.</div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.items.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}

      <BlogPagination page={list.page} totalPages={list.totalPages} />
    </div>
  );
}
