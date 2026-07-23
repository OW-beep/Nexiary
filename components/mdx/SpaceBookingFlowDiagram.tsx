// 「検索→予約→当日利用」の流れを示す挿絵。MDX内で <SpaceBookingFlowDiagram /> の形で使用する。
export default function SpaceBookingFlowDiagram() {
  const steps = [
    { x: 10, label: "①検索" },
    { x: 112, label: "②予約・決済" },
    { x: 214, label: "③当日利用" },
  ];
  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <svg viewBox="0 0 300 90" className="w-full" role="img" aria-label="レンタルスペースの検索から利用までの流れを示す図">
        {steps.map((s, i) => (
          <g key={s.label}>
            <rect x={s.x} y="15" width="80" height="40" rx="4" fill="none" stroke="#356156" strokeWidth="2" />
            <text x={s.x + 40} y="39" textAnchor="middle" className="font-body" fontSize="9.5" fill="#20263B">
              {s.label}
            </text>
            {i < steps.length - 1 && (
              <line
                x1={s.x + 85}
                y1="35"
                x2={s.x + 101}
                y2="35"
                stroke="#B4472B"
                strokeWidth="2"
                markerEnd="url(#spaceFlowArrow)"
              />
            )}
          </g>
        ))}
        <defs>
          <marker id="spaceFlowArrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#B4472B" />
          </marker>
        </defs>
        <text x="10" y="78" className="font-mono" fontSize="9" fill="#4A5170">
          電話や内見の予約なしで、Web上だけで完結する
        </text>
      </svg>
      <figcaption className="mt-2 text-center font-mono text-[11px] text-ink-soft">
        用途・エリア・人数で絞り込み、空き状況を見ながらそのまま予約できる
      </figcaption>
    </figure>
  );
}
