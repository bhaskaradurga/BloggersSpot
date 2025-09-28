import Link from "next/link";
import { Post } from "@/types";
import Image from "next/image";

export function ArticleCard({ post }: { post: Post }) {
  const excerpt = post.content.substring(0, 100) + "...";
  const imageUrl = post.images?.[0];
  const videoUrl = post.videos?.[0];
  const category = post.tags?.[0] || "Uncategorized";

  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <div className="bg-card text-card-foreground rounded-lg border shadow-sm transition-all duration-300 h-full flex flex-col group-hover:scale-105 group-hover:shadow-xl">
        {(imageUrl || videoUrl) && (
          <div className="aspect-video relative overflow-hidden rounded-t-lg">
            {videoUrl ? (
              <video
                src={videoUrl}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
            ) : imageUrl ? (
              <Image
                src={imageUrl}
                alt={post.title}
                fill
                className="object-cover"
              />
            ) : null}
          </div>
        )}
        <div className="p-6 flex-grow">
          <span className="text-xs text-muted-foreground">
            {category.toUpperCase()}
          </span>
          <h3 className="text-lg font-semibold my-2 transition-colors duration-300 group-hover:text-gradient">
            {post.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4">{excerpt}</p>
        </div>
        <div className="p-6 pt-0 text-xs text-muted-foreground flex justify-between items-center border-t mt-auto">
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </Link>
  );
}