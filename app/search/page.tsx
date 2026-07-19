import type { Metadata } from "next";
import Container from "@/components/Container";
import Breadcrumbs from "@/components/Breadcrumbs";
import SearchClient from "@/components/SearchClient";
import { siteConfig } from "@/lib/site-config";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "サイト内検索",
  alternates: { canonical: "/search" },
};

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const items = getAllPosts().map((p) => ({
    slug: p.slug,
    title: p.frontmatter.title,
    description: p.frontmatter.description,
    category: p.frontmatter.category,
    categoryLabel:
      siteConfig.categories.find((c) => c.slug === p.frontmatter.category)?.label ??
      p.frontmatter.category,
    date: p.frontmatter.date,
    tags: p.frontmatter.tags ?? [],
  }));

  return (
    <Container className="py-12">
      <Breadcrumbs items={[{ label: "ホーム", href: "/" }, { label: "検索" }]} />
      <h1 className="mt-4 font-display text-3xl text-ink">サイト内検索</h1>
      <div className="mt-8 max-w-xl">
        <SearchClient items={items} initialQuery={searchParams.q ?? ""} />
      </div>
    </Container>
  );
}
