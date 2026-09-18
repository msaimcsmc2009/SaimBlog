import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { ShareButtons } from "@/components/ui/share-buttons";
import { BlogCard } from "@/components/blog/blog-card";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { formatDate } from "@/lib/format-date";
import { siteConfig } from "@/lib/site-config";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug, post.category);

  return (
    <div className="pb-24 pt-32 md:pb-32 md:pt-40">
      <Container>
        <Reveal>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-fg"
          >
            <ArrowLeft size={14} />
            Tüm yazılar
          </Link>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mx-auto mt-8 max-w-2xl">
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-wide text-accent">
              <span>{post.category}</span>
            </div>
            <h1 className="mt-4 text-balance font-display text-3xl font-semibold leading-tight sm:text-4xl">
              {post.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-fg-subtle">
              <span>{formatDate(post.date)}</span>
              <span aria-hidden>·</span>
              <span>{post.readingTime}</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="prose prose-invert mx-auto mt-14 max-w-2xl prose-headings:font-display prose-headings:font-semibold prose-h2:mt-12 prose-h2:text-2xl prose-h3:mt-8 prose-h3:text-xl prose-p:leading-relaxed prose-p:text-fg-muted prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-fg prose-code:rounded prose-code:bg-bg-elevated prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm prose-code:text-accent prose-code:before:content-none prose-code:after:content-none prose-pre:border prose-pre:border-border prose-pre:bg-bg-elevated prose-li:text-fg-muted prose-blockquote:border-accent prose-blockquote:text-fg-muted">
            <MDXRemote source={post.content} />
          </div>
        </Reveal>

        {related.length > 0 && (
          <div className="mx-auto mt-24 max-w-2xl border-t border-border pt-14">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">İlgili Yazılar</p>
            </Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {related.map((relatedPost, i) => (
                <Reveal key={relatedPost.slug} delay={i * 0.08}>
                  <BlogCard post={relatedPost} />
                </Reveal>
              ))}
            </div>
          </div>
        )}

        <div className="mx-auto mt-16 max-w-2xl border-t border-border pt-10">
          <Reveal>
            <ShareButtons
              title={post.title}
              url={`${siteConfig.url}/blog/${post.slug}`}
            />
          </Reveal>
        </div>
      </Container>
    </div>
  );
}
