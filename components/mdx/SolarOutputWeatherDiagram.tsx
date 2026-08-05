// 「晴れの日は80〜85W前後、曇りや日陰ではほぼ発電しない」という天候による発電量の差を
// 棒グラフで示す挿絵。他の挿絵（グロー・循環矢印・吹き出し等）とは
// 「天候別の棒グラフ」という表現で差別化している。
// MDX内で <SolarOutputWeatherDiagram /> の形で使用する。
export default function SolarOutputWeatherDiagram() {
  const bars = [
    { label: "晴天・直射", value: 85, note: "80〜85W前後" },
    { label: "曇り・日陰", value: 8, note: "ほぼ発電しない" },
  ];
  const maxH = 90;

  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <p className="font-display text-base text-ink">天候による発電量の違い（体感）</p>
      <div className="mt-6 flex items-end justify-center gap-12">
        {bars.map((b) => (
          <div key={b.label} className="flex flex-col items-center gap-2">
            <svg width="60" height={maxH + 10} viewBox={`0 0 60 ${maxH + 10}`} aria-hidden="true">
              <rect x="0" y={maxH} width="60" height="2" fill="#D8D3C4" />
              <rect
                x="14"
                y={maxH - (b.value / 100) * maxH}
                width="32"
                height={(b.value / 100) * maxH}
                rx="3"
                fill="#B4472B"
                opacity="0.75"
              />
            </svg>
            <span className="font-mono text-[11px] text-ink-soft">{b.label}</span>
            <span className="font-display text-sm text-ink">{b.note}</span>
          </div>
        ))}
      </div>
      <figcaption className="mt-4 text-center font-mono text-[11px] text-ink-soft">
        設置場所・天候にかなり左右されるため、あくまで「補助的な発電手段」として捉えるのが実態に近い。
      </figcaption>
    </figure>
  );
}
