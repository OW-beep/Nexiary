import type { Metadata } from "next";
import Container from "@/components/Container";
import Breadcrumbs from "@/components/Breadcrumbs";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";
import { getAllPosts, paginate } from "@/lib/posts";

export const metadata: Metadata = {
  title: "記事一覧",
  description: "Nexiaryのすべての記事を新着順に掲載しています。",
  alternates: { canonical: "/posts" },
};

export default function PostsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Number(searchParams.page ?? "1") || 1;
  const { items, currentPage, totalPages } = paginate(getAllPosts(), page);

  return (
    <Container className="py-12">
      <Breadcrumbs items={[{ label: "ホーム", href: "/" }, { label: "記事一覧" }]} />
      <h1 className="mt-4 font-display text-3xl text-ink">記事一覧</h1>

      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </ul>

      <Pagination currentPage={currentPage} totalPages={totalPages} basePath="/posts" />
    </Container>
  );
}
