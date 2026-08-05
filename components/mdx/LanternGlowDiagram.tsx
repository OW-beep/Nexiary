// ランタンから広がる暖かい光を、同心円のグロー表現で見せる挿絵。
// 他の挿絵（ゲージ・循環矢印・吹き出し等）とは「光の広がり（グロー）」という表現で差別化している。
// MDX内で <LanternGlowDiagram /> の形で使用する。
export default function LanternGlowDiagram() {
  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <p className="font-display text-base text-ink">光の印象（無段階調光のイメージ）</p>
      <svg viewBox="0 0 220 140" className="mx-auto mt-4 w-full max-w-xs" role="img" aria-label="暖かみのあるランタンの光が広がるイメージ">
        {[70, 52, 34].map((r, i) => (
          <circle key={r} cx="110" cy="70" r={r} fill="#B4472B" opacity={0.06 + i * 0.05} />
        ))}
        <rect x="94" y="56" width="32" height="40" rx="6" fill="#FCFBF7" stroke="#4A5170" strokeWidth="2" />
        <rect x="102" y="46" width="16" height="10" rx="3" fill="#4A5170" />
        <circle cx="110" cy="76" r="9" fill="#B4472B" opacity="0.7" />
      </svg>
      <div className="mt-3 flex justify-center gap-6 font-mono text-[11px] text-ink-soft">
        <span>弱め：リラックスタイムに</span>
        <span>強め：簡単な作業・読書に</span>
      </div>
      <figcaption className="mt-2 text-center font-mono text-[11px] text-ink-soft">
        無段階調光でシーンに合わせて明るさを変えられる。
      </figcaption>
    </figure>
  );
}
