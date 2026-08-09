interface ScoreBreakdown {
  total: number;
  price: number;
  performance: number;
  usability: number;
  value: number;
  uniqueness: number;
}

const ITEMS: { key: keyof Omit<ScoreBreakdown, "total">; label: string }[] = [
  { key: "price", label: "価格" },
  { key: "performance", label: "性能" },
  { key: "usability", label: "使いやすさ" },
  { key: "value", label: "コスパ" },
  { key: "uniqueness", label: "独自性" },
];

// 記事のfrontmatter（nexiaryScore）から自動で描画されるスコアカード。
// MDX本文からは直接使わず、記事ページ側で <NexiaryScoreCard score={post.frontmatter.nexiaryScore} /> として呼ぶ。
// 「実測データ」ではなく編集部の主観評価であることを、常にキャプションで明示する。
export default function NexiaryScoreCard({ score }: { score: ScoreBreakdown }) {
  return (
    <div className="not-prose catalog-card my-6 p-5">
      <div className="flex items-baseline gap-3">
        <span className="index-tab">Nexiary Score</span>
        <span className="font-display text-3xl text-stamp">{score.total}</span>
        <span className="font-mono text-xs text-ink-soft">/ 100</span>
      </div>
      <div className="mt-4 flex flex-col gap-2.5">
        {ITEMS.map((item) => {
          const v = score[item.key];
          return (
            <div key={item.key} className="flex items-center gap-3">
              <span className="w-24 shrink-0 font-mono text-xs text-ink-soft">{item.label}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-line">
                <div className="h-full rounded-full bg-moss" style={{ width: `${(v / 20) * 100}%` }} />
              </div>
              <span className="w-10 shrink-0 text-right font-mono text-xs text-ink-soft">{v}/20</span>
            </div>
          );
        })}
      </div>
      <p className="mt-4 font-mono text-[11px] text-ink-soft">
        ※実測データではなく、実際に使用した編集部の主観評価です。判断の参考としてご利用ください。
      </p>
    </div>
  );
}
