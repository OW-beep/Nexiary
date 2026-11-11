import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getAllPosts, getAllTags } from "@/lib/posts";
import { getAllEnglishPosts } from "@/lib/posts-en";

// lastModified は「実際に内容が変わった日」だけを返す。
// ビルドのたびに new Date() を入れると、全URLが毎回「更新された」ことになり、
// 検索エンジンが更新日を信用しなくなってクロールの優先度が下がるため。
function toDate(d: string) {
  return new Date(`${d}T00:00:00+09:00`);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const modifiedOf = (p: (typeof posts)[number]) => p.frontmatter.updated ?? p.frontmatter.date;
  const latest = posts.reduce(
    (max, p) => (modifiedOf(p) > max ? modifiedOf(p) : max),
    posts[0] ? modifiedOf(posts[0]) : "2026-07-01"
  );

  const staticPages = ["", "/posts", "/category", "/search", "/about", "/contact", "/privacy-policy", "/terms"].map(
    (path) => ({
      url: `${siteConfig.url}${path}`,
      lastModified: toDate(latest),
    })
  );

  const categoryPages = siteConfig.categories
    .filter((c) => posts.some((p) => p.frontmatter.category === c.slug))
    .map((c) => ({
      url: `${siteConfig.url}/category/${c.slug}`,
      lastModified: toDate(
        posts.filter((p) => p.frontmatter.category === c.slug).map(modifiedOf).sort().reverse()[0]
      ),
    }));

  const tagPages = getAllTags().map((tag) => ({
    url: `${siteConfig.url}/tag/${encodeURIComponent(tag)}`,
    lastModified: toDate(
      posts
        .filter((p) => p.frontmatter.tags?.includes(tag))
        .map(modifiedOf)
        .sort()
        .reverse()[0]
    ),
  }));

  const postPages = posts.map((post) => ({
    url: `${siteConfig.url}/posts/${post.slug}`,
    lastModified: toDate(modifiedOf(post)),
  }));

  const englishPages = [
    { url: `${siteConfig.url}/en`, lastModified: toDate(latest) },
    ...getAllEnglishPosts().map((p) => ({
      url: `${siteConfig.url}/en/posts/${p.slug}`,
      lastModified: toDate(p.frontmatter.updated ?? p.frontmatter.date),
    })),
  ];

  return [...staticPages, ...categoryPages, ...tagPages, ...postPages, ...englishPages];
}
