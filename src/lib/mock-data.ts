import { Post } from "@/types";

export const blogPosts: Post[] = [
  {
    _id: "1",
    title: "First Post",
    slug: "first-post",
    content: "This is the content of the first post.",
    images: [],
    videos: [],
    tags: ["Tech"],
    createdAt: new Date().toISOString(),
    category: "Tech",
  },
  {
    _id: "2",
    title: "Second Post",
    slug: "second-post",
    content: "This is the content of the second post.",
    images: [],
    videos: [],
    tags: ["Health"],
    createdAt: new Date().toISOString(),
    category: "Health",
  },
];