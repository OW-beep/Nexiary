// メントールの清涼感の強さを、横向きのスケールとマーカーで示す挿絵。
// 他の挿絵（縦の温度計・円弧のゲージ・放射クラスター等）とは
// 「横スケール＋位置マーカー」という表現で差別化している。
// MDX内で <IntensityScaleDiagram /> の形で使用する。
export default function IntensityScaleDiagram() {
  const markerPos = 82; // 0-100、右に寄るほど清涼感が強い

  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <p className="font-display text-base text-ink">清涼感の強さ（体感）</p>
      <div className="mt-6 px-2">
        <svg viewBox="0 0 320 40" className="w-full" role="img" aria-label="清涼感の強さのスケール">
          <defs>
            <linearGradient id="intensityGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#D8D3C4" />
              <stop offset="100%" stopColor="#356156" />
            </linearGradient>
          </defs>
          <rect x="0" y="14" width="320" height="10" rx="5" fill="url(#intensityGrad)" />
          <polygon
            points={`${(markerPos / 100) * 320},4 ${(markerPos / 100) * 320 - 8},18 ${(markerPos / 100) * 320 + 8},18`}
            fill="#B4472B"
          />
        </svg>
        <div className="mt-2 flex justify-between font-mono text-[11px] text-ink-soft">
          <span>ひかえめ</span>
          <span>強い清涼感</span>
        </div>
      </div>
      <figcaption className="mt-4 text-center font-mono text-[11px] text-ink-soft">
        あくまで個人の体感です。メントールの刺激の感じ方には個人差があります。
      </figcaption>
    </figure>
  );
}
