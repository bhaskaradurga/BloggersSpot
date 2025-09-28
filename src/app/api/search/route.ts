import { NextResponse } from "next/server";
import { blogPosts } from "@/lib/mock-data";
import { Post } from "@/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 });
  }

  const filteredPosts = blogPosts.filter((post: Post) => {
    const searchTerm = query.toLowerCase();
    const titleMatch = post.title.toLowerCase().includes(searchTerm);
    const contentMatch = post.content.toLowerCase().includes(searchTerm);
    return titleMatch || contentMatch;
  });

  return NextResponse.json(filteredPosts);
}