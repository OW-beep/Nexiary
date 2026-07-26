// 「貼る前は熱い、貼った後はあたたかい程度まで和らぐ」という体感の変化を、
// 温度計風の2状態比較で見せる挿絵。他の挿絵（アイコン繰り返し・シルエット比較・フロー図）とは
// 「Before/After比較」という表現で差別化している。
// MDX内で <CoolingPadEffectDiagram /> の形で使用する。
export default function CoolingPadEffectDiagram() {
  const states = [
    { label: "貼る前", fill: 78, color: "#B4472B", note: "熱い" },
    { label: "貼った後", fill: 45, color: "#356156", note: "あたたかい" },
  ];

  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <p className="font-display text-base text-ink">体感温度の変化（イメージ）</p>
      <div className="mt-6 flex items-end justify-center gap-10">
        {states.map((s) => (
          <div key={s.label} className="flex flex-col items-center gap-2">
            <svg width="36" height="110" viewBox="0 0 36 110" aria-hidden="true">
              <rect x="12" y="6" width="12" height="80" rx="6" fill="none" stroke="#4A5170" strokeWidth="2" />
              <circle cx="18" cy="94" r="12" fill="none" stroke="#4A5170" strokeWidth="2" />
              <rect
                x="14"
                y={86 - s.fill * 0.75}
                width="8"
                height={s.fill * 0.75 + 8}
                rx="4"
                fill={s.color}
                opacity="0.85"
              />
              <circle cx="18" cy="94" r="8" fill={s.color} opacity="0.85" />
            </svg>
            <span className="font-mono text-[11px] text-ink-soft">{s.label}</span>
            <span className="font-display text-sm text-ink">{s.note}</span>
          </div>
        ))}
      </div>
      <figcaption className="mt-4 text-center font-mono text-[11px] text-ink-soft">
        完全に冷やすのではなく「これ以上熱くならないよう抑える」体感に近い、という個人の使用感イメージです。
      </figcaption>
    </figure>
  );
}
