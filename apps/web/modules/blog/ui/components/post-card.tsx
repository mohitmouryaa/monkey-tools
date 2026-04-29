import Image from "next/image";
import Link from "next/link";

interface PostCardProps {
  post: {
    _id: string;
    slug: string;
    title: string;
    excerpt: string;
    coverImage: string;
    publishedAt?: string | Date | null;
    tools?: Array<{ _id: string; title: string }>;
  };
}

export const PostCard = ({ post }: PostCardProps) => {
  const tools = post.tools ?? [];
  const visibleTools = tools.slice(0, 3);

  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <div className="bg-card border border-border rounded-2xl p-4 transition hover:border-primary">
        <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
          <Image src={post.coverImage} alt={post.title} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
        {visibleTools.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {visibleTools.map((tool) => (
              <span key={tool._id} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                {tool.title}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};
