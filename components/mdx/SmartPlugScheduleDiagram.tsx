// 「就寝中は自動オフ、起床前に自動オン」というタイマー活用イメージを24時間の帯グラフで見せる挿絵。
// 他の挿絵（アイコン繰り返し・Before/After・フロー図・シルエット比較）とは
// 「時間帯の切り替わり」という表現で差別化している。
// MDX内で <SmartPlugScheduleDiagram /> の形で使用する。
export default function SmartPlugScheduleDiagram() {
  const segments = [
    { start: 0, end: 26, label: "在宅・使用中", on: true },
    { start: 26, end: 68, label: "就寝中は自動オフ", on: false },
    { start: 68, end: 100, label: "起床前に自動オン", on: true },
  ];

  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <p className="font-display text-base text-ink">タイマー設定のイメージ（電気毛布の例）</p>
      <div className="mt-6">
        <svg viewBox="0 0 320 40" className="w-full" role="img" aria-label="1日の自動オンオフスケジュールを示す帯グラフ">
          {segments.map((s) => (
            <rect
              key={s.label}
              x={(s.start / 100) * 320}
              y="4"
              width={((s.end - s.start) / 100) * 320}
              height="20"
              fill={s.on ? "#B4472B" : "#D8D2C4"}
              opacity={s.on ? 0.85 : 1}
            />
          ))}
        </svg>
        <div className="mt-3 flex flex-wrap justify-between gap-2">
          {segments.map((s) => (
            <span key={s.label} className="font-mono text-[11px] text-ink-soft">
              {s.label}
            </span>
          ))}
        </div>
      </div>
      <figcaption className="mt-4 text-center font-mono text-[11px] text-ink-soft">
        時刻はあくまで一例です。実際は生活リズムに合わせてアプリから自由に設定します。
      </figcaption>
    </figure>
  );
}
