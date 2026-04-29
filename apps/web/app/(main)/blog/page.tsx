import type { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { PostStatus } from "@workspace/types";
import { caller } from "@/trpc/server";
import { BlogView } from "@/modules/blog/ui/views/blog-view";
import { PAGINATION } from "@/modules/common/constants";

export const metadata: Metadata = {
  title: "Blog - pdfs.com.br",
  description: "Tutoriais, comparativos e dicas para resolver tarefas com PDFs, imagens e documentos online.",
  openGraph: {
    title: "Blog - pdfs.com.br",
    description: "Tutoriais, comparativos e dicas para resolver tarefas com PDFs, imagens e documentos online.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - pdfs.com.br",
    description: "Tutoriais, comparativos e dicas para resolver tarefas com PDFs, imagens e documentos online.",
  },
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

  const isFiltered = Boolean(q) || Boolean(tool);
  const showFeatured = page === 1 && !isFiltered;

  return (
    <BlogView
      posts={list.items}
      featured={featured}
      page={list.page}
      totalPages={list.totalPages}
      totalCount={list.totalCount}
      showFeatured={showFeatured}
      isFiltered={isFiltered}
    />
  );
}
