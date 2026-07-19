// 1日の座り時間が積み上がっていく様子を示すタイムライン風の挿絵。
// 箱型の比較図とは違い、時間軸に沿った帯グラフのテイストにしている。
// MDX内で <SittingTimeChart /> の形で使用する。
export default function SittingTimeChart() {
  const hours = ["9時", "11時", "13時", "15時", "17時", "19時"];
  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <svg viewBox="0 0 300 100" className="w-full" role="img" aria-label="1日の座り時間の積み上がりを示す図">
        <rect x="15" y="30" width="270" height="18" fill="#E4EAE3" />
        <rect x="15" y="30" width="270" height="18" fill="#B4472B" opacity="0.55" />
        <rect x="15" y="30" width="90" height="18" fill="#356156" opacity="0.7" />
        {hours.map((h, i) => (
          <text
            key={h}
            x={15 + i * 54}
            y="62"
            className="font-mono"
            fontSize="8"
            fill="#4A5170"
          >
            {h}
          </text>
        ))}
        <text x="15" y="20" className="font-mono" fontSize="8" fill="#356156">
          こまめに立つ習慣
        </text>
        <text x="140" y="20" className="font-mono" fontSize="8" fill="#B4472B">
          座りっぱなしが続く時間帯
        </text>
        <text x="15" y="80" className="font-body" fontSize="9" fill="#4A5170">
          <tspan x="15" dy="0">意識しないと、始業から終業までほぼ座位のままになりやすい</tspan>
        </text>
      </svg>
      <figcaption className="mt-2 text-center font-mono text-[11px] text-ink-soft">
        こまめに立つ時間を挟むだけでも、座りっぱなしの時間帯を分断できる
      </figcaption>
    </figure>
  );
}
