"use client";

"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "@/lib/hooks/use-debounce";
import { Input } from "@/components/ui/input";
import { Post } from "@/types";
import Link from "next/link";
import { Search } from "lucide-react";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery) {
      setIsLoading(true);
      fetch(`/api/search?q=${debouncedQuery}`)
        .then((res) => res.json())
        .then((data) => {
          setResults(data);
          setIsLoading(false);
        });
    } else {
      setResults([]);
    }
  }, [debouncedQuery]);

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search articles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10"
        />
      </div>
      {debouncedQuery && (
        <div className="absolute top-full mt-2 w-full bg-card border rounded-md shadow-lg z-10">
          {isLoading && <div className="p-4 text-muted-foreground">Searching...</div>}
          {!isLoading && results.length === 0 && (
            <div className="p-4 text-muted-foreground">No results found.</div>
          )}
          {!isLoading && results.length > 0 && (
            <ul>
              {results.map((post) => (
                <li key={post._id} className="border-b last:border-b-0">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block p-4 hover:bg-accent"
                    onClick={() => setQuery("")}
                  >
                    <h4 className="font-semibold">{post.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {post.content.substring(0, 100)}...
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}