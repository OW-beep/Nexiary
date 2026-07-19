// 「規則的な報酬」と「不規則な報酬」のタイミングの違いを示す挿絵。
// MDX内で <RewardScheduleChart /> の形で使用する。
export default function RewardScheduleChart() {
  const regular = [20, 60, 100, 140, 180, 220, 260];
  const irregular = [15, 35, 100, 115, 190, 200, 270];
  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <svg viewBox="0 0 300 110" className="w-full" role="img" aria-label="規則的な報酬と不規則な報酬のタイミングの違いを示す図">
        <text x="10" y="20" className="font-mono" fontSize="9" fill="#4A5170">
          規則的な報酬（毎回同じ間隔）
        </text>
        <line x1="10" y1="35" x2="290" y2="35" stroke="#D8D3C4" strokeWidth="1" />
        {regular.map((x) => (
          <circle key={x} cx={x} cy="35" r="5" fill="#356156" />
        ))}

        <text x="10" y="70" className="font-mono" fontSize="9" fill="#4A5170">
          不規則な報酬（次がいつ来るかわからない）
        </text>
        <line x1="10" y1="85" x2="290" y2="85" stroke="#D8D3C4" strokeWidth="1" />
        {irregular.map((x) => (
          <circle key={x} cx={x} cy="85" r="5" fill="#B4472B" />
        ))}
      </svg>
      <figcaption className="mt-2 text-center font-mono text-[11px] text-ink-soft">
        次がいつ来るか予測できない報酬のほうが、行動をやめにくくなるとされる
      </figcaption>
    </figure>
  );
}
