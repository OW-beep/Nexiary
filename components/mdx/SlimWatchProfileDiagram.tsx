// 一般的な多機能スマートウォッチと、C60のようなスリムタイプを「横から見た厚み」で
// 対比する挿絵。他の挿絵（正面シルエット比較・円のカバー範囲等）とは
// 「側面プロファイルの厚み比較」という表現で差別化している。
// MDX内で <SlimWatchProfileDiagram /> の形で使用する。
export default function SlimWatchProfileDiagram() {
  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <p className="font-display text-base text-ink">本体の厚み（横から見たイメージ）</p>
      <div className="mt-6 flex items-end justify-center gap-12">
        <div className="flex flex-col items-center gap-2">
          <svg width="90" height="70" viewBox="0 0 90 70" aria-hidden="true">
            <rect x="10" y="10" width="70" height="34" rx="6" fill="#4A5170" opacity="0.18" stroke="#4A5170" strokeWidth="2" />
            <line x1="10" y1="50" x2="80" y2="50" stroke="#D8D3C4" strokeWidth="3" />
          </svg>
          <span className="font-mono text-[11px] text-ink-soft">多機能・大画面タイプ</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <svg width="90" height="70" viewBox="0 0 90 70" aria-hidden="true">
            <rect x="10" y="32" width="70" height="12" rx="4" fill="#B4472B" opacity="0.25" stroke="#B4472B" strokeWidth="2" />
            <line x1="10" y1="50" x2="80" y2="50" stroke="#D8D3C4" strokeWidth="3" />
          </svg>
          <span className="font-mono text-[11px] text-ink-soft">C60のようなスリムタイプ</span>
        </div>
      </div>
      <figcaption className="mt-4 text-center font-mono text-[11px] text-ink-soft">
        腕への存在感が違うため、長時間つけっぱなしにしても負担になりにくい。
      </figcaption>
    </figure>
  );
}
