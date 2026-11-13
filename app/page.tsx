import Link from "next/link";
import Container from "@/components/Container";
import PostCard from "@/components/PostCard";
import PopularPosts from "@/components/PopularPosts";
import RandomCardDraw from "@/components/RandomCardDraw";
import AdSlot from "@/components/AdSlot";
import { siteConfig } from "@/lib/site-config";
import { getAllPosts } from "@/lib/posts";

export default function HomePage() {
  const allPosts = getAllPosts();
  const latest = allPosts.slice(0, 6);
  // 公開後に加筆・修正した記事。再訪した読者に「更新されている」ことが伝わるよう、最近更新した順に表示する
  const recentlyUpdated = allPosts
    .filter((p) => p.frontmatter.updated && p.frontmatter.updated > p.frontmatter.date)
    .sort((a, b) =>
      (b.frontmatter.updated as string).localeCompare(a.frontmatter.updated as string)
    )
    .slice(0, 3);
  const drawablePosts = allPosts.map((p) => ({
    slug: p.slug,
    title: p.frontmatter.title,
    categoryLabel:
      siteConfig.categories.find((c) => c.slug === p.frontmatter.category)?.label ??
      p.frontmatter.category,
  }));
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
            <div className="mt-6">
              <RandomCardDraw posts={drawablePosts} />
            </div>
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
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
              {
                slug: "nexiary-picks-2026",
                title: "Nexiaryで紹介したガジェット・生活用品まとめ",
                desc: "防災・デスク・暮らし・ゲーム別に一覧",
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

      
      {/* 悩みから探す：実際に検索で読まれている「困りごと」導線 */}
      <section className="border-b border-line">
        <Container className="py-14">
          <h2 className="font-display text-2xl text-ink">悩みから探す</h2>
          <p className="mt-2 font-body text-sm text-ink-soft">
            検索で一番読まれているのは、新製品ニュースではなく「地味な困りごと」でした。同じ悩みなら、ここから最短で解決できます。
          </p>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { slug: "gaming-controller-guide", title: "コントローラーで親指・手首が痛い", desc: "原因は重さと握り方。負担を減らす選び方と対策" },
              { slug: "gaming-mouse-sole-replacement-guide", title: "マウスの滑りが悪い・ソールが剥がれる", desc: "買い替え前に。交換のタイミングと貼り替え手順" },
              { slug: "apple-pencil-nib-replacement-guide", title: "Apple Pencilのペン先を交換したい", desc: "互換ペン先は使える？純正との描き心地の違い" },
              { slug: "fire-tv-stick-old-tv-guide", title: "古いテレビでFire TV Stickは使える？", desc: "HDRやAtmosが古いテレビでどうなるかまで解説" },
              { slug: "chatgpt-plus-guide", title: "ChatGPT Plusに課金すべきか迷う", desc: "料金・無料版との違い・Proとの違いを1表で判断" },
              { slug: "mobile-battery-flight-rules-2026", title: "モバイルバッテリーを飛行機に持ち込める？", desc: "容量ルールと大容量モデルの選び方" },
            ].map((g) => (
              <li key={g.slug} className="catalog-card p-5">
                <span className="index-tab">悩み解決</span>
                <h3 className="mt-3 font-display text-base leading-snug text-ink">
                  <Link href={`/posts/${g.slug}`} className="hover:text-stamp">{g.title}</Link>
                </h3>
                <p className="mt-2 font-body text-sm text-ink-soft">{g.desc}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 買って失敗しない比較：高単価・購入直前の読者のための収益セクション */}
      <section className="border-b border-line bg-paper-card">
        <Container className="py-14">
          <h2 className="font-display text-2xl text-ink">買って失敗しない比較</h2>
          <p className="mt-2 font-body text-sm text-ink-soft">
            高い買い物ほど、買う前の比較で差がつきます。実際に使った比較と、実測データのある記事だけを厳選しました。
          </p>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { slug: "portable-power-station-4model-comparison", title: "ポータブル電源 4モデル比較", desc: "防災・車中泊に。実際に4台使って比較" },
              { slug: "solar-panel-buying-guide", title: "ソーラーパネルの選び方", desc: "100Wと200W、実発電量の目安つき" },
              { slug: "mouse-sole-comparison-guide", title: "マウスソールおすすめ比較", desc: "厚さ・形状・素材で選ぶ消耗品の正解" },
              { slug: "apple-pencil-nib-comparison-guide", title: "Apple Pencil ペン先 純正vs互換", desc: "価格・描き心地・寿命で比較" },
            ].map((g) => (
              <li key={g.slug} className="catalog-card p-5">
                <span className="index-tab">比較</span>
                <h3 className="mt-3 font-display text-base leading-snug text-ink">
                  <Link href={`/posts/${g.slug}`} className="hover:text-stamp">{g.title}</Link>
                </h3>
                <p className="mt-2 font-body text-sm text-ink-soft">{g.desc}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 自社ツール DiffFlow への導線：メディアの読者を継続課金へ */}
      <section className="border-b border-line bg-paper-card">
        <Container className="py-14">
          <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-center">
            <div>
              <span className="index-tab">TOOL / Nexiary製</span>
              <h2 className="mt-3 font-display text-2xl leading-snug text-ink">毎月のExcel比較、まだ目視していませんか？</h2>
              <p className="mt-3 max-w-lg font-body text-sm leading-relaxed text-ink-soft">
                DiffFlowは、新旧2つのExcel・CSVを入れるだけで追加・削除・変更を自動で見つける、Nexiary自社開発のツールです。ファイルはブラウザ内だけで処理され、サーバーに送られません。無料で試せて、Proは月額980円。
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/tools/diffflow" className="rounded-card bg-ink px-5 py-2.5 font-body text-sm text-paper hover:opacity-90">無料で試す →</Link>
                <Link href="/posts/excel-diff-compare-guide" className="rounded-card border border-line bg-paper px-5 py-2.5 font-body text-sm text-ink hover:border-stamp hover:text-stamp">目視チェックをやめる方法を読む</Link>
              </div>
            </div>
            <div className="catalog-card p-6">
              <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">DiffFlow</p>
              <ul className="mt-4 space-y-2 font-body text-sm text-ink-soft">
                <li>✓ 追加・削除・変更を自動検出</li>
                <li>✓ ファイルは外部送信なし（ブラウザ内処理）</li>
                <li>✓ 無料版あり / Pro 月額980円で大規模ファイル対応</li>
              </ul>
            </div>
          </div>
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

      <Container>
        <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME ?? ""} />
      </Container>

      {recentlyUpdated.length > 0 && (
        <section className="border-t border-line bg-paper-card">
          <Container className="py-14">
            <h2 className="font-display text-2xl text-ink">最近更新した記事</h2>
            <p className="mt-2 font-body text-sm text-ink-soft">
              情報を見直して、内容を書き足した記事です。
            </p>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {recentlyUpdated.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </ul>
          </Container>
        </section>
      )}

      <section className="border-t border-line">
        <Container className="py-14">
          <PopularPosts />
        </Container>
      </section>
    </>
  );
}
