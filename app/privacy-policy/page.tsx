import type { Metadata } from "next";
import Container from "@/components/Container";
import Breadcrumbs from "@/components/Breadcrumbs";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <Container className="py-12">
      <Breadcrumbs items={[{ label: "ホーム", href: "/" }, { label: "プライバシーポリシー" }]} />
      <h1 className="mt-4 font-display text-3xl text-ink">プライバシーポリシー</h1>

      <div className="prose prose-neutral mt-8 max-w-2xl prose-headings:font-display prose-headings:text-ink prose-a:text-stamp">
        <p>
          {siteConfig.name}（以下、「当サイト」）は、利用者のプライバシーを尊重し、以下の方針に基づき個人情報を取り扱います。
        </p>

        <h2>広告について</h2>
        <p>
          当サイトは第三者配信の広告サービス（Googleアドセンス等）を利用しています。このような広告配信事業者は、利用者の興味に応じた商品やサービスの広告を表示するため、Cookie（クッキー）を使用することがあります。
          Cookieを無効にする設定およびGoogleアドセンスに関する詳細は
          <a href="https://policies.google.com/technologies/ads?hl=ja" target="_blank" rel="noopener noreferrer">
            Googleの広告ポリシー
          </a>
          をご確認ください。
        </p>

        <h2>アフィリエイトプログラムについて</h2>
        <p>
          当サイトは、Amazonアソシエイト・楽天アフィリエイト・A8.net・もしもアフィリエイト・バリューコマース・afb等のアフィリエイトプログラムに参加しており、これにより商品・サービスを紹介し、収益を得ることがあります。
        </p>

        <h2>アクセス解析ツールについて</h2>
        <p>
          当サイトは、Googleアナリティクス等のアクセス解析ツールを利用する場合があります。これらのツールはCookieを使用してトラフィックデータを収集しますが、このデータは匿名で収集されており、個人を特定するものではありません。
        </p>

        <h2>免責事項</h2>
        <p>
          当サイトに掲載する情報については、正確性・完全性を保証するものではありません。当サイトの利用によって生じた損害について、当サイトは一切の責任を負いません。
        </p>

        <h2>プライバシーポリシーの変更について</h2>
        <p>本ポリシーの内容は、法令の変更やサービス内容の変更に伴い、予告なく変更する場合があります。</p>

        <p className="font-mono text-xs text-ink-soft">制定日：{new Date().toISOString().slice(0, 10)}</p>
      </div>
    </Container>
  );
}
