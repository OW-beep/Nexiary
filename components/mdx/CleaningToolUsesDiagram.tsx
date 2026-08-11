// 7in1クリーニングツールの各パーツが「どこの掃除に使えるか」を、
// 対象アイテム（キーボード・イヤホン・スマホ等）のアイコン列で示す挿絵。
// 他の挿絵（ゲージ・グロー・回転矢印等）とは「用途アイコンの一覧」という表現で差別化している。
// MDX内で <CleaningToolUsesDiagram /> の形で使用する。
export default function CleaningToolUsesDiagram() {
  const uses = [
    "キーボードの隙間",
    "キーキャップの取り外し",
    "AirPods・イヤホンの溝",
    "スマホのポート周り",
  ];

  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <p className="font-display text-base text-ink">1つで4つの掃除に使える</p>
      <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {uses.map((u) => (
          <div key={u} className="flex items-center gap-3 rounded-card border border-line bg-paper px-3 py-2.5">
            <span className="h-2 w-2 shrink-0 rounded-full bg-stamp" />
            <span className="font-mono text-[11px] text-ink-soft">{u}</span>
          </div>
        ))}
      </div>
      <figcaption className="mt-4 text-center font-mono text-[11px] text-ink-soft">
        7つのパーツがあるが、実際によく使うのはこの4用途が中心。
      </figcaption>
    </figure>
  );
}
