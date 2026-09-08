// コーヒーを淹れる手間と、タブレットをそのまま口にする手軽さを対比する挿絵。
// 他の挿絵（円のカバー範囲・横スケール等）とは「準備の手間の有無」という表現で差別化している。
// MDX内で <CaffeineFormComparisonDiagram /> の形で使用する。
export default function CaffeineFormComparisonDiagram() {
  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <p className="font-display text-base text-ink">摂り方の違い（イメージ）</p>
      <div className="mt-6 flex justify-center gap-12">
        <div className="flex flex-col items-center gap-2">
          <svg width="70" height="70" viewBox="0 0 70 70" aria-hidden="true">
            <path d="M18,28 h30 v22 a15,15 0 0 1 -30,0 z" fill="none" stroke="#4A5170" strokeWidth="3" />
            <path d="M48,32 q14,2 10,16 q-3,8 -10,6" fill="none" stroke="#4A5170" strokeWidth="3" />
            <line x1="24" y1="18" x2="24" y2="24" stroke="#4A5170" strokeWidth="2" />
            <line x1="34" y1="16" x2="34" y2="22" stroke="#4A5170" strokeWidth="2" />
          </svg>
          <span className="font-mono text-[11px] text-ink-soft">コーヒー：淹れる手間がある</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <svg width="70" height="70" viewBox="0 0 70 70" aria-hidden="true">
            <rect x="24" y="20" width="22" height="34" rx="11" fill="#B4472B" opacity="0.2" stroke="#B4472B" strokeWidth="3" />
            <line x1="24" y1="37" x2="46" y2="37" stroke="#B4472B" strokeWidth="2" />
          </svg>
          <span className="font-mono text-[11px] text-ink-soft">タブレット：そのまま摂れる</span>
        </div>
      </div>
      <figcaption className="mt-4 text-center font-mono text-[11px] text-ink-soft">
        味やカフェイン量が一定なのも、コーヒーとの違いの一つ。
      </figcaption>
    </figure>
  );
}
