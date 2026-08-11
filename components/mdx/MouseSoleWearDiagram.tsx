// すり減ったソール（波打った断面）と、新品のソール（平らな断面）を並べて、
// 滑走面のコンディションの違いを示す挿絵。他の挿絵（用途アイコン一覧・ゲージ等）とは
// 「断面図での摩耗比較」という表現で差別化している。
// MDX内で <MouseSoleWearDiagram /> の形で使用する。
export default function MouseSoleWearDiagram() {
  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <p className="font-display text-base text-ink">ソールの摩耗イメージ（断面）</p>
      <div className="mt-6 flex justify-center gap-12">
        <div className="flex flex-col items-center gap-2">
          <svg width="120" height="50" viewBox="0 0 120 50" aria-hidden="true">
            <path
              d="M4,40 Q20,44 30,38 T60,40 Q75,36 90,40 T116,38"
              fill="none"
              stroke="#B4472B"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <rect x="4" y="10" width="112" height="18" rx="3" fill="none" stroke="#4A5170" strokeWidth="2" />
          </svg>
          <span className="font-mono text-[11px] text-ink-soft">摩耗したソール（引っかかりが出やすい）</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <svg width="120" height="50" viewBox="0 0 120 50" aria-hidden="true">
            <line x1="4" y1="40" x2="116" y2="40" stroke="#356156" strokeWidth="4" strokeLinecap="round" />
            <rect x="4" y="10" width="112" height="18" rx="3" fill="none" stroke="#4A5170" strokeWidth="2" />
          </svg>
          <span className="font-mono text-[11px] text-ink-soft">交換後のソール（滑らかに滑る）</span>
        </div>
      </div>
      <figcaption className="mt-4 text-center font-mono text-[11px] text-ink-soft">
        滑走面が均一なほど、カーソルの引っかかりや急な減速を感じにくくなる。
      </figcaption>
    </figure>
  );
}
