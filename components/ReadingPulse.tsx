"use client";

import { useEffect, useState } from "react";

interface Stats {
  enabled: boolean;
  views: number | null;
}

// Upstash Redis接続時のみ動く「累計で読まれた回数」の表示。
// 未接続なら stats.enabled が false のまま返ってくるので何も描画しない
// （偽の人数を見せるくらいなら、何も出さない方を選ぶ）。
export default function ReadingPulse({ slug }: { slug: string }) {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const viewedKey = `nx_viewed_${slug}`;
    try {
      if (!sessionStorage.getItem(viewedKey)) {
        fetch("/api/reading/view", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug }),
        }).catch(() => {});
        sessionStorage.setItem(viewedKey, "1");
      }
    } catch {
      // sessionStorageが使えない環境では、多重カウントの可能性はあるが計測自体は続ける
    }

    let cancelled = false;

    fetch(`/api/reading/stats?slug=${encodeURIComponent(slug)}`, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: Stats | null) => {
        if (!cancelled && data) setStats(data);
      })
      .catch(() => {
        // 取得に失敗しても表示を出さないだけで、他の機能には影響させない
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (!stats || !stats.enabled || stats.views === null) return null;

  return (
    <div className="index-tab gap-2 bg-moss-light text-moss">
      <span>累計 {stats.views.toLocaleString("ja-JP")}人が閲覧</span>
    </div>
  );
}
