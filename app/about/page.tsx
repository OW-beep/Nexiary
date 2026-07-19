import type { Metadata } from "next";
import Container from "@/components/Container";
import Breadcrumbs from "@/components/Breadcrumbs";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <Container className="py-12">
      <Breadcrumbs items={[{ label: "ホーム", href: "/" }, { label: "About" }]} />
      <h1 className="mt-4 font-display text-3xl text-ink">About</h1>

      <div className="prose prose-neutral mt-8 max-w-2xl prose-headings:font-display prose-headings:text-ink prose-a:text-stamp">
        <p>{siteConfig.description}</p>
        <p>
          {siteConfig.name} は「{siteConfig.tagline}」をコンセプトに、AI・ゲーム・ガジェット・Webサービスの中から、日々の暮らしや仕事に役立つ情報を選んで紹介しています。
        </p>
        <h2>運営方針</h2>
        <ul>
          <li>実際に使った・調べた情報をもとに、わかりやすく紹介します</li>
          <li>記事内の一部リンクにはアフィリエイトプログラムを利用しています</li>
          <li>掲載内容は執筆時点の情報です。最新情報は公式サイトをご確認ください</li>
        </ul>
      </div>
    </Container>
  );
}
