export interface Post {
  _id: string;
  title: string;
  slug: string;
  content: string;
  images: string[];
  videos: string[];
  tags: string[];
  createdAt: string;
}