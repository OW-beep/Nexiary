// ペン先を「反時計回りに回して外す→新しいペン先を時計回りに取り付ける」という
// 交換手順を、回転矢印付きのペン先アイコンで示す挿絵。他の挿絵（直線フロー矢印・ゲージ・
// 配列比較図）とは「回転動作」という表現で差別化している。
// MDX内で <PencilTipSwapDiagram /> の形で使用する。
export default function PencilTipSwapDiagram() {
  const steps = [
    { label: "① 反時計回りに回して外す", dir: -1 },
    { label: "② 新しいペン先を時計回りに取り付ける", dir: 1 },
  ];

  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <p className="font-display text-base text-ink">ペン先の交換手順</p>
      <div className="mt-6 flex flex-col gap-8 sm:flex-row sm:justify-center sm:gap-16">
        {steps.map((s) => (
          <div key={s.label} className="flex flex-col items-center gap-2">
            <svg width="90" height="90" viewBox="0 0 90 90" aria-hidden="true">
              <circle cx="45" cy="45" r="34" fill="none" stroke="#D8D3C4" strokeWidth="2" />
              <path
                d={
                  s.dir > 0
                    ? "M45,14 A31,31 0 1 1 20,30"
                    : "M45,14 A31,31 0 1 0 70,30"
                }
                fill="none"
                stroke="#B4472B"
                strokeWidth="4"
                strokeLinecap="round"
                markerEnd="url(#pencilArrow)"
              />
              <rect x="41" y="40" width="8" height="24" rx="2" fill="#4A5170" />
              <polygon points="45,34 41,42 49,42" fill="#4A5170" />
              <defs>
                <marker id="pencilArrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                  <path d="M0,0 L8,4 L0,8 Z" fill="#B4472B" />
                </marker>
              </defs>
            </svg>
            <span className="max-w-[10rem] text-center font-mono text-[11px] text-ink-soft">{s.label}</span>
          </div>
        ))}
      </div>
      <figcaption className="mt-4 text-center font-mono text-[11px] text-ink-soft">
        指でつまんで回すだけの簡単な作業です。工具は不要です。
      </figcaption>
    </figure>
  );
}
