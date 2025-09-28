import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Post } from "@/types";
import { blogPosts } from "@/lib/mock-data";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { RelatedPosts } from "@/components/blog/RelatedPosts";

type Props = {
  params: { slug: string };
};

function getPost(slug: string): Post | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

function getRelatedPosts(tags: string[], currentPostId: string): Post[] {
  return blogPosts.filter(
    (post) =>
      post._id !== currentPostId &&
      post.tags.some((tag) => tags.includes(tag))
  ).slice(0, 3);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost(params.slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.content.substring(0, 150),
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: Props) {
  const post = getPost(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.tags, post._id);
  const imageUrl = post.images?.[0];
  const videoUrl = post.videos?.[0];

  return (
    <main className="container px-4 py-8 mx-auto">
      <article className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {post.title}
        </h1>
        <div className="flex items-center my-4 space-x-4 text-sm text-muted-foreground">
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          {post.tags && post.tags.length > 0 && (
            <>
              <span>&middot;</span>
              <div className="flex space-x-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>

        {(imageUrl || videoUrl) && (
          <div className="my-8 aspect-video relative overflow-hidden rounded-lg">
            {videoUrl ? (
              <video src={videoUrl} className="w-full h-full object-cover" controls />
            ) : imageUrl ? (
              <img src={imageUrl} alt={post.title} className="w-full h-full object-cover" />
            ) : null}
          </div>
        )}

        <div className="prose dark:prose-invert lg:prose-xl max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </article>

      <div className="max-w-4xl mx-auto">
        <RelatedPosts posts={relatedPosts} />
      </div>
    </main>
  );
}