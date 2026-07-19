import Link from "next/link";
import { Search } from "lucide-react";
import Container from "./Container";
import { siteConfig } from "@/lib/site-config";

const primaryNav = siteConfig.categories.slice(0, 4); // ヘッダーには主要4カテゴリのみ表示

export default function Header() {
  return (
    <header className="border-b border-line bg-paper-card">
      {/* 目録カードの見出し行を模した最上部の細いバー */}
      <div className="border-b border-line/70 bg-ink py-1 text-center font-mono text-[11px] tracking-widest text-paper">
        DAILY DISCOVERY LOG — 毎日更新
      </div>
      <Container className="flex items-center justify-between py-4">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-display text-2xl font-semibold text-ink">
            Nexiary
          </span>
          <span className="hidden font-mono text-xs text-ink-soft sm:inline">
            /nek-si-ary/
          </span>
        </Link>

        <nav className="hidden items-center gap-5 md:flex">
          {primaryNav.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="font-body text-sm text-ink-soft transition-colors hover:text-stamp"
            >
              {c.label}
            </Link>
          ))}
          <Link
            href="/category"
            className="font-body text-sm text-ink-soft transition-colors hover:text-stamp"
          >
            すべて
          </Link>
        </nav>

        <Link
          href="/search"
          aria-label="サイト内検索"
          className="flex h-9 w-9 items-center justify-center rounded-card border border-line text-ink-soft transition-colors hover:border-stamp hover:text-stamp"
        >
          <Search size={16} strokeWidth={1.75} />
        </Link>
      </Container>
    </header>
  );
}
