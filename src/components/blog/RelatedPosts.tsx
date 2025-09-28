import { Post } from '@/types';
import { ArticleCard } from './ArticleCard';

interface RelatedPostsProps {
  posts: Post[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <div className="py-8 mt-8 border-t">
      <h2 className="text-2xl font-bold">Related Posts</h2>
      <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <ArticleCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}