// 容量(mAh)からスマホを何回分充電できるかの目安を、スマホアイコンの並びで見せる挿絵。
// 他の挿絵（波形・棒グラフ・円の重なり等）とかぶらない「アイコンの繰り返し」表現にしている。
// MDX内で <BatteryChargeCountDiagram capacityMah={23600} phoneMah={4500} /> の形で使用する。
export default function BatteryChargeCountDiagram({
  capacityMah = 23600,
  phoneMah = 4500,
  efficiency = 0.75,
}: {
  capacityMah?: number;
  phoneMah?: number;
  efficiency?: number;
}) {
  // モバイルバッテリーは変換ロスがあり、表示容量を100%そのまま出力できるわけではないため
  // 目安として efficiency（デフォルト75%）を掛けて実効容量を計算する
  const usableMah = capacityMah * efficiency;
  const chargeCount = Math.floor(usableMah / phoneMah);
  const icons = Array.from({ length: Math.min(chargeCount, 6) });

  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <p className="font-display text-base text-ink">
        {capacityMah.toLocaleString("ja-JP")}mAhは、スマホ何回分？
      </p>
      <div className="mt-5 flex flex-wrap items-end justify-center gap-3">
        {icons.map((_, i) => (
          <svg key={i} width="28" height="52" viewBox="0 0 28 52" aria-hidden="true">
            <rect x="1" y="1" width="26" height="50" rx="5" fill="none" stroke="#20263B" strokeWidth="2" />
            <rect x="10" y="-3" width="8" height="5" rx="1.5" fill="#20263B" />
            <rect x="4" y="6" width="20" height="40" rx="2" fill="#B4472B" opacity="0.75" />
          </svg>
        ))}
        {chargeCount > 6 && (
          <span className="font-mono text-sm text-ink-soft">+{chargeCount - 6}</span>
        )}
      </div>
      <p className="mt-4 text-center font-display text-lg text-ink">
        約{chargeCount}回分
      </p>
      <figcaption className="mt-3 text-center font-mono text-[11px] text-ink-soft">
        スマホ本体を{phoneMah.toLocaleString("ja-JP")}mAhと仮定し、変換ロスを考慮した実効容量（約{Math.round(
          efficiency * 100
        )}
        %）で試算した目安。実際の回数は機種や使用状況により変動します。
      </figcaption>
    </figure>
  );
}
