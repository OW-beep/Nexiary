"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { saveLicense } from "@/lib/diffflow/license";

// payjp.js v2 の最小限の型(公式には型定義パッケージがあるが、依存を増やさないためここだけ手書き)
type PayjpElement = {
  mount: (selector: string) => void;
  unmount: () => void;
  on: (event: "change", handler: (e: { complete: boolean; error?: { message: string } }) => void) => void;
};
type PayjpElements = {
  create: (type: "card") => PayjpElement;
};
type Payjp = {
  elements: () => PayjpElements;
  createToken: (element: PayjpElement) => Promise<{ id?: string; error?: { message: string } }>;
};

declare global {
  interface Window {
    Payjp?: (publicKey: string) => Payjp;
  }
}

const SCRIPT_SRC = "https://js.pay.jp/v2/pay.js";
const PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYJP_PUBLIC_KEY;

export default function UpgradeForm() {
  const mountRef = useRef<HTMLDivElement>(null);
  const cardElementRef = useRef<PayjpElement | null>(null);
  const payjpRef = useRef<Payjp | null>(null);

  const [scriptReady, setScriptReady] = useState(false);
  const [cardComplete, setCardComplete] = useState(false);
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [licenseId, setLicenseId] = useState<string | null>(null);

  // payjp.js v2 を読み込む
  useEffect(() => {
    if (window.Payjp) {
      setScriptReady(true);
      return;
    }
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => setScriptReady(true);
    script.onerror = () => setError("決済フォームの読み込みに失敗しました。通信環境をご確認ください。");
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // カード入力欄をマウントする
  useEffect(() => {
    if (!scriptReady || !window.Payjp || !mountRef.current || !PUBLIC_KEY) return;
    const payjp = window.Payjp(PUBLIC_KEY);
    payjpRef.current = payjp;
    const elements = payjp.elements();
    const card = elements.create("card");
    card.mount("#diffflow-card-element");
    card.on("change", (e) => {
      setCardComplete(e.complete);
      if (e.error) setError(e.error.message);
      else setError(null);
    });
    cardElementRef.current = card;
    return () => {
      card.unmount();
    };
  }, [scriptReady]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!payjpRef.current || !cardElementRef.current) return;
    if (!email.trim()) {
      setError("メールアドレスを入力してください");
      return;
    }
    if (!cardComplete) {
      setError("カード情報を入力してください");
      return;
    }

    setBusy(true);
    setError(null);

    const tokenResult = await payjpRef.current.createToken(cardElementRef.current);
    if (tokenResult.error || !tokenResult.id) {
      setError(tokenResult.error?.message ?? "カード情報の確認に失敗しました");
      setBusy(false);
      return;
    }

    try {
      const res = await fetch("/api/diffflow/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), token: tokenResult.id }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "決済処理に失敗しました");
      }
      saveLicense(data.subscriptionId);
      setLicenseId(data.subscriptionId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "決済処理に失敗しました");
    } finally {
      setBusy(false);
    }
  }

  if (!PUBLIC_KEY) {
    return (
      <p className="catalog-card p-5 font-body text-sm text-stamp">
        決済フォームが設定されていません(NEXT_PUBLIC_PAYJP_PUBLIC_KEY未設定)。サイト管理者にお問い合わせください。
      </p>
    );
  }

  if (licenseId) {
    return (
      <div className="catalog-card space-y-3 p-5">
        <p className="flex items-center gap-2 font-body text-sm text-moss">
          <CheckCircle2 size={18} /> Proへのアップグレードが完了しました
        </p>
        <p className="font-body text-xs text-ink-soft">
          このライセンスキーは、他の端末でDiffFlowを開く際にも使えます。念のため控えておいてください。
        </p>
        <div className="rounded-card border border-line bg-paper-card px-3 py-2 font-mono text-sm text-ink">
          {licenseId}
        </div>
        <a
          href="/tools/diffflow"
          className="inline-block rounded-card bg-ink px-5 py-2 font-body text-sm text-paper transition-opacity hover:opacity-90"
        >
          DiffFlowを開く
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="catalog-card space-y-4 p-5">
      <div>
        <label className="font-mono text-[11px] text-ink-soft/70">メールアドレス</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="mt-1 w-full rounded-card border border-line bg-paper-card px-3 py-2 font-body text-sm text-ink focus:border-stamp focus:outline-none"
        />
      </div>

      <div>
        <label className="font-mono text-[11px] text-ink-soft/70">カード情報</label>
        <div
          id="diffflow-card-element"
          ref={mountRef}
          className="mt-1 rounded-card border border-line bg-paper-card px-3 py-2.5"
        />
      </div>

      {error && <p className="font-body text-sm text-stamp">{error}</p>}

      <button
        type="submit"
        disabled={busy || !scriptReady}
        className="flex items-center justify-center gap-2 rounded-card bg-ink px-5 py-2.5 font-body text-sm text-paper transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {busy && <Loader2 size={14} className="animate-spin" />}
        {busy ? "処理中…" : "月額980円で登録する"}
      </button>
      <p className="font-mono text-[11px] text-ink-soft/70">
        カード情報はPAY.JPに直接送信され、当サイトのサーバーには保存されません。
      </p>
    </form>
  );
}
