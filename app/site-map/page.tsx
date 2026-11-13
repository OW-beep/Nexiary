import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import Breadcrumbs from "@/components/Breadcrumbs";
import { siteConfig } from "@/lib/site-config";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "サイトマップ",
  description: "Nexiaryの全ページ一覧。カテゴリ別の記事と固定ページをまとめています。",
  alternates: { canonical: "/site-map" },
};

const staticPages = [
  { href: "/", label: "ホーム" },
  { href: "/posts", label: "記事一覧" },
  { href: "/category", label: "カテゴリ一覧" },
  { href: "/tools", label: "ツール一覧" },
  { href: "/tools/diffflow", label: "DiffFlow（Excel差分比較）" },
  { href: "/about", label: "About・運営者情報" },
  { href: "/log", label: "館内日誌（運営ログ）" },
  { href: "/contact", label: "お問い合わせ" },
  { href: "/privacy-policy", label: "プライバシーポリシー" },
  { href: "/terms", label: "利用規約" },
];

export default function SiteMapPage() {
  const posts = getAllPosts();
  return (
    <Container className="py-12">
      <Breadcrumbs items={[{ label: "ホーム", href: "/" }, { label: "サイトマップ" }]} />
      <h1 className="mt-4 font-display text-3xl text-ink">サイトマップ</h1>
      <p className="mt-3 font-body text-sm text-ink-soft">全{posts.length}記事と固定ページの一覧です。</p>

      <h2 className="mt-10 font-display text-xl text-ink">固定ページ</h2>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {staticPages.map((s) => (
          <li key={s.href}>
            <Link href={s.href} className="font-body text-sm text-ink-soft hover:text-stamp hover:underline">{s.label}</Link>
          </li>
        ))}
      </ul>

      {siteConfig.categories.map((cat) => {
        const inCat = posts.filter((p) => p.frontmatter.category === cat.slug);
        if (inCat.length === 0) return null;
        return (
          <section key={cat.slug}>
            <h2 className="mt-10 font-display text-xl text-ink">
              <Link href={`/category/${cat.slug}`} className="hover:text-stamp">{cat.label}</Link>
              <span className="ml-2 font-mono text-xs text-ink-soft">{inCat.length}記事</span>
            </h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {inCat.map((p) => (
                <li key={p.slug}>
                  <Link href={`/posts/${p.slug}`} className="font-body text-sm leading-relaxed text-ink-soft hover:text-stamp hover:underline">
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
