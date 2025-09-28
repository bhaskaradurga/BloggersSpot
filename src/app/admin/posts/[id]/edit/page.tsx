'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { TagInput } from '@/components/admin/TagInput';

export default function EditPostPage() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState('');
  const [videos, setVideos] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [error, setError] = useState('');
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const fetchPost = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    try {
      const res = await fetch(`/api/admin/content/${id}`, {
        headers: {
          'x-auth-token': token,
        },
      });
      if (res.ok) {
        const post = await res.json();
        setTitle(post.title);
        setSlug(post.slug);
        setContent(post.content);
        setImages(post.images.join(', '));
        setVideos(post.videos.join(', '));
        setTags(post.tags);
      } else {
        setError('Failed to fetch post');
      }
    } catch (err) {
      setError('An error occurred');
    }
  }, [id, router]);

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id, fetchPost]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`/api/admin/content/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token!,
        },
        body: JSON.stringify({
          title,
          slug,
          content,
          images: images.split(',').map((item) => item.trim()),
          videos: videos.split(',').map((item) => item.trim()),
          tags,
        }),
      });

      if (res.ok) {
        router.push('/admin/dashboard');
      } else {
        setError('Failed to update post');
      }
    } catch (err) {
      setError('An error occurred');
    }
  };

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Edit Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block">Slug</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block">Content (Markdown)</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded"
            rows={10}
            required
          ></textarea>
        </div>
        <div>
          <label className="block">Images (comma-separated URLs)</label>
          <input
            type="text"
            value={images}
            onChange={(e) => setImages(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block">Videos (comma-separated URLs)</label>
          <input
            type="text"
            value={videos}
            onChange={(e) => setVideos(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block">Tags</label>
          <TagInput value={tags} onChange={setTags} />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Update Post
        </button>
      </form>
    </div>
  );
}