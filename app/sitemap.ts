import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getAllPosts, getAllTags } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/posts",
    "/category",
    "/search",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
  ].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
  }));

  const categoryPages = siteConfig.categories.map((c) => ({
    url: `${siteConfig.url}/category/${c.slug}`,
    lastModified: new Date(),
  }));

  const tagPages = getAllTags().map((tag) => ({
    url: `${siteConfig.url}/tag/${encodeURIComponent(tag)}`,
    lastModified: new Date(),
  }));

  const postPages = getAllPosts().map((post) => ({
    url: `${siteConfig.url}/posts/${post.slug}`,
    lastModified: new Date(post.frontmatter.date),
  }));

  return [...staticPages, ...categoryPages, ...tagPages, ...postPages];
}
