import Link from "next/link";
import { BlogPost } from "@/lib/mock-data";

export function ArticleCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block">
      <div className="bg-card text-card-foreground rounded-lg border shadow-sm hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        <div className="p-6 flex-grow">
          <span className="text-xs text-muted-foreground">{post.category.toUpperCase()}</span>
          <h3 className="text-lg font-semibold my-2">{post.title}</h3>
          <p className="text-muted-foreground text-sm mb-4">{post.excerpt}</p>
        </div>
        <div className="p-6 pt-0 text-xs text-muted-foreground flex justify-between items-center border-t mt-auto">
          <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
          <span>{post.sourceCount} sources</span>
        </div>
      </div>
    </Link>
  );
}