"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// サイト全体のクリックを監視し、A8.netのアフィリエイトリンク（または
// rel="sponsored" が付いたリンク）がクリックされたら、GA4へ
// affiliate_click イベントを送信する。
// MDX内の生のバナー<a>タグ、AffiliateCard、FloatingAffiliateBarなど、
// どの形のリンクでも一括で拾えるよう、記事側の修正なしで動く設計にしている。
export default function AffiliateClickTracker() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;
      const href = target.getAttribute("href") || "";
      const rel = target.getAttribute("rel") || "";
      const isAffiliate = href.includes("a8.net") || rel.includes("sponsored");
      if (!isAffiliate || !window.gtag) return;

      window.gtag("event", "affiliate_click", {
        link_url: href,
        page_path: window.location.pathname,
        link_text: target.textContent?.trim().slice(0, 60) || "",
      });
    };

    document.addEventListener("click", handleClick, { capture: true });
    return () => document.removeEventListener("click", handleClick, { capture: true });
  }, []);

  return null;
}
