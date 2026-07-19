import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import Breadcrumbs from "@/components/Breadcrumbs";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";
import { siteConfig } from "@/lib/site-config";
import { getPostsByCategory, paginate } from "@/lib/posts";

export function generateStaticParams() {
  return siteConfig.categories.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const category = siteConfig.categories.find((c) => c.slug === params.slug);
  if (!category) return {};
  return {
    title: `${category.label}の記事一覧`,
    alternates: { canonical: `/category/${category.slug}` },
  };
}

export default function CategoryPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { page?: string };
}) {
  const category = siteConfig.categories.find((c) => c.slug === params.slug);
  if (!category) notFound();

  const page = Number(searchParams.page ?? "1") || 1;
  const { items, currentPage, totalPages } = paginate(getPostsByCategory(category.slug), page);

  return (
    <Container className="py-12">
      <Breadcrumbs
        items={[
          { label: "ホーム", href: "/" },
          { label: "カテゴリ一覧", href: "/category" },
          { label: category.label },
        ]}
      />
      <h1 className="mt-4 font-display text-3xl text-ink">{category.label}</h1>

      {items.length === 0 ? (
        <p className="mt-8 font-body text-sm text-ink-soft">
          このカテゴリの記事はまだありません。
        </p>
      ) : (
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </ul>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath={`/category/${category.slug}`}
      />
    </Container>
  );
}
