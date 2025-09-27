import { blogPosts } from "@/lib/mock-data";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { CategoryFilter } from "@/components/blog/CategoryFilter";

export default async function HomePage({
  searchParams,
}: {
  searchParams?: { category?: string };
}) {
  const currentCategory = searchParams?.category;

  const filteredPosts = currentCategory
    ? blogPosts.filter((post) => post.category === currentCategory)
    : blogPosts;

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Discover
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          A curated list of the latest articles and insights.
        </p>
      </div>

      <div className="mb-8">
        <CategoryFilter />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <ArticleCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}