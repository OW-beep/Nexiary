import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import type { Post } from "@/lib/types";

export default function PostCard({ post }: { post: Post }) {
  const categoryLabel =
    siteConfig.categories.find((c) => c.slug === post.frontmatter.category)?.label ??
    post.frontmatter.category;

  return (
    <li className="catalog-card p-5">
      <span className="index-tab">{categoryLabel}</span>
      <h3 className="mt-3 font-display text-lg leading-snug text-ink">
        <Link href={`/posts/${post.slug}`} className="hover:text-stamp">
          {post.frontmatter.title}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-2 font-body text-sm text-ink-soft">
        {post.frontmatter.description}
      </p>
      <div className="mt-4 flex items-center justify-between">
        <p className="font-mono text-xs text-ink-soft/70">{post.frontmatter.date}</p>
        {post.frontmatter.tags?.[0] && (
          <Link
            href={`/tag/${encodeURIComponent(post.frontmatter.tags[0])}`}
            className="font-mono text-xs text-moss hover:underline"
          >
            #{post.frontmatter.tags[0]}
          </Link>
        )}
      </div>
    </li>
  );
}
