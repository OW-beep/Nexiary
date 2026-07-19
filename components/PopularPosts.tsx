import Link from "next/link";
import { getPopularPosts } from "@/lib/posts";

export default function PopularPosts() {
  const posts = getPopularPosts();
  if (posts.length === 0) return null;

  return (
    <section className="catalog-card p-6">
      <h2 className="font-display text-lg text-ink">人気記事</h2>
      <ol className="mt-4 flex flex-col gap-3">
        {posts.map((post, i) => (
          <li key={post.slug} className="flex items-baseline gap-3">
            <span className="font-mono text-sm text-stamp">{String(i + 1).padStart(2, "0")}</span>
            <Link href={`/posts/${post.slug}`} className="font-body text-sm text-ink hover:text-stamp">
              {post.frontmatter.title}
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
