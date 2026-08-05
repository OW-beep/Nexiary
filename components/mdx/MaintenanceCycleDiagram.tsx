// 「2〜3ヶ月に1回の充電・動作確認」という推奨メンテナンス周期を、循環矢印で示す挿絵。
// 他の挿絵（吹き出し・Before/After・ゲージ等）とは「周期・循環」という表現で差別化している。
// MDX内で <MaintenanceCycleDiagram /> の形で使用する。
export default function MaintenanceCycleDiagram() {
  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <p className="font-display text-base text-ink">推奨メンテナンス周期</p>
      <svg viewBox="0 0 200 200" className="mx-auto mt-4 w-full max-w-[220px]" role="img" aria-label="2〜3ヶ月に1回の充電・動作確認の循環イメージ">
        <circle cx="100" cy="100" r="70" fill="none" stroke="#D8D3C4" strokeWidth="3" />
        <path
          d="M100,30 A70,70 0 1 1 46,55"
          fill="none"
          stroke="#356156"
          strokeWidth="4"
          strokeLinecap="round"
          markerEnd="url(#cycleArrow)"
        />
        <defs>
          <marker id="cycleArrow" markerWidth="9" markerHeight="9" refX="5" refY="4.5" orient="auto">
            <path d="M0,0 L9,4.5 L0,9 Z" fill="#356156" />
          </marker>
        </defs>
        <text x="100" y="95" textAnchor="middle" className="font-display" fontSize="20" fill="#20263B">
          2〜3ヶ月
        </text>
        <text x="100" y="118" textAnchor="middle" className="font-mono" fontSize="11" fill="#4A5170">
          に1回、充電＆動作確認
        </text>
      </svg>
      <figcaption className="mt-2 text-center font-mono text-[11px] text-ink-soft">
        「買って終わり」ではなく、定期チェックまでセットで防災用品といえる。
      </figcaption>
    </figure>
  );
}
