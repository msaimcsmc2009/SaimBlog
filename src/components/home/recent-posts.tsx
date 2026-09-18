import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { BlogCard } from "@/components/blog/blog-card";
import { getRecentPosts } from "@/lib/blog";

export function RecentPosts() {
  const posts = getRecentPosts(3);
  if (posts.length === 0) return null;

  return (
    <section className="py-24 md:py-32">
      <Container>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>Son Yazılar</Eyebrow>
              <h2 className="mt-4 text-balance font-display text-3xl font-semibold sm:text-4xl">
                Öğrenirken tuttuğum notlar.
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-fg-muted transition-colors hover:text-accent"
            >
              Tüm yazılar
              <ArrowRight size={14} />
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.08}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
