import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "ツール",
  description: "Nexiaryが公開しているWebツール一覧。",
  alternates: { canonical: "/tools" },
};

const tools = [
  {
    slug: "diffflow",
    name: "DiffFlow",
    description: "2つのExcel/CSVを比較し、追加・削除・変更を自動検出。ブラウザ内処理でファイルは送信されません。",
  },
];

export default function ToolsIndexPage() {
  return (
    <Container className="py-12">
      <Breadcrumbs items={[{ label: "ホーム", href: "/" }, { label: "ツール" }]} />
      <h1 className="mt-4 font-display text-3xl text-ink">ツール</h1>
      <p className="mt-2 font-body text-sm text-ink-soft">
        Nexiaryが公開している、ブラウザだけで完結するWebツールです。
      </p>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {tools.map((tool) => (
          <li key={tool.slug} className="catalog-card p-5">
            <span className="index-tab">TOOL</span>
            <h2 className="mt-3 font-display text-lg text-ink">
              <Link href={`/tools/${tool.slug}`} className="hover:text-stamp">
                {tool.name}
              </Link>
            </h2>
            <p className="mt-2 font-body text-sm text-ink-soft">{tool.description}</p>
          </li>
        ))}
      </ul>
    </Container>
  );
}
