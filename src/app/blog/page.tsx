import { ArticleCard } from "@/components/blog/ArticleCard";
import { CategoryFilter } from "@/components/blog/CategoryFilter";
import { Search } from "@/components/blog/Search";
import { Post } from "@/types";

async function getPosts(
  tag?: string,
  search?: string
): Promise<{ posts: Post[] }> {
  const params = new URLSearchParams();
  if (tag) {
    params.append("tags", tag);
  }
  if (search) {
    params.append("search", search);
  }

  const url = `${
    process.env.NEXT_PUBLIC_API_URL
  }/api/content?${params.toString()}`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return { posts: [] };
  }
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams?: { tag?: string; search?: string };
}) {
  const currentTag = searchParams?.tag;
  const currentSearch = searchParams?.search;
  const { posts } = await getPosts(currentTag, currentSearch);

  return (
    <main className="container px-4 py-8 mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {currentTag
            ? `Posts tagged "${currentTag}"`
            : currentSearch
            ? `Search results for "${currentSearch}"`
            : "All Posts"}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Browse through all available articles.
        </p>
      </div>

      <div className="mb-8">
        <Search />
      </div>

      <div className="mb-8">
        <CategoryFilter />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <ArticleCard key={post._id} post={post} />
        ))}
      </div>
    </main>
  );
}