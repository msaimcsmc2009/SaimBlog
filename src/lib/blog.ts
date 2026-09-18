import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export type PostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readingTime: string;
};

export type Post = PostMeta & {
  content: string;
};

function readPostFile(filename: string): Post {
  const slug = filename.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title,
    excerpt: data.excerpt,
    date: data.date,
    category: data.category,
    readingTime: `${Math.max(1, Math.ceil(readingTime(content).minutes))} dk okuma`,
    content,
  };
}

export function getAllPosts(): PostMeta[] {
  const filenames = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
  return filenames
    .map((filename): PostMeta => {
      const post = readPostFile(filename);
      return {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        date: post.date,
        category: post.category,
        readingTime: post.readingTime,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | undefined {
  const filename = `${slug}.mdx`;
  if (!fs.existsSync(path.join(BLOG_DIR, filename))) return undefined;
  return readPostFile(filename);
}

export function getRecentPosts(count = 3): PostMeta[] {
  return getAllPosts().slice(0, count);
}

export function getCategories(): string[] {
  const categories = new Set(getAllPosts().map((post) => post.category));
  return Array.from(categories);
}

export function getRelatedPosts(slug: string, category: string, count = 2): PostMeta[] {
  return getAllPosts()
    .filter((post) => post.slug !== slug && post.category === category)
    .slice(0, count);
}
