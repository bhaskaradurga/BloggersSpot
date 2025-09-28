'use client';

import { useState, useEffect } from 'react';
import { Post } from '@/types';
import { ArticleCard } from './ArticleCard';

interface RelatedPostsProps {
  tags: string[];
  currentPostId: string;
}

export function RelatedPosts({ tags, currentPostId }: RelatedPostsProps) {
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (tags.length > 0) {
      const fetchRelatedPosts = async () => {
        try {
          const res = await fetch(
            `/api/content/related?tags=${tags.join(
              ','
            )}&currentPostId=${currentPostId}&limit=3`
          );
          if (res.ok) {
            const data = await res.json();
            setRelatedPosts(data);
          }
        } catch (error) {
          console.error('Failed to fetch related posts:', error);
        }
      };
      fetchRelatedPosts();
    }
  }, [tags, currentPostId]);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <div className="py-8 mt-8 border-t">
      <h2 className="text-2xl font-bold">Related Posts</h2>
      <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 lg:grid-cols-3">
        {relatedPosts.map((post) => (
          <ArticleCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}