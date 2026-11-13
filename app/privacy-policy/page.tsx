import type { Metadata } from "next";
import Container from "@/components/Container";
import Breadcrumbs from "@/components/Breadcrumbs";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "Nexiaryのプライバシーポリシー。広告配信とCookieの利用、アクセス解析、アフィリエイト、個人情報の取り扱いについて説明します。",
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

        <h2>広告の配信について</h2>
        <p>
          当サイトは、第三者配信の広告サービス（Google
          AdSense）を利用しています。広告配信事業者は、利用者の興味に応じた広告を表示するためにCookieを使用することがあります。
        </p>
        <ul>
          <li>
            第三者配信事業者（Googleを含む）は、Cookieを使用して、利用者が当サイトや他のウェブサイトに過去にアクセスした際の情報に基づいて広告を配信します。
          </li>
          <li>
            Googleが広告Cookieを使用することにより、Googleやそのパートナーは、利用者が当サイトや他のサイトへアクセスした際の情報に基づいて、適切な広告を利用者に表示できます。
          </li>
          <li>
            利用者は、
            <a href="https://adssettings.google.com/authenticated" target="_blank" rel="noopener noreferrer">
              Googleの広告設定
            </a>
            でパーソナライズド広告を無効にできます。また、
            <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">
              aboutads.info
            </a>
            では、第三者配信事業者のCookieを無効にする方法を確認できます。
          </li>
        </ul>
        <p>
          Googleの広告におけるCookieの取り扱いの詳細は、
          <a href="https://policies.google.com/technologies/ads?hl=ja" target="_blank" rel="noopener noreferrer">
            Googleのポリシーと規約（広告）
          </a>
          をご確認ください。
        </p>

        <h2>アクセス解析ツールについて</h2>
        <p>
          当サイトは、Googleアナリティクス等のアクセス解析ツールを利用する場合があります。これらのツールはCookieを使用してトラフィックデータを収集しますが、このデータは匿名で収集されており、個人を特定するものではありません。この機能はCookieを無効にすることで収集を拒否できます。Googleアナリティクスにおけるデータの取り扱いは、Googleのプライバシーポリシーをご確認ください。
        </p>

        <h2>アフィリエイトプログラムについて</h2>
        <p>
          当サイトは、Amazonアソシエイト・楽天アフィリエイト・A8.net・もしもアフィリエイト・バリューコマース・afb等のアフィリエイトプログラムに参加しており、商品・サービスの紹介により収益を得ることがあります。アフィリエイトリンクを含む記事には、その旨を記事内に表示しています。リンク先のサイトで取得される情報の取り扱いについては、各サイトのプライバシーポリシーをご確認ください。
        </p>

        <h2>個人情報の取り扱いについて</h2>
        <ul>
          <li>取得する情報：お問い合わせの際の氏名・メールアドレス・お問い合わせ内容など、利用者が当サイトに提供した情報</li>
          <li>利用目的：お問い合わせへの回答、サイト運営上必要な連絡のためだけに利用し、それ以外の目的では利用しません</li>
          <li>第三者提供：法令に基づく場合を除き、本人の同意なく第三者に提供しません</li>
          <li>開示・訂正・削除：本人からの請求があった場合は、本人確認のうえ、合理的な範囲で速やかに対応します。下記のお問い合わせ先までご連絡ください</li>
          <li>安全管理：取得した個人情報は、漏えい・滅失・毀損の防止に努め、適切に管理します</li>
        </ul>

        <h2>免責事項</h2>
        <p>
          当サイトに掲載する情報については、正確性・完全性を保証するものではありません。当サイトの利用によって生じた損害について、当サイトは責任を負いません。健康・医療に関する記事は一般的な情報の提供であり、診断・治療に代わるものではありません。症状がある場合は医療機関にご相談ください。
        </p>

        <h2>プライバシーポリシーの変更について</h2>
        <p>本ポリシーの内容は、法令の変更やサービス内容の変更に伴い、予告なく変更する場合があります。変更後の内容は、当ページに掲載した時点から効力を生じます。</p>

        <h2>運営者・お問い合わせ先</h2>
        <p>
          サイト名：{siteConfig.name}／運営者：{siteConfig.name}運営者／お問い合わせは
          <a href="/contact">お問い合わせページ</a>
          （メールアドレスを掲載しています）からお願いいたします。
        </p>

        <p className="font-mono text-xs text-ink-soft">制定日：2026年5月20日／最終改定日：2026年11月13日</p>
      </div>
    </Container>
  );
}
