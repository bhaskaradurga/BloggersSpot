
export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  category: string;
  sourceCount: number;
  readingTime: string;
  author: string;
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Future of Artificial Intelligence: Trends to Watch",
    slug: "future-of-ai",
    excerpt: "Explore the upcoming trends in AI, from generative models to ethical considerations.",
    content: "Full article content goes here...",
    publishedAt: "2025-09-26",
    category: "Technology",
    sourceCount: 42,
    readingTime: "8 min read",
    author: "Jane Doe",
    image: "/images/ai-future.jpg",
  },
  {
    id: 2,
    title: "Sustainable Living: A Guide to a Greener Lifestyle",
    slug: "sustainable-living-guide",
    excerpt: "Discover practical tips for reducing your carbon footprint and living more sustainably.",
    content: "Full article content goes here...",
    publishedAt: "2025-09-25",
    category: "Lifestyle",
    sourceCount: 28,
    readingTime: "6 min read",
    author: "John Smith",
    image: "/images/sustainable-living.jpg",
  },
  {
    id: 3,
    title: "Next.js 14: A Deep Dive into the Latest Features",
    slug: "nextjs-14-features",
    excerpt: "A comprehensive overview of the new capabilities introduced in Next.js 14.",
    content: "Full article content goes here...",
    publishedAt: "2025-09-24",
    category: "Web Development",
    sourceCount: 55,
    readingTime: "12 min read",
    author: "Alex Johnson",
    image: "/images/nextjs-14.jpg",
  },
  {
    id: 4,
    title: "The Art of Minimalist Design: Less is More",
    slug: "minimalist-design-art",
    excerpt: "Learn the principles of minimalist design and how to apply them to your projects.",
    content: "Full article content goes here...",
    publishedAt: "2025-09-23",
    category: "Design",
    sourceCount: 19,
    readingTime: "4 min read",
    author: "Emily White",
    image: "/images/minimalist-design.jpg",
  },
  {
    id: 5,
    title: "Global Economic Outlook for 2026",
    slug: "global-economic-outlook-2026",
    excerpt: "Analysts predict a challenging but resilient global economy in the coming year.",
    content: "Full article content goes here...",
    publishedAt: "2025-09-22",
    category: "Business",
    sourceCount: 63,
    readingTime: "10 min read",
    author: "Michael Brown",
    image: "/images/economic-outlook.jpg",
  },
  {
    id: 6,
    title: "A Traveler's Guide to Southeast Asia's Hidden Gems",
    slug: "southeast-asia-hidden-gems",
    excerpt: "Uncover breathtaking landscapes and cultural treasures off the beaten path.",
    content: "Full article content goes here...",
    publishedAt: "2025-09-21",
    category: "Travel",
    sourceCount: 34,
    readingTime: "7 min read",
    author: "Sophia Garcia",
    image: "/images/sea-travel.jpg",
  }
];
