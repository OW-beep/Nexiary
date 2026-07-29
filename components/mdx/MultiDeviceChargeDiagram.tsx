// iPhone・Apple Watch・AirPodsの3台をまとめて置くだけ充電できるレイアウトを示す挿絵。
// 他の挿絵（アイコン繰り返し・シルエット比較・角度の扇形・帯グラフ）とは
// 「3つの充電パッド配置」という表現で差別化している。
// MDX内で <MultiDeviceChargeDiagram /> の形で使用する。
export default function MultiDeviceChargeDiagram() {
  const devices = [
    { label: "iPhone", w: 40, h: 78 },
    { label: "Apple Watch", w: 34, h: 34 },
    { label: "AirPods", w: 30, h: 22 },
  ];

  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <p className="font-display text-base text-ink">3台をまとめて置くだけ充電</p>
      <div className="mt-6 flex items-end justify-center gap-8">
        {devices.map((d) => (
          <div key={d.label} className="flex flex-col items-center gap-2">
            <svg width="60" height="90" viewBox="0 0 60 90" aria-hidden="true">
              <rect
                x={(60 - d.w) / 2}
                y={80 - d.h}
                width={d.w}
                height={d.h}
                rx={d.label === "iPhone" ? 8 : 6}
                fill="#B4472B"
                opacity="0.15"
                stroke="#B4472B"
                strokeWidth="2"
              />
              <ellipse cx="30" cy="84" rx="24" ry="4" fill="#356156" opacity="0.5" />
            </svg>
            <span className="font-mono text-[11px] text-ink-soft">{d.label}</span>
          </div>
        ))}
      </div>
      <figcaption className="mt-4 text-center font-mono text-[11px] text-ink-soft">
        置き方のイメージです。実際の充電には対応機種・出力（W数）の確認が必要です。
      </figcaption>
    </figure>
  );
}
