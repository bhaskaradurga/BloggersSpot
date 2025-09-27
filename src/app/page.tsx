import { ArticleCard } from "@/components/blog/ArticleCard";
import { CategoryFilter } from "@/components/ui/CategoryFilter";
import { blogPosts } from "@/lib/data";
import type { BlogPost } from "@/lib/data";

export default function HomePage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const filteredPosts = searchParams.category
    ? blogPosts.filter((post) => post.category === searchParams.category)
    : blogPosts;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Discover</h1>
      <CategoryFilter />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post: BlogPost) => (
          <ArticleCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
