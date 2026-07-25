"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const DISMISS_KEY = "nx_rakuten_dismissed_until";
const DISMISS_DAYS = 7;

// サイト全体（記事ページ以外も含む）で左下に小さく浮かぶ楽天への入口。
// 個別記事のFloatingAffiliateBar（下部中央・全幅）とは位置・サイズを分けて重ならないようにしている。
// 閉じると7日間は再表示しない（毎回消すストレスを避けつつ、時間が経てば思い出してもらう）。
export default function RakutenCorner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!siteConfig.rakuten.enabled || !siteConfig.rakuten.href) return;
    try {
      const until = Number(localStorage.getItem(DISMISS_KEY) ?? 0);
      if (Date.now() < until) return;
    } catch {
      // localStorage不可の環境（プライベートモード等）ではとりあえず表示する
    }
    const timer = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (!siteConfig.rakuten.enabled || !siteConfig.rakuten.href) return null;

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(
        DISMISS_KEY,
        String(Date.now() + DISMISS_DAYS * 24 * 60 * 60 * 1000)
      );
    } catch {
      // 保存できなくても閉じる動作自体は成立させる
    }
  };

  return (
    <div
      className={`fixed bottom-4 left-4 z-40 transition-all duration-500 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
      }`}
      aria-hidden={!visible}
    >
      <div className="catalog-card relative w-52 -rotate-2 bg-paper-card p-3.5 shadow-lg">
        <button
          type="button"
          onClick={dismiss}
          aria-label="閉じる"
          className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border border-line bg-paper text-ink-soft hover:text-ink"
        >
          <X size={12} strokeWidth={2} />
        </button>
        <span className="index-tab bg-stamp/10 text-stamp">R</span>
        <p className="mt-2 font-display text-sm leading-snug text-ink">
          {siteConfig.rakuten.description}
        </p>
        <Link
          href={siteConfig.rakuten.href}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className="mt-2.5 flex w-full items-center justify-center rounded-card bg-ink px-3 py-1.5 font-body text-xs text-paper transition-opacity hover:opacity-90"
        >
          {siteConfig.rakuten.label}
        </Link>
      </div>
    </div>
  );
}
