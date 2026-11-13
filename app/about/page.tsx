import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import Breadcrumbs from "@/components/Breadcrumbs";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Nexiaryについて・編集方針",
  description:
    "Nexiaryの運営方針と編集方針です。記事の種類（レビューとガイド）の違い、情報の集め方と出典、更新と訂正、広告・アフィリエイトの表記について説明します。",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <Container className="py-12">
      <Breadcrumbs items={[{ label: "ホーム", href: "/" }, { label: "About" }]} />
      <h1 className="mt-4 font-display text-3xl text-ink">Nexiaryについて・編集方針</h1>

      <div className="prose prose-neutral mt-8 max-w-2xl prose-headings:font-display prose-headings:text-ink prose-a:text-stamp">
        <p>{siteConfig.description}</p>
        <p>
          {siteConfig.name} は「{siteConfig.tagline}」をコンセプトに、AI・ゲーム・ガジェット・Webサービスの中から、日々の暮らしや仕事に役立つ情報を選んで紹介しています。
        </p>


        <h2>運営者情報</h2>
        <ul>
          <li><strong>サイト名</strong>：Nexiary（ネクシアリー）。名前は Next + Diary + Library の造語です</li>
          <li><strong>運営者</strong>：Nexiary運営者（個人運営）。2026年5月に開設しました</li>
          <li><strong>発信テーマ</strong>：AI・ゲーム・ガジェット・Webサービスについて、「買う前に迷う」「使い方が分からない」「地味に困る」を、実際に試した結果と手順で解決すること</li>
          <li><strong>運営方針</strong>：紹介する商品・サービスは、実際に使った体験か、公式情報などの一次情報を確認した内容だけを記事にします。提携の有無で評価を変えることはしません</li>
          <li><strong>連絡先</strong>：<Link href="/contact">お問い合わせページ</Link>にメールアドレスを掲載しています。記事の誤りのご指摘・取材・広告掲載のご相談はこちらへお願いします</li>
        </ul>

        <h2>運営者について</h2>
        <p>
          Nexiaryは個人運営のメディアです。運営者は、AI・ゲーム・ガジェット・Webサービスを実際に使いながら、「買う前に迷う」「使い方が分からない」「地味に困る」という場面を、比較と手順で3分で解決できる記事にしています。記事の題材は、実際に検索で読まれている悩みと、自分が使って確かめたことから選んでいます。
        </p>
        {/* 運営者情報の充実（AdSense審査の信頼シグナル）：
            下の段落に、運営者のハンドルネーム・実績・発信の理由を具体的に書き足すと
            さらに強くなります（本名は不要）。例：Nexiaryで111記事を執筆、Excel差分
            比較ツールDiffFlowを開発・運営、など。書き足すまでは現状の段落でも公開可能です。 */}
        <h2>記事の種類</h2>
        <ul>
          <li>
            <strong>レビュー記事</strong>：実際に使ってみた感想を書いた記事です。使って分かった良い点だけでなく、気になった点も書くようにしています
          </li>
          <li>
            <strong>ガイド・選び方の記事</strong>：メーカーの公式情報や、報道・公的機関の発表などの公開情報をもとに整理した記事です。実際に試したレビューではない場合は、記事の冒頭にその旨を明記します
          </li>
          <li>
            <strong>最新ニュースの記事</strong>：新製品や制度の変更などを、発表時点の情報としてまとめた記事です。発売日や価格は変更されることがあります
          </li>
        </ul>

        <h2>情報の集め方と出典</h2>
        <ul>
          <li>メーカーの公式サイト、公的機関・航空会社などの発表、信頼できる報道を優先して確認します</li>
          <li>ガイド・ニュースの記事では、参考にした情報を記事の末尾に書いています</li>
          <li>情報源によって内容が食い違う場合は、断定せず、「報道によって異なる」ことを書いたうえで、公式情報の確認をお願いしています</li>
          <li>価格・在庫・キャンペーンは頻繁に変わります。最新の情報は、商品ページや公式サイトでご確認ください</li>
        </ul>

        <h2>更新と訂正</h2>
        <ul>
          <li>情報を見直して内容を変えた記事には、「更新」の日付を表示しています</li>
          <li>誤りや古くなった情報に気づいた場合は、確認のうえ、速やかに修正します</li>
          <li>
            記事の内容に誤りなどがありましたら、<Link href="/contact">お問い合わせ</Link>からご連絡ください
          </li>
        </ul>

        <h2>広告・アフィリエイトについて</h2>
        <ul>
          <li>
            記事内の一部のリンクには、アフィリエイトプログラムを利用しています。商品の購入やサービスの申し込みがあった場合、当サイトに報酬が支払われることがあります
          </li>
          <li>アフィリエイトリンクを含む記事には、その旨を記事の冒頭に表示しています</li>
          <li>報酬の有無にかかわらず、デメリットや気になる点も書くように努めています</li>
          <li>Amazonのアソシエイトとして、{siteConfig.name}は適格販売により収入を得ています</li>
        </ul>

        <h2>健康・医療・法律などに関する記事について</h2>
        <p>
          体の不調や健康に関する内容は、一般的な情報の紹介であり、診断や治療を目的としたものではありません。症状が気になる場合は、医療機関にご相談ください。
        </p>

        <h2>更新情報の受け取り方</h2>
        <p>
          新しい記事や更新は、<a href="/rss.xml">RSSフィード</a>でも受け取れます。
        </p>
      </div>
    </Container>
  );
}
