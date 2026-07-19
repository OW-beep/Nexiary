import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import Breadcrumbs from "@/components/Breadcrumbs";
import { siteConfig } from "@/lib/site-config";
import { getPostsByCategory } from "@/lib/posts";

export const metadata: Metadata = {
  title: "カテゴリ一覧",
  alternates: { canonical: "/category" },
};

export default function CategoryIndexPage() {
  return (
    <Container className="py-12">
      <Breadcrumbs items={[{ label: "ホーム", href: "/" }, { label: "カテゴリ一覧" }]} />
      <h1 className="mt-4 font-display text-3xl text-ink">カテゴリ一覧</h1>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {siteConfig.categories.map((c) => (
          <li key={c.slug} className="catalog-card p-5">
            <Link href={`/category/${c.slug}`} className="flex items-baseline justify-between">
              <span className="font-display text-lg text-ink hover:text-stamp">{c.label}</span>
              <span className="font-mono text-xs text-ink-soft">
                {getPostsByCategory(c.slug).length}件
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
