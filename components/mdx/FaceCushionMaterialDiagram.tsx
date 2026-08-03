// 純正のスポンジ素材と、交換用PUレザー素材の質感の違いを、表面パターンの描き分けで示す挿絵。
// 他の挿絵（回転矢印・ケーブル比較・放射クラスター等）とは「素材の表面テクスチャの対比」という
// 表現で差別化している。
// MDX内で <FaceCushionMaterialDiagram /> の形で使用する。
export default function FaceCushionMaterialDiagram() {
  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <p className="font-display text-base text-ink">素材の質感イメージ</p>
      <div className="mt-6 flex justify-center gap-10">
        <div className="flex flex-col items-center gap-2">
          <svg width="110" height="80" viewBox="0 0 110 80" aria-hidden="true">
            <rect x="4" y="4" width="102" height="72" rx="12" fill="#FCFBF7" stroke="#4A5170" strokeWidth="2" />
            {Array.from({ length: 5 }).map((_, row) =>
              Array.from({ length: 7 }).map((_, col) => (
                <circle
                  key={`${row}-${col}`}
                  cx={14 + col * 13}
                  cy={16 + row * 12}
                  r="2.4"
                  fill="#4A5170"
                  opacity="0.35"
                />
              ))
            )}
          </svg>
          <span className="font-mono text-[11px] text-ink-soft">純正スポンジ（ざらつきあり）</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <svg width="110" height="80" viewBox="0 0 110 80" aria-hidden="true">
            <rect x="4" y="4" width="102" height="72" rx="12" fill="#FCFBF7" stroke="#B4472B" strokeWidth="2" />
            {Array.from({ length: 4 }).map((_, i) => (
              <line
                key={i}
                x1="10"
                y1={18 + i * 15}
                x2="100"
                y2={18 + i * 15}
                stroke="#B4472B"
                strokeWidth="1.5"
                opacity="0.35"
              />
            ))}
          </svg>
          <span className="font-mono text-[11px] text-ink-soft">交換用PUレザー（なめらか）</span>
        </div>
      </div>
      <figcaption className="mt-4 text-center font-mono text-[11px] text-ink-soft">
        質感のイメージです。個人の触感によって感じ方は異なります。
      </figcaption>
    </figure>
  );
}
