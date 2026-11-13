"use client";

import { useEffect, useState } from "react";
import { loadLicense, clearLicense } from "@/lib/diffflow/license";

// Proの解約フォーム。アカウント制ではないため、ライセンスキー(ID)そのものを本人確認として扱う
// （verifyと同じ設計。IDを知っている人＝契約端末の持ち主という前提）。
export default function CancelForm() {
  const [subscriptionId, setSubscriptionId] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    const saved = loadLicense();
    if (saved) setSubscriptionId(saved.subscriptionId);
  }, []);

  async function handleCancel() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/diffflow/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscriptionId: subscriptionId.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "解約処理に失敗しました");
      clearLicense();
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "解約処理に失敗しました");
    } finally {
      setBusy(false);
      setConfirming(false);
    }
  }

  if (done) {
    return (
      <div className="catalog-card p-5">
        <p className="font-body text-sm text-moss">解約が完了しました。</p>
        <p className="mt-2 font-body text-sm text-ink-soft">
          この端末に保存されていたライセンス情報も削除しました。再度Proを使う場合は、改めて登録してください。
        </p>
      </div>
    );
  }

  return (
    <div className="catalog-card space-y-4 p-5">
      <div>
        <label className="font-mono text-[11px] text-ink-soft/70">ライセンスキー（サブスクリプションID）</label>
        <input
          type="text"
          value={subscriptionId}
          onChange={(e) => setSubscriptionId(e.target.value)}
          placeholder="sub_xxxxxxxxxxxx"
          className="mt-1 w-full rounded-card border border-line bg-paper-card px-3 py-2 font-mono text-sm text-ink focus:border-stamp focus:outline-none"
        />
        <p className="mt-1 font-body text-xs text-ink-soft">
          この端末で登録した場合は自動で入力されています。解約するとPro機能は停止し、次回以降の課金は発生しません。
        </p>
      </div>
      {error && <p className="font-body text-sm text-stamp">{error}</p>}
      {!confirming ? (
        <button
          type="button"
          disabled={!subscriptionId.trim()}
          onClick={() => setConfirming(true)}
          className="rounded-card border border-line bg-paper px-5 py-2 font-body text-sm text-ink transition-colors hover:border-stamp hover:text-stamp disabled:opacity-40"
        >
          解約手続きへ
        </button>
      ) : (
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            disabled={busy}
            onClick={handleCancel}
            className="rounded-card bg-stamp px-5 py-2 font-body text-sm text-paper transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            {busy ? "処理中…" : "本当に解約する"}
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={() => setConfirming(false)}
            className="rounded-card border border-line bg-paper px-5 py-2 font-body text-sm text-ink"
          >
            やめる
          </button>
        </div>
      )}
    </div>
  );
}
