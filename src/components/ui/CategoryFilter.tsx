
'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const categories = [
  'All',
  'Technology',
  'Lifestyle',
  'Web Development',
  'Design',
  'Business',
  'Travel',
];

export const CategoryFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') || 'All';

  const handleFilter = (category: string) => {
    if (category === 'All') {
      router.push('/');
    } else {
      router.push(`/?category=${category}`);
    }
  };

  return (
    <div className="flex space-x-2 overflow-x-auto pb-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleFilter(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
            currentCategory === category
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
