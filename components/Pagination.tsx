import Link from "next/link";
import { clsx } from "clsx";

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}: {
  currentPage: number;
  totalPages: number;
  basePath: string; // 例: "/posts" や "/category/ai"
}) {
  if (totalPages <= 1) return null;

  const pageHref = (page: number) => (page === 1 ? basePath : `${basePath}?page=${page}`);

  return (
    <nav aria-label="ページネーション" className="mt-10 flex items-center justify-center gap-2">
      <Link
        href={pageHref(Math.max(1, currentPage - 1))}
        aria-disabled={currentPage === 1}
        className={clsx(
          "rounded-card border border-line px-3 py-1.5 font-mono text-xs text-ink-soft",
          currentPage === 1 ? "pointer-events-none opacity-40" : "hover:border-stamp hover:text-stamp"
        )}
      >
        ← 前へ
      </Link>
      <span className="font-mono text-xs text-ink-soft">
        {currentPage} / {totalPages}
      </span>
      <Link
        href={pageHref(Math.min(totalPages, currentPage + 1))}
        aria-disabled={currentPage === totalPages}
        className={clsx(
          "rounded-card border border-line px-3 py-1.5 font-mono text-xs text-ink-soft",
          currentPage === totalPages
            ? "pointer-events-none opacity-40"
            : "hover:border-stamp hover:text-stamp"
        )}
      >
        次へ →
      </Link>
    </nav>
  );
}
