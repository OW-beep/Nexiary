// モニターアームの取り付け手順（クランプ固定→アーム接続→モニター取付→角度調整）を示す挿絵。
// 既存のEsimSetupFlowDiagram等と同じ「フロー図」表現だが、ステップ数と内容が異なる独自デザイン。
// MDX内で <MonitorArmSetupDiagram /> の形で使用する。
export default function MonitorArmSetupDiagram() {
  const steps = [
    { x: 4, label: "① クランプ固定" },
    { x: 108, label: "② アーム接続" },
    { x: 212, label: "③ モニター取付" },
    { x: 316, label: "④ 角度調整" },
  ];
  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <svg viewBox="0 0 400 90" className="w-full" role="img" aria-label="モニターアームの取り付け手順を示す図">
        {steps.map((s, i) => (
          <g key={s.label}>
            <rect x={s.x} y="15" width="92" height="40" rx="4" fill="none" stroke="#356156" strokeWidth="2" />
            <text x={s.x + 46} y="39" textAnchor="middle" className="font-body" fontSize="9" fill="#20263B">
              {s.label}
            </text>
            {i < steps.length - 1 && (
              <line
                x1={s.x + 97}
                y1="35"
                x2={s.x + 103}
                y2="35"
                stroke="#B4472B"
                strokeWidth="2"
                markerEnd="url(#armFlowArrow)"
              />
            )}
          </g>
        ))}
        <defs>
          <marker id="armFlowArrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#B4472B" />
          </marker>
        </defs>
      </svg>
      <figcaption className="mt-2 text-center font-mono text-[11px] text-ink-soft">
        最後の角度調整（ネジの締め具合）で仕上がりが大きく変わる、つまずきやすいポイント
      </figcaption>
    </figure>
  );
}
