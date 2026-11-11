import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Post, PostFrontmatter } from "./types";

// 英語版（海外向け）記事は content/posts-en に置く。日本語記事の一覧・検索・サイトマップとは分けて扱う。
const POSTS_DIR = path.join(process.cwd(), "content", "posts-en");

function readSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

function readPost(slug: string): Post {
  const raw = fs.readFileSync(path.join(POSTS_DIR, `${slug}.mdx`), "utf-8");
  const { data, content } = matter(raw);
  return { slug, frontmatter: data as PostFrontmatter, content };
}

export function getAllEnglishPosts(): Post[] {
  const now = Date.now();
  return readSlugs()
    .map(readPost)
    .filter(
      (p) =>
        !p.frontmatter.draft &&
        new Date(`${p.frontmatter.date}T00:00:00+09:00`).getTime() <= now
    )
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
    );
}

export function getEnglishPostBySlug(slug: string): Post | null {
  if (!readSlugs().includes(slug)) return null;
  return readPost(slug);
}

// 日本語記事に対応する英語版（あれば）
export function getEnglishPostByJaSlug(jaSlug: string): Post | null {
  return getAllEnglishPosts().find((p) => p.frontmatter.jaSlug === jaSlug) ?? null;
}
