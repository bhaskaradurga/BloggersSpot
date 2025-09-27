import { blogPosts } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts.find((post) => post.slug === params.slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <article className="prose dark:prose-invert lg:prose-xl mx-auto">
        <h1>{post.title}</h1>
        <div className="flex items-center space-x-4 mb-8 text-sm text-gray-500 dark:text-gray-400">
          <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
          <span>&middot;</span>
          <span>{post.readingTime}</span>
          <span>&middot;</span>
          <span>By {post.author}</span>
        </div>
        <p className="lead">{post.excerpt}</p>
        <div>{post.content}</div>
      </article>
    </main>
  );
}