"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { blogPosts } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";

export function CategoryFilter() {
  const pathname = usePathname();
  const categories = ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))];

  return (
    <div className="flex items-center space-x-2 overflow-x-auto pb-2">
      {categories.map((category) => {
        const href = category === "All" ? "/blog" : `/category/${encodeURIComponent(category)}`;
        const isActive = pathname === href;

        return (
          <Link key={category} href={href} passHref>
            <Button
              variant={isActive ? "default" : "outline"}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          </Link>
        );
      })}
    </div>
  );
}