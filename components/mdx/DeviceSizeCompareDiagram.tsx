// 活動量計の「コンパクトさ」を、スマホ・スマートウォッチとのシルエット比較で見せる挿絵。
// 他の挿絵（棒グラフ・波形・アイコン繰り返し等）とかぶらない「シルエットの相対比較」表現。
// MDX内で <DeviceSizeCompareDiagram /> の形で使用する。
export default function DeviceSizeCompareDiagram() {
  const items = [
    { label: "スマートフォン", w: 46, h: 96, r: 8 },
    { label: "スマートウォッチ", w: 40, h: 48, r: 10 },
    { label: "活動量計", w: 22, h: 30, r: 6, highlight: true },
  ];

  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <p className="font-display text-base text-ink">身につける機器のサイズ感（比率イメージ）</p>
      <div className="mt-6 flex items-end justify-center gap-8">
        {items.map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-2">
            <svg width="60" height="100" viewBox="0 0 60 100" aria-hidden="true">
              <rect
                x={(60 - item.w) / 2}
                y={100 - item.h}
                width={item.w}
                height={item.h}
                rx={item.r}
                fill={item.highlight ? "#B4472B" : "none"}
                fillOpacity={item.highlight ? 0.15 : 1}
                stroke={item.highlight ? "#B4472B" : "#4A5170"}
                strokeWidth="2"
              />
            </svg>
            <span className="font-mono text-[11px] text-ink-soft">{item.label}</span>
          </div>
        ))}
      </div>
      <figcaption className="mt-4 text-center font-mono text-[11px] text-ink-soft">
        あくまで相対的なサイズ感のイメージです。ポケットに入れても存在を意識しにくいのは、この小ささが理由です。
      </figcaption>
    </figure>
  );
}
