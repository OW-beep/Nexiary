import { siteConfig } from "@/lib/site-config";
import { getAllPosts } from "@/lib/posts";

export const dynamic = "force-static";

function escapeXml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = getAllPosts().slice(0, 30);

  const items = posts
    .map(
      (post) => `
    <item>
      <title>${escapeXml(post.frontmatter.title)}</title>
      <link>${siteConfig.url}/posts/${post.slug}</link>
      <guid>${siteConfig.url}/posts/${post.slug}</guid>
      <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.frontmatter.description)}</description>
    </item>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <link>${siteConfig.url}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>ja</language>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
