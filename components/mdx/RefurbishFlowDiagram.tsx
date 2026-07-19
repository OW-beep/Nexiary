// 再生パソコン（リファービッシュPC）ができるまでの工程を示す挿絵。
// MDX内で <RefurbishFlowDiagram /> の形で使用する。
export default function RefurbishFlowDiagram() {
  const steps = ["回収", "検査", "パーツ交換", "OS再構築", "販売"];
  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <svg viewBox="0 0 300 80" className="w-full" role="img" aria-label="再生パソコンができるまでの工程を示す図">
        {steps.map((s, i) => (
          <g key={s}>
            <rect x={10 + i * 58} y="20" width="48" height="34" rx="4" fill="none" stroke="#356156" strokeWidth="2" />
            <text x={10 + i * 58 + 24} y="41" textAnchor="middle" className="font-mono" fontSize="9" fill="#20263B">
              {s}
            </text>
            {i < steps.length - 1 && (
              <line
                x1={58 + i * 58}
                y1="37"
                x2={68 + i * 58}
                y2="37"
                stroke="#B4472B"
                strokeWidth="2"
                markerEnd="url(#refurbArrow)"
              />
            )}
          </g>
        ))}
        <defs>
          <marker id="refurbArrow" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto">
            <path d="M0,0 L5,2.5 L0,5 Z" fill="#B4472B" />
          </marker>
        </defs>
      </svg>
      <figcaption className="mt-2 text-center font-mono text-[11px] text-ink-soft">
        ただの中古とは違い、企業から回収した機体を整備し直してから販売するのが「再生パソコン」の特徴
      </figcaption>
    </figure>
  );
}
