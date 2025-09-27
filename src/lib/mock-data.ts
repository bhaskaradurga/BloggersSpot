export const blogPosts = [
  {
    id: 1,
    title: "The Rise of AI: What's New and What's Next",
    slug: "rise-of-ai",
    excerpt: "Artificial intelligence is evolving at an unprecedented pace. This article explores the latest breakthroughs and what they mean for our future.",
    content: "Full article content goes here...",
    publishedAt: "2025-09-26",
    category: "Technology",
    sourceCount: 42,
    readingTime: "7 min read",
    author: "Jane Doe"
  },
  {
    id: 2,
    title: "Sustainable Living: A Guide to a Greener Lifestyle",
    slug: "sustainable-living-guide",
    excerpt: "Discover practical tips and strategies for reducing your environmental impact and embracing a more sustainable way of life.",
    content: "Full article content goes here...",
    publishedAt: "2025-09-25",
    category: "Lifestyle",
    sourceCount: 28,
    readingTime: "6 min read",
    author: "John Smith"
  },
  {
    id: 3,
    title: "The Future of Remote Work: Trends and Predictions",
    slug: "future-of-remote-work",
    excerpt: "Remote work is here to stay. This post examines the trends shaping the future of work and how companies are adapting.",
    content: "Full article content goes here...",
    publishedAt: "2025-09-24",
    category: "Business",
    sourceCount: 35,
    readingTime: "5 min read",
    author: "Emily White"
  },
  {
    id: 4,
    title: "A Deep Dive into Quantum Computing",
    slug: "deep-dive-quantum-computing",
    excerpt: "Quantum computing promises to revolutionize industries. Learn the basics of this powerful technology and its potential applications.",
    content: "Full article content goes here...",
    publishedAt: "2025-09-23",
    category: "Science",
    sourceCount: 51,
    readingTime: "9 min read",
    author: "Michael Green"
  },
  {
    id: 5,
    title: "Mastering the Art of Public Speaking",
    slug: "mastering-public-speaking",
    excerpt: "Conquer your fear of public speaking with these proven techniques for delivering confident and engaging presentations.",
    content: "Full article content goes here...",
    publishedAt: "2025-09-22",
    category: "Self-Improvement",
    sourceCount: 19,
    readingTime: "4 min read",
    author: "Chris Lee"
  }
];

export type BlogPost = typeof blogPosts[0];