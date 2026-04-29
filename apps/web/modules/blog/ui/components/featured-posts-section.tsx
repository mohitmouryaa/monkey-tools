import { PostCard } from "./post-card";

interface FeaturedPostsSectionProps {
  posts: Array<{
    _id: string;
    slug: string;
    title: string;
    excerpt: string;
    coverImage: string;
    publishedAt?: string | Date | null;
    tools?: Array<{ _id: string; title: string }>;
  }>;
}

export const FeaturedPostsSection = ({ posts }: FeaturedPostsSectionProps) => {
  if (posts.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground">Em destaque</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <PostCard key={p._id} post={p} />
        ))}
      </div>
    </section>
  );
};
