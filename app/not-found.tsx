import Link from "next/link";
import Container from "@/components/Container";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center justify-center py-24 text-center">
      <span className="index-tab">Entry Not Found</span>
      <h1 className="mt-5 font-display text-4xl text-ink">404</h1>
      <p className="mt-3 max-w-sm font-body text-sm text-ink-soft">
        お探しの記事・ページは見つかりませんでした。削除されたか、URLが変更された可能性があります。
      </p>
      <Link
        href="/"
        className="mt-8 rounded-card border border-line px-5 py-2.5 font-body text-sm text-ink transition-colors hover:border-stamp hover:text-stamp"
      >
        トップページに戻る
      </Link>
    </Container>
  );
}
