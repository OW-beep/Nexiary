// 耳のサイズ差とイヤーチップのフィットを示す挿絵。MDX内で <EarFitDiagram /> の形で使用する。
export default function EarFitDiagram() {
  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <svg viewBox="0 0 300 120" className="w-full" role="img" aria-label="耳の大きさとイヤーチップのフィットの違いを示す図">
        {[
          { cx: 70, r: 22, label: "小さめの耳道", tipR: 10 },
          { cx: 150, r: 28, label: "標準的な耳道", tipR: 13 },
          { cx: 230, r: 34, label: "大きめの耳道", tipR: 16 },
        ].map((e) => (
          <g key={e.label}>
            <circle cx={e.cx} cy="55" r={e.r} fill="none" stroke="#20263B" strokeWidth="2" />
            <circle cx={e.cx} cy="55" r={e.tipR} fill="#B4472B" opacity="0.5" />
            <text x={e.cx} y="100" textAnchor="middle" className="font-mono" fontSize="9" fill="#4A5170">
              {e.label}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="mt-2 text-center font-mono text-[11px] text-ink-soft">
        耳道の大きさには個人差があり、同じイヤーチップでも人によってフィット感は変わる
      </figcaption>
    </figure>
  );
}
