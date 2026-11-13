import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import Breadcrumbs from "@/components/Breadcrumbs";
import { siteConfig } from "@/lib/site-config";
import { getAllPosts, getPostsByCategory } from "@/lib/posts";

export const metadata: Metadata = {
  title: "サイトマップ",
  description:
    "Nexiaryの記事をカテゴリ別に一覧にしたサイトマップです。お探しの記事をここからたどれます。",
  alternates: { canonical: "/sitemap" },
};

export default function SitemapPage() {
  const allPosts = getAllPosts();
  return (
    <Container className="py-12">
      <Breadcrumbs items={[{ label: "ホーム", href: "/" }, { label: "サイトマップ" }]} />
      <h1 className="mt-4 font-display text-3xl text-ink">サイトマップ</h1>
      <p className="mt-4 max-w-xl font-body text-sm text-ink-soft">
        Nexiaryの記事一覧です（全{allPosts.length}件）。カテゴリから探すか、記事タイトルから直接開けます。
      </p>

      <h2 className="mt-10 font-display text-xl text-ink">固定ページ</h2>
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-body text-sm">
        <li>
          <Link href="/about" className="text-stamp hover:underline">
            Nexiaryについて・編集方針
          </Link>
        </li>
        <li>
          <Link href="/contact" className="text-stamp hover:underline">
            お問い合わせ
          </Link>
        </li>
        <li>
          <Link href="/privacy-policy" className="text-stamp hover:underline">
            プライバシーポリシー
          </Link>
        </li>
        <li>
          <Link href="/terms" className="text-stamp hover:underline">
            利用規約
          </Link>
        </li>
        <li>
          <Link href="/tools/diffflow" className="text-stamp hover:underline">
            DiffFlow（Excel差分比較ツール）
          </Link>
        </li>
        <li>
          <Link href="/log" className="text-stamp hover:underline">
            館内日誌
          </Link>
        </li>
      </ul>

      {siteConfig.categories.map((c) => {
        const posts = getPostsByCategory(c.slug);
        if (posts.length === 0) return null;
        return (
          <section key={c.slug} className="mt-10">
            <h2 className="font-display text-xl text-ink">
              <Link href={`/category/${c.slug}`} className="hover:text-stamp">
                {c.label}（{posts.length}件）
              </Link>
            </h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {posts.map((p) => (
                <li key={p.slug} className="font-body text-sm">
                  <Link href={`/posts/${p.slug}`} className="text-ink-soft hover:text-stamp">
                    {p.frontmatter.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </Container>
  );
}
