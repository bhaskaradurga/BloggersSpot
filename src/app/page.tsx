import { ArticleCard } from "@/components/blog/ArticleCard";
import { CategoryFilter } from "@/components/blog/CategoryFilter";
import { Post } from "@/types";

async function getPosts(category?: string) {
  const url = new URL("http://localhost:3000/api/posts");
  if (category) {
    url.searchParams.append("tags", category);
  }

  try {
    const res = await fetch(url.toString(), { cache: "no-store" });
    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }
    const data = await res.json();
    return data.posts;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function HomePage({
  searchParams,
}: {
  searchParams?: { category?: string };
}) {
  const currentCategory = searchParams?.category;
  const posts: Post[] = await getPosts(currentCategory);

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {posts.map((post) => (
          <ArticleCard key={post._id} post={post} />
        ))}
      </div>
    </main>
  );
}