// 「申込→梱包→無料回収→リサイクル」の流れを示す挿絵。MDX内で <PcCollectionFlowDiagram /> の形で使用する。
export default function PcCollectionFlowDiagram() {
  const steps = ["①申込", "②梱包", "③回収", "④リサイクル"];
  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <svg viewBox="0 0 300 80" className="w-full" role="img" aria-label="パソコン回収から資源化までの流れを示す図">
        {steps.map((s, i) => (
          <g key={s}>
            <rect x={8 + i * 72} y="20" width="60" height="34" rx="4" fill="none" stroke="#356156" strokeWidth="2" />
            <text x={8 + i * 72 + 30} y="41" textAnchor="middle" className="font-mono" fontSize="9" fill="#20263B">
              {s}
            </text>
            {i < steps.length - 1 && (
              <line
                x1={68 + i * 72}
                y1="37"
                x2={80 + i * 72}
                y2="37"
                stroke="#B4472B"
                strokeWidth="2"
                markerEnd="url(#pcCollectArrow)"
              />
            )}
          </g>
        ))}
        <defs>
          <marker id="pcCollectArrow" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto">
            <path d="M0,0 L5,2.5 L0,5 Z" fill="#B4472B" />
          </marker>
        </defs>
      </svg>
      <figcaption className="mt-2 text-center font-mono text-[11px] text-ink-soft">
        自治体の粗大ごみ回収とは別枠で、宅配便を使って無料で申し込める仕組み
      </figcaption>
    </figure>
  );
}
