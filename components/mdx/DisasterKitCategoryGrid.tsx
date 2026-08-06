// 47点セットの中身を「寝る・灯る・知る・清潔・食べる」の5カテゴリに分けて、
// アイコンと点数で示す挿絵。他の挿絵（棒グラフ・グロー・循環矢印等）とは
// 「カテゴリ別グリッド」という表現で差別化している。
// MDX内で <DisasterKitCategoryGrid /> の形で使用する。
export default function DisasterKitCategoryGrid() {
  const categories = [
    { label: "寝る", detail: "シュラフ・エアーベッド" },
    { label: "灯る", detail: "防災ラジオライト・ランタン" },
    { label: "知る・繋がる", detail: "充電器" },
    { label: "清潔", detail: "非常用トイレ10回分" },
    { label: "食べる", detail: "保存食・保存水（最低限）" },
  ];

  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <p className="font-display text-base text-ink">47点セットの中身（カテゴリ別）</p>
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {categories.map((c) => (
          <div key={c.label} className="flex items-start gap-3 rounded-card border border-line bg-paper px-3 py-2.5">
            <span className="index-tab shrink-0">{c.label}</span>
            <span className="font-mono text-[11px] leading-relaxed text-ink-soft">{c.detail}</span>
          </div>
        ))}
      </div>
      <figcaption className="mt-4 text-center font-mono text-[11px] text-ink-soft">
        「食べる」だけは最低限の量なので、別途買い足しておくと安心。
      </figcaption>
    </figure>
  );
}
