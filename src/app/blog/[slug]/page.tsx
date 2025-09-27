
import { blogPosts } from '@/lib/data';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts.find((post) => post.slug === params.slug);
  if (!post) {
    return {};
  }
  return { title: post.title, description: post.excerpt };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="prose dark:prose-invert lg:prose-xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-8">
        <span>{post.author}</span>
        <span>·</span>
        <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
        <span>·</span>
        <span>{post.readingTime}</span>
      </div>
      <p className="lead">{post.excerpt}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />
       <p>{post.content}</p>
    </article>
  );
}
