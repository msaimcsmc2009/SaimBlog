"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { BlogCard } from "@/components/blog/blog-card";
import { type PostMeta } from "@/lib/blog";
import { cn } from "@/lib/utils";

export function BlogFilter({ posts }: { posts: PostMeta[] }) {
  const [category, setCategory] = useState<string>("hepsi");
  const [query, setQuery] = useState("");

  const categories = useMemo(() => {
    const set = new Set(posts.map((p) => p.category));
    return Array.from(set);
  }, [posts]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("tr");
    return posts.filter((p) => {
      const categoryMatch = category === "hepsi" || p.category === category;
      const queryMatch =
        normalized.length === 0 ||
        p.title.toLocaleLowerCase("tr").includes(normalized) ||
        p.excerpt.toLocaleLowerCase("tr").includes(normalized);
      return categoryMatch && queryMatch;
    });
  }, [posts, category, query]);

  return (
    <div>
      <div className="relative max-w-sm">
        <Search
          size={16}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-fg-subtle"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Yazı ara..."
          aria-label="Yazı ara"
          className="w-full rounded-full border border-border bg-bg-elevated py-2.5 pl-10 pr-4 text-sm text-fg placeholder:text-fg-subtle focus:outline-none focus:ring-2 focus:ring-accent/40"
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setCategory("hepsi")}
          className={cn(
            "rounded-full border px-3.5 py-1.5 font-mono text-xs uppercase tracking-wide transition-all duration-200",
            category === "hepsi"
              ? "border-accent-border bg-accent-dim text-accent"
              : "border-border text-fg-muted hover:border-border-strong hover:text-fg"
          )}
        >
          Tümü
        </button>
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 font-mono text-xs uppercase tracking-wide transition-all duration-200",
              category === c
                ? "border-accent-border bg-accent-dim text-accent"
                : "border-border text-fg-muted hover:border-border-strong hover:text-fg"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((post) => (
            <motion.div
              key={post.slug}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <BlogCard post={post} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-sm text-fg-muted">
          Bu aramaya uyan bir yazı bulunamadı.
        </p>
      )}
    </div>
  );
}
