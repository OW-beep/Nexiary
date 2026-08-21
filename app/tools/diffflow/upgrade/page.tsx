import type { Metadata } from "next";
import Container from "@/components/Container";
import Breadcrumbs from "@/components/Breadcrumbs";
import UpgradeForm from "@/components/tools/diffflow/UpgradeForm";
import { getFreeRowLimit, getFreeColumnLimitLabel, getProRowLimit } from "@/lib/diffflow/engine";

export const metadata: Metadata = {
  title: "DiffFlow Pro｜月額980円で行数制限を解除",
  description: "DiffFlow Proで1ファイル100,000行までの比較・データ品質チェックが使えるようになります。",
  alternates: { canonical: "/tools/diffflow/upgrade" },
};

export default function DiffFlowUpgradePage() {
  const freeRows = getFreeRowLimit();
  const freeColLabel = getFreeColumnLimitLabel();
  const proRows = getProRowLimit();

  return (
    <Container className="py-12">
      <Breadcrumbs
        items={[
          { label: "ホーム", href: "/" },
          { label: "ツール", href: "/tools" },
          { label: "DiffFlow", href: "/tools/diffflow" },
          { label: "Proへアップグレード" },
        ]}
      />

      <div className="mt-4 max-w-xl">
        <span className="index-tab">PRO</span>
        <h1 className="mt-3 font-display text-3xl font-semibold text-ink">DiffFlow Pro</h1>
        <p className="mt-3 font-body text-sm leading-relaxed text-ink-soft">
          無料版は1ファイル{freeRows.toLocaleString()}行・{freeColLabel}列までです。Proにアップグレードすると、1ファイル
          {proRows.toLocaleString()}行までの比較が可能になります。ログイン・アカウント作成は不要で、登録後に発行される
          ライセンスキー(サブスクリプションID)をこの端末に保存するだけで使えます。
        </p>
        <p className="mt-4 font-display text-2xl text-ink">
          ¥980<span className="font-body text-sm text-ink-soft"> / 月</span>
        </p>
      </div>

      <div className="mt-8 max-w-xl">
        <UpgradeForm />
      </div>
    </Container>
  );
}
