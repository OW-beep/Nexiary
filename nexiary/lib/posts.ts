import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Post, PostFrontmatter } from "./types";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function readSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

function readPost(slug: string): Post {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    frontmatter: data as PostFrontmatter,
    content,
  };
}

// 本番公開用：draft記事とタイムゾーン考慮の未来日付を除外し、新着順に並べる
export function getAllPosts(): Post[] {
  const now = Date.now();
  return readSlugs()
    .map(readPost)
    .filter((p) => !p.frontmatter.draft && new Date(p.frontmatter.date).getTime() <= now)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
    );
}

export function getPostBySlug(slug: string): Post | null {
  const slugs = readSlugs();
  if (!slugs.includes(slug)) return null;
  return readPost(slug);
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter((p) => p.frontmatter.category === category);
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((p) => p.frontmatter.tags?.includes(tag));
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  getAllPosts().forEach((p) => p.frontmatter.tags?.forEach((t) => tags.add(t)));
  return Array.from(tags);
}

// 関連記事：
// 1. 同カテゴリ×タグ一致を優先
// 2. カテゴリが違っても共通タグ（例：在宅ワーク）があれば拾う（テーマで記事群を横断させる）
// 3. それでも足りない分は同カテゴリの新着で埋める
export function getRelatedPosts(post: Post, limit = 4): Post[] {
  const candidates = getAllPosts().filter((p) => p.slug !== post.slug);
  const tagScore = (p: Post) =>
    p.frontmatter.tags?.filter((t) => post.frontmatter.tags?.includes(t)).length ?? 0;

  const sameCategory = candidates
    .filter((p) => p.frontmatter.category === post.frontmatter.category)
    .map((p) => ({ post: p, score: tagScore(p) + 10 })); // 同カテゴリを優遇

  const crossCategoryByTag = candidates
    .filter((p) => p.frontmatter.category !== post.frontmatter.category && tagScore(p) > 0)
    .map((p) => ({ post: p, score: tagScore(p) }));

  const merged = [...sameCategory, ...crossCategoryByTag].sort((a, b) => b.score - a.score);
  const result = merged.map((m) => m.post);

  if (result.length < limit) {
    const fillers = candidates
      .filter((p) => !result.includes(p))
      .filter((p) => p.frontmatter.category === post.frontmatter.category);
    result.push(...fillers);
  }
  return result.slice(0, limit);
}

// 人気記事：frontmatterのpopular（1が最上位）で手動指定。
// アクセス解析（GA4等）と連携する場合は、ここをAPI/JSON集計結果に差し替える
export function getPopularPosts(limit = 5): Post[] {
  const all = getAllPosts();
  const ranked = all.filter((p) => typeof p.frontmatter.popular === "number");
  const rest = all.filter((p) => typeof p.frontmatter.popular !== "number");
  ranked.sort((a, b) => (a.frontmatter.popular ?? 0) - (b.frontmatter.popular ?? 0));
  return [...ranked, ...rest].slice(0, limit);
}

export const POSTS_PER_PAGE = 9;

export function paginate<T>(items: T[], page: number, perPage = POSTS_PER_PAGE) {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * perPage;
  return {
    items: items.slice(start, start + perPage),
    currentPage: safePage,
    totalPages,
  };
}
