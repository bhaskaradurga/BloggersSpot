import { NextResponse } from "next/server";
import { blogPosts, BlogPost } from "@/lib/mock-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 });
  }

  const filteredPosts = blogPosts.filter((post: BlogPost) => {
    const searchTerm = query.toLowerCase();
    const titleMatch = post.title.toLowerCase().includes(searchTerm);
    const excerptMatch = post.excerpt.toLowerCase().includes(searchTerm);
    return titleMatch || excerptMatch;
  });

  return NextResponse.json(filteredPosts);
}