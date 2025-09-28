'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function CategoryFilter() {
  const [tags, setTags] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const currentTag = searchParams.get('tag');

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await fetch('/api/content/tags');
        if (res.ok) {
          const data = await res.json();
          setTags(['All', ...data]);
        }
      } catch (error) {
        console.error('Failed to fetch tags:', error);
      }
    };
    fetchTags();
  }, []);

  return (
    <div className="flex items-center space-x-2 overflow-x-auto pb-2">
      {tags.map((tag) => {
        const href = tag === 'All' ? '/blog' : `/blog?tag=${encodeURIComponent(tag)}`;
        const isActive = tag === 'All' ? !currentTag : currentTag === tag;

        return (
          <Link key={tag} href={href} passHref>
            <Button
              variant={isActive ? 'default' : 'outline'}
              className="whitespace-nowrap"
            >
              {tag}
            </Button>
          </Link>
        );
      })}
    </div>
  );
}