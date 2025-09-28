import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Post } from "@/types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { RelatedPosts } from "@/components/blog/RelatedPosts";

type Props = {
  params: { slug: string };
};

// We need a full URL for server-side fetching.
// In a real app, this would be in a .env file.
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

async function getPost(slug: string): Promise<Post | null> {
  try {
    const res = await fetch(`${API_URL}/api/content/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      return null;
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getPosts(): Promise<{ posts: Post[] }> {
  try {
    const res = await fetch(`${API_URL}/api/content`, { cache: "no-store" });
    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return { posts: [] };
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.content.substring(0, 150),
  };
}

export async function generateStaticParams() {
  const { posts } = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

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
        <RelatedPosts tags={post.tags} currentPostId={post._id} />
      </div>
    </main>
  );
}