interface BarChartItem {
  label: string;
  value: number;
  max: number;
  unit?: string;
  highlight?: boolean; // 紹介している製品自身のバーを強調する場合
}

// 比較用の横棒グラフ。MDX内で <SpecBarChart title="..." items={[...]} note="..." /> の形で使用する。
// note には出典・注記（例：目安値である旨）を必ず添えることを推奨。
export default function SpecBarChart({
  title,
  items,
  note,
}: {
  title: string;
  items: BarChartItem[];
  note?: string;
}) {
  return (
    <div className="not-prose catalog-card my-8 p-5">
      <p className="font-display text-base text-ink">{title}</p>
      <div className="mt-5 flex flex-col gap-4">
        {items.map((item) => (
          <div key={item.label}>
            <div className="mb-1 flex items-baseline justify-between">
              <span className="font-body text-sm text-ink">{item.label}</span>
              <span className="font-mono text-xs text-ink-soft">
                {item.value}
                {item.unit}
              </span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-line/50">
              <div
                className={`h-full rounded-full ${item.highlight ? "bg-stamp" : "bg-moss"}`}
                style={{ width: `${Math.min(100, (item.value / item.max) * 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      {note && <p className="mt-4 font-mono text-[11px] text-ink-soft/70">{note}</p>}
    </div>
  );
}
