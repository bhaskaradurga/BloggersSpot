
import { NextResponse } from 'next/server';
import { blogPosts } from '@/lib/data';

export async function GET() {
  return NextResponse.json(blogPosts);
}
