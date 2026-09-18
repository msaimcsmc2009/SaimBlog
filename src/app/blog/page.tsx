import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { BlogFilter } from "@/components/blog/blog-filter";
import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Blog",
  description: `${siteConfig.name}'in yazılım öğrenimi ve proje günlükleri üzerine yazıları.`,
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="pb-24 pt-32 md:pb-32 md:pt-40">
      <Container>
        <Reveal>
          <Eyebrow>Blog</Eyebrow>
          <h1 className="mt-5 max-w-2xl text-balance font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Öğrendiklerimi yazarak pekiştiriyorum.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-fg-muted">
            Proje günlükleri, öğrenim notları ve zaman zaman girişimcilik üzerine
            düşüncelerim — hepsi burada.
          </p>
        </Reveal>

        <div className="mt-14">
          <BlogFilter posts={posts} />
        </div>
      </Container>
    </div>
  );
}
