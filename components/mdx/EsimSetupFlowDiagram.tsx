// 「アプリDL→プラン購入→QRで設定」の流れを示す挿絵。MDX内で <EsimSetupFlowDiagram /> の形で使用する。
export default function EsimSetupFlowDiagram() {
  const steps = [
    { x: 6, label: "① アプリDL" },
    { x: 108, label: "② プラン購入" },
    { x: 210, label: "③ QRで設定" },
  ];
  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <svg viewBox="0 0 300 90" className="w-full" role="img" aria-label="eSIMアプリの導入からアクティベートまでの流れを示す図">
        {steps.map((s, i) => (
          <g key={s.label}>
            <rect x={s.x} y="15" width="82" height="40" rx="4" fill="none" stroke="#356156" strokeWidth="2" />
            <text x={s.x + 41} y="39" textAnchor="middle" className="font-body" fontSize="9.5" fill="#20263B">
              {s.label}
            </text>
            {i < steps.length - 1 && (
              <line
                x1={s.x + 87}
                y1="35"
                x2={s.x + 103}
                y2="35"
                stroke="#B4472B"
                strokeWidth="2"
                markerEnd="url(#esimFlowArrow)"
              />
            )}
          </g>
        ))}
        <defs>
          <marker id="esimFlowArrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#B4472B" />
          </marker>
        </defs>
        <text x="6" y="78" className="font-mono" fontSize="9" fill="#4A5170">
          物理SIMの抜き差しや店頭での契約手続きは不要
        </text>
      </svg>
      <figcaption className="mt-2 text-center font-mono text-[11px] text-ink-soft">
        現地に着く前に、スマホひとつで通信の準備が完了する
      </figcaption>
    </figure>
  );
}
