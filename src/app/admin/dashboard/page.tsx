'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { DeleteConfirmationModal } from '@/components/admin/DeleteConfirmationModal';

interface Post {
  _id: string;
  title: string;
  tags: string[];
  createdAt: string;
}

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default function DashboardPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTags, setFilterTags] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const router = useRouter();

  const debouncedSearchTerm = useDebounce(searchTerm, 400);
  const debouncedFilterTags = useDebounce(filterTags, 400);

  const fetchPosts = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    const params = new URLSearchParams({
      search: debouncedSearchTerm,
      tags: debouncedFilterTags,
      sortBy,
      sortOrder,
    });

    try {
      const res = await fetch(`/api/admin/content?${params.toString()}`, {
        headers: {
          'x-auth-token': token,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      } else {
        setError('Failed to fetch posts');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  }, [debouncedSearchTerm, debouncedFilterTags, sortBy, sortOrder, router]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleDeleteClick = (id: string) => {
    setPostToDelete(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!postToDelete) return;

    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`/api/admin/content/${postToDelete}`, {
        method: 'DELETE',
        headers: {
          'x-auth-token': token!,
        },
      });

      if (res.ok) {
        setPosts(posts.filter((post) => post._id !== postToDelete));
      } else {
        alert('Failed to delete post');
      }
    } catch (err) {
      alert('An error occurred');
    } finally {
      setIsModalOpen(false);
      setPostToDelete(null);
    }
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  return (
    <>
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
      <div className="container p-4 mx-auto">
        <div className="flex flex-col items-start justify-between mb-4 md:flex-row md:items-center">
          <h1 className="mb-2 text-2xl font-bold md:mb-0">Admin Dashboard</h1>
          <Link
            href="/admin/posts/new"
            className="w-full px-4 py-2 text-center text-white bg-blue-500 rounded md:w-auto hover:bg-blue-600"
          >
            Create New Post
          </Link>
        </div>

        <div className="flex flex-col gap-4 mb-4 md:flex-row">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded md:w-1/2"
          />
          <input
            type="text"
            placeholder="Filter by tags (comma-separated)..."
            value={filterTags}
            onChange={(e) => setFilterTags(e.target.value)}
            className="w-full p-2 border rounded md:w-1/2"
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <div className="overflow-x-auto">
          <table className="hidden min-w-full bg-white md:table">
            <thead>
              <tr>
                <th
                  className="px-4 py-2 text-left cursor-pointer"
                  onClick={() => handleSort('title')}
                >
                  Title {sortBy === 'title' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-4 py-2 text-left">Tags</th>
                <th
                  className="px-4 py-2 text-left cursor-pointer"
                  onClick={() => handleSort('createdAt')}
                >
                  Created At{' '}
                  {sortBy === 'createdAt' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post._id} className="border-t">
                  <td className="px-4 py-2">{post.title}</td>
                  <td className="px-4 py-2">{post.tags.join(', ')}</td>
                  <td className="px-4 py-2">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    <Link
                      href={`/admin/posts/${post._id}/edit`}
                      className="mr-2 text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(post._id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="grid grid-cols-1 gap-4 md:hidden">
            {posts.map((post) => (
              <div key={post._id} className="p-4 bg-white border rounded-lg shadow">
                <h3 className="text-lg font-bold">{post.title}</h3>
                <p className="text-sm text-gray-600">
                  <strong>Tags:</strong> {post.tags.join(', ')}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Created:</strong>{' '}
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <div className="flex mt-4 space-x-2">
                  <Link
                    href={`/admin/posts/${post._id}/edit`}
                    className="px-3 py-1 text-sm text-white bg-blue-500 rounded"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteClick(post._id)}
                    className="px-3 py-1 text-sm text-white bg-red-500 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}