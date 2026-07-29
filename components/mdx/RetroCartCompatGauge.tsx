// 「手持ちカセットの体感で約7割が問題なく動いた」という感触を、円弧のゲージで見せる挿絵。
// 他の挿絵（アイコン繰り返し・Before/After・角度の扇形・帯グラフ・シルエット比較・充電レイアウト）とは
// 「ゲージ・メーター」という表現で差別化している。
// MDX内で <RetroCartCompatGauge percent={70} /> の形で使用する。
export default function RetroCartCompatGauge({ percent = 70 }: { percent?: number }) {
  const clamped = Math.max(0, Math.min(100, percent));
  const angle = (clamped / 100) * 180;
  const rad = (Math.PI / 180) * (180 - angle);
  const r = 80;
  const cx = 110;
  const cy = 100;
  const x = cx + r * Math.cos(rad);
  const y = cy - r * Math.sin(rad);
  const largeArc = angle > 180 ? 1 : 0;

  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <p className="font-display text-base text-ink">手持ちカセットの体感動作率</p>
      <svg viewBox="0 0 220 120" className="mx-auto mt-4 w-full max-w-xs" role="img" aria-label={`手持ちカセットの体感動作率 約${clamped}%`}>
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke="#D8D3C4"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 ${largeArc} 1 ${x} ${y}`}
          fill="none"
          stroke="#356156"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <text x={cx} y={cy - 10} textAnchor="middle" className="font-display" fontSize="30" fill="#20263B">
          約{clamped}%
        </text>
      </svg>
      <figcaption className="mt-2 text-center font-mono text-[11px] text-ink-soft">
        あくまで個人の体感です。ソフトやカセットの状態によって動作可否は変わります。
      </figcaption>
    </figure>
  );
}
