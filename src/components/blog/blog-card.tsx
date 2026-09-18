import Link from "next/link";
import { BlogCover } from "@/components/ui/blog-cover";
import { type PostMeta } from "@/lib/blog";
import { formatDate } from "@/lib/format-date";

export function BlogCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col rounded-lg border border-border bg-bg-elevated p-3 transition-all duration-300 hover:-translate-y-1 hover:border-accent-border hover:bg-bg-elevated-2"
    >
      <BlogCover category={post.category} className="transition-transform duration-500 group-hover:scale-[1.02]" />
      <div className="flex flex-1 flex-col p-3">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-fg-subtle">
          <span>{formatDate(post.date)}</span>
          <span aria-hidden>·</span>
          <span>{post.readingTime}</span>
        </div>
        <h3 className="mt-3 text-balance font-display text-lg font-semibold leading-snug text-fg transition-colors group-hover:text-accent">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-fg-muted">{post.excerpt}</p>
      </div>
    </Link>
  );
}
