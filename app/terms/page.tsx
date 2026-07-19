import type { Metadata } from "next";
import Container from "@/components/Container";
import Breadcrumbs from "@/components/Breadcrumbs";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "利用規約",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <Container className="py-12">
      <Breadcrumbs items={[{ label: "ホーム", href: "/" }, { label: "利用規約" }]} />
      <h1 className="mt-4 font-display text-3xl text-ink">利用規約</h1>

      <div className="prose prose-neutral mt-8 max-w-2xl prose-headings:font-display prose-headings:text-ink prose-a:text-stamp">
        <p>
          この利用規約（以下、「本規約」）は、{siteConfig.name}（以下、「当サイト」）が提供するコンテンツの利用条件を定めるものです。利用者の皆様には、本規約に同意いただいた上でご利用いただきます。
        </p>

        <h2>第1条（適用範囲）</h2>
        <p>本規約は、利用者と当サイトとの間の当サイト利用に関わる一切の関係に適用されるものとします。</p>

        <h2>第2条（禁止事項）</h2>
        <ul>
          <li>法令または公序良俗に違反する行為</li>
          <li>当サイトのコンテンツを無断で複製・転載する行為</li>
          <li>当サイトの運営を妨害する行為</li>
        </ul>

        <h2>第3条（免責事項）</h2>
        <p>
          当サイトに掲載する情報の正確性には配慮していますが、内容を保証するものではありません。当サイトの利用により生じた損害について、当サイトは一切の責任を負いません。
        </p>

        <h2>第4条（著作権）</h2>
        <p>当サイトに掲載する文章・画像等の著作権は、当サイトまたは正当な権利を有する第三者に帰属します。</p>

        <h2>第5条（規約の変更）</h2>
        <p>当サイトは、必要と判断した場合には、利用者に通知することなく本規約を変更できるものとします。</p>

        <p className="font-mono text-xs text-ink-soft">制定日：{new Date().toISOString().slice(0, 10)}</p>
      </div>
    </Container>
  );
}
