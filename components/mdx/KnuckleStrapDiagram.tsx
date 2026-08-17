// ナックルストラップが手首・指に沿って輪になり、激しい動きでもコントローラーが飛んでいかない
// イメージを、手のシルエットとストラップの輪で示す挿絵。他の挿絵（横スケール・円のカバー範囲等）とは
// 「手とストラップの輪」という表現で差別化している。
// MDX内で <KnuckleStrapDiagram /> の形で使用する。
export default function KnuckleStrapDiagram() {
  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <p className="font-display text-base text-ink">ナックルストラップの役割</p>
      <svg viewBox="0 0 260 130" className="mx-auto mt-4 w-full max-w-xs" role="img" aria-label="ナックルストラップが手に沿って輪になり、激しい動きでも落下を防ぐイメージ">
        <ellipse cx="130" cy="70" rx="46" ry="30" fill="none" stroke="#B4472B" strokeWidth="4" strokeDasharray="2 5" />
        <rect x="104" y="50" width="52" height="66" rx="16" fill="#4A5170" opacity="0.15" stroke="#4A5170" strokeWidth="2" />
        <path
          d="M60,70 Q40,40 70,20"
          fill="none"
          stroke="#356156"
          strokeWidth="3"
          strokeLinecap="round"
          markerEnd="url(#strapArrow)"
        />
        <defs>
          <marker id="strapArrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#356156" />
          </marker>
        </defs>
        <text x="20" y="18" className="font-mono" fontSize="10" fill="#356156">
          激しい動きでも
        </text>
        <text x="20" y="30" className="font-mono" fontSize="10" fill="#356156">
          手から離れにくい
        </text>
      </svg>
      <figcaption className="mt-2 text-center font-mono text-[11px] text-ink-soft">
        手首・指に沿って固定されるため、コントローラーを強く握り続ける必要が減る。
      </figcaption>
    </figure>
  );
}
