// 「部屋全体をカバーする大型加湿器」と「自分の周辺だけをピンポイントで加湿する卓上加湿器」の
// カバー範囲の違いを、同心円の大きさで示す挿絵。他の挿絵（横スケール・断面比較等）とは
// 「カバー範囲の円の大きさ対比」という表現で差別化している。
// MDX内で <HumidifyRangeDiagram /> の形で使用する。
export default function HumidifyRangeDiagram() {
  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <p className="font-display text-base text-ink">加湿がカバーする範囲（イメージ）</p>
      <div className="mt-6 flex items-end justify-center gap-10">
        <div className="flex flex-col items-center gap-2">
          <svg width="140" height="120" viewBox="0 0 140 120" aria-hidden="true">
            <circle cx="70" cy="70" r="46" fill="#356156" opacity="0.1" stroke="#356156" strokeWidth="2" />
            <rect x="58" y="58" width="24" height="24" rx="3" fill="#4A5170" />
          </svg>
          <span className="font-mono text-[11px] text-ink-soft">大型加湿器：部屋全体</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <svg width="140" height="120" viewBox="0 0 140 120" aria-hidden="true">
            <circle cx="70" cy="70" r="20" fill="#B4472B" opacity="0.15" stroke="#B4472B" strokeWidth="2" />
            <rect x="62" y="62" width="16" height="16" rx="2" fill="#4A5170" />
          </svg>
          <span className="font-mono text-[11px] text-ink-soft">卓上加湿器：自分の周辺のみ</span>
        </div>
      </div>
      <figcaption className="mt-4 text-center font-mono text-[11px] text-ink-soft">
        デスク・ベッドサイド・車内など、近い距離で使うほど効果を実感しやすい。
      </figcaption>
    </figure>
  );
}
