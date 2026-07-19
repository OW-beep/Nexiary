import Link from "next/link";
import Container from "@/components/Container";
import PostCard from "@/components/PostCard";
import PopularPosts from "@/components/PopularPosts";
import { siteConfig } from "@/lib/site-config";
import { getAllPosts } from "@/lib/posts";

export default function HomePage() {
  const latest = getAllPosts().slice(0, 6);
  const today = new Date().toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <>
      {/* Hero：図書館の受付印を押した「本日の目録カード」がシグネチャー要素 */}
      <section className="border-b border-line bg-paper-card">
        <Container className="grid gap-10 py-16 sm:py-20 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <span className="index-tab">No. {today.replaceAll("/", "-")}</span>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
              毎日、新しい発見に
              <br />
              出会う。
            </h1>
            <p className="mt-5 max-w-md font-body text-base leading-relaxed text-ink-soft">
              {siteConfig.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {siteConfig.categories.slice(0, 4).map((c) => (
                <Link
                  key={c.slug}
                  href={`/category/${c.slug}`}
                  className="rounded-card border border-line bg-paper px-4 py-2 font-body text-sm text-ink transition-colors hover:border-stamp hover:text-stamp"
                >
                  {c.label}
                </Link>
              ))}
            </div>
            <Link
              href="#featured-guides"
              className="mt-6 flex w-fit items-center gap-2 rounded-card border border-stamp/40 bg-stamp/5 px-4 py-2.5 font-body text-sm text-stamp transition-colors hover:bg-stamp/10"
            >
              <span className="index-tab">特集</span>
              テーマ別まとめガイドを見る ↓
            </Link>
          </div>

          {/* 受付印カード：訪問者が最初に目にする"目録カード"のビジュアル */}
          <div className="catalog-card mx-auto w-full max-w-xs -rotate-1 bg-card-lines p-6 shadow-sm">
            <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">
              Catalog Card
            </p>
            <p className="mt-8 font-display text-lg text-ink">
              {latest[0]?.frontmatter.title ?? "最初の発見を記録中…"}
            </p>
            <p className="mt-6 font-mono text-xs text-stamp">
              ENTRY&nbsp;#{String(latest.length).padStart(3, "0")}
            </p>
          </div>
        </Container>
      </section>

      {/* テーマ別まとめガイド（特集） */}
      <section id="featured-guides" className="border-b border-line bg-paper-card">
        <Container className="py-14">
          <h2 className="font-display text-2xl text-ink">テーマ別まとめガイド</h2>
          <p className="mt-2 font-body text-sm text-ink-soft">
            気になるテーマから、関連記事をまとめて読めます。
          </p>
          <ul className="mt-6 grid gap-5 sm:grid-cols-3">
            {[
              {
                slug: "wfh-toolkit-complete-guide",
                title: "在宅ワーク・副業ブログの環境づくり完全ガイド",
                desc: "体・作業効率・発信の土台を整える12選",
              },
              {
                slug: "gaming-environment-complete-guide",
                title: "快適なゲーミング環境の作り方完全ガイド",
                desc: "見た目・操作・音・守りを整える5選",
              },
              {
                slug: "daily-life-small-troubles-guide",
                title: "暮らしの小さな悩みを解決するアイテムまとめ",
                desc: "紛失・データ消失・収納不足の解決策",
              },
            ].map((g) => (
              <li key={g.slug} className="catalog-card p-5">
                <span className="index-tab">特集</span>
                <h3 className="mt-3 font-display text-base leading-snug text-ink">
                  <Link href={`/posts/${g.slug}`} className="hover:text-stamp">
                    {g.title}
                  </Link>
                </h3>
                <p className="mt-2 font-body text-sm text-ink-soft">{g.desc}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 最新の発見一覧 */}
      <section>
        <Container className="py-14">
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="font-display text-2xl text-ink">最新の発見</h2>
            <Link
              href="/posts"
              className="font-body text-sm text-moss hover:underline"
            >
              すべて見る →
            </Link>
          </div>

          {latest.length === 0 ? (
            <p className="font-body text-sm text-ink-soft">
              まだ記事がありません。content/posts に .mdx を追加すると、ここに一覧表示されます。
            </p>
          ) : (
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {latest.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </ul>
          )}
        </Container>
      </section>

      <section className="border-t border-line">
        <Container className="py-14">
          <PopularPosts />
        </Container>
      </section>
    </>
  );
}
