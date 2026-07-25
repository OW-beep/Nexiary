"use client";

import { useState } from "react";
import Link from "next/link";
import { Shuffle } from "lucide-react";

interface CardPost {
  slug: string;
  title: string;
  categoryLabel: string;
}

// 図書館の目録カードを1枚引くような体験で、ランダムに記事へ誘導する回遊装置。
// 一覧をだらだら見るのではなく、「今日はどれを引く？」という遊びの要素を足すためのもの。
export default function RandomCardDraw({ posts }: { posts: CardPost[] }) {
  const [picked, setPicked] = useState<CardPost | null>(null);
  const [flipped, setFlipped] = useState(false);

  const draw = () => {
    if (posts.length === 0) return;
    setFlipped(false);
    const next = posts[Math.floor(Math.random() * posts.length)];
    // 一瞬めくれてから中身が変わるように、めくり動作とデータ更新を少しずらす
    window.setTimeout(() => {
      setPicked(next);
      setFlipped(true);
    }, 150);
  };

  return (
    <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
      <button
        type="button"
        onClick={draw}
        className="flex items-center gap-2 rounded-card border border-line bg-paper px-4 py-2.5 font-body text-sm text-ink transition-colors hover:border-stamp hover:text-stamp"
      >
        <Shuffle size={15} strokeWidth={1.75} />
        気になる一冊を引く
      </button>

      {picked && (
        <div
          className={`catalog-card w-full max-w-xs rotate-1 bg-paper-card p-4 transition-all duration-300 ${
            flipped ? "opacity-100" : "translate-y-1 opacity-0"
          }`}
        >
          <span className="index-tab">{picked.categoryLabel}</span>
          <p className="mt-2 font-display text-sm leading-snug text-ink">{picked.title}</p>
          <Link
            href={`/posts/${picked.slug}`}
            className="mt-2 inline-block font-mono text-xs text-stamp hover:underline"
          >
            この一冊を開く →
          </Link>
        </div>
      )}
    </div>
  );
}
