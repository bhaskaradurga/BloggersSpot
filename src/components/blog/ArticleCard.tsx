
import Link from 'next/link';
import type { BlogPost } from '@/lib/data';

export const ArticleCard = ({ post }: { post: BlogPost }) => {
  return (
    <Link href={`/blog/${post.slug}`}>
      <div className="group block bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{post.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mt-2">{post.excerpt}</p>
        <div className="text-sm text-gray-500 dark:text-gray-400 mt-4 flex items-center justify-between">
          <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
          <div className="flex items-center space-x-4">
            <span>{post.sourceCount} sources</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">{post.readingTime}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
