import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import Breadcrumbs from "@/components/Breadcrumbs";
import PostCard from "@/components/PostCard";
import { getAllTags, getPostsByTag } from "@/lib/posts";

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: encodeURIComponent(tag) }));
}

export function generateMetadata({ params }: { params: { tag: string } }): Metadata {
  const tag = decodeURIComponent(params.tag);
  const count = getPostsByTag(tag).length;
  return {
    title: `「${tag}」の記事一覧`,
    description: `「${tag}」に関するNexiaryの記事一覧です。実際に使ってみたレビューや選び方のガイドをまとめています。`,
    alternates: { canonical: `/tag/${params.tag}` },
    // 記事数が少ないタグページは「薄いアーカイブページ」と判定されやすいため、3記事未満はnoindexにする
    ...(count < 3 ? { robots: { index: false, follow: true } } : {}),
  };
}

export default function TagPage({ params }: { params: { tag: string } }) {
  const tag = decodeURIComponent(params.tag);
  const posts = getPostsByTag(tag);
  if (posts.length === 0) notFound();

  return (
    <Container className="py-12">
      <Breadcrumbs items={[{ label: "ホーム", href: "/" }, { label: `#${tag}` }]} />
      <h1 className="mt-4 font-display text-3xl text-ink">#{tag}</h1>

      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </ul>
    </Container>
  );
}
