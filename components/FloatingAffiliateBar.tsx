"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, ExternalLink } from "lucide-react";

interface FloatingAffiliateBarProps {
  name: string;
  description?: string;
  href: string;
  cta?: string;
}

// 記事を一定量スクロールしたタイミングで、画面下からスライドインするアフィリエイトバー。
// 閉じるとそのページ滞在中は再表示しない。
export default function FloatingAffiliateBar({
  name,
  description,
  href,
  cta = "詳細を見る",
}: FloatingAffiliateBarProps) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 500) setVisible(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-4 transition-transform duration-500 ease-out ${
        visible && !dismissed ? "translate-y-0" : "translate-y-[150%]"
      }`}
      aria-hidden={!visible || dismissed}
    >
      <div className="catalog-card flex w-full max-w-lg items-center gap-3 border-ink/10 bg-paper-card p-3 shadow-lg sm:gap-4 sm:p-4">
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-sm text-ink sm:text-base">{name}</p>
          {description && (
            <p className="truncate font-body text-xs text-ink-soft sm:text-sm">{description}</p>
          )}
        </div>
        <Link
          href={href}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className="flex shrink-0 items-center gap-1.5 rounded-card bg-ink px-4 py-2 font-body text-xs text-paper transition-opacity hover:opacity-90 sm:text-sm"
        >
          {cta}
          <ExternalLink size={13} strokeWidth={1.75} />
        </Link>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="閉じる"
          className="shrink-0 rounded-card p-1 text-ink-soft hover:text-ink"
        >
          <X size={16} strokeWidth={1.75} />
        </button>
      </div>
    </div>
  );
}
