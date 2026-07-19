// 「録音→文字起こし→要約」の流れを示す挿絵。MDX内で <RecordFlowDiagram /> の形で使用する。
export default function RecordFlowDiagram() {
  const steps = [
    { x: 10, label: "① 録音" },
    { x: 115, label: "② 文字起こし" },
    { x: 220, label: "③ AI要約" },
  ];
  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <svg viewBox="0 0 300 90" className="w-full" role="img" aria-label="録音から要約までの流れを示す図">
        {steps.map((s, i) => (
          <g key={s.label}>
            <rect x={s.x} y="15" width="75" height="40" rx="4" fill="none" stroke="#356156" strokeWidth="2" />
            <text x={s.x + 37.5} y="39" textAnchor="middle" className="font-body" fontSize="10" fill="#20263B">
              {s.label}
            </text>
            {i < steps.length - 1 && (
              <line
                x1={s.x + 80}
                y1="35"
                x2={s.x + 105}
                y2="35"
                stroke="#B4472B"
                strokeWidth="2"
                markerEnd="url(#flowArrow)"
              />
            )}
          </g>
        ))}
        <defs>
          <marker id="flowArrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#B4472B" />
          </marker>
        </defs>
        <text x="10" y="78" className="font-mono" fontSize="9" fill="#4A5170">
          聞きながらメモを取る必要がなくなる
        </text>
      </svg>
      <figcaption className="mt-2 text-center font-mono text-[11px] text-ink-soft">
        録音するだけで、あとの2工程はAIが自動で行う
      </figcaption>
    </figure>
  );
}
