import { blogPosts, BlogPost } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { CategoryFilter } from "@/components/blog/CategoryFilter";

type Props = {
  params: { category: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = decodeURIComponent(params.category);
  const title = `Articles in ${category}`;
  const description = `Browse all articles in the ${category} category.`;

  return {
    title,
    description,
  };
}

export function generateStaticParams() {
  const categories = Array.from(new Set(blogPosts.map((post) => post.category)));
  return categories.map((category) => ({
    category: encodeURIComponent(category),
  }));
}

export default async function CategoryPage({ params }: Props) {
  const category = decodeURIComponent(params.category);
  const posts = blogPosts.filter((post) => post.category === category);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {category}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {`Showing articles in the "${category}" category.`}
        </p>
      </div>

      <div className="mb-8">
        <CategoryFilter />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <ArticleCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}