// アルファ化米を「お湯で戻す場合」と「水で戻す場合」の調理時間の違いを、
// 時計アイコンと分数表示で示す挿絵。他の挿絵（円のカバー範囲・手の厚み比較等）とは
// 「調理時間の長短」という表現で差別化している。
// MDX内で <AlphaRiceCookTimeDiagram /> の形で使用する。
export default function AlphaRiceCookTimeDiagram() {
  const methods = [
    { label: "お湯で戻す場合", minutes: "約15〜20分", angle: 250 },
    { label: "水で戻す場合", minutes: "約60分", angle: 60 },
  ];

  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <p className="font-display text-base text-ink">戻し方による時間の目安</p>
      <div className="mt-6 flex justify-center gap-12">
        {methods.map((m) => (
          <div key={m.label} className="flex flex-col items-center gap-2">
            <svg width="70" height="70" viewBox="0 0 70 70" aria-hidden="true">
              <circle cx="35" cy="35" r="28" fill="none" stroke="#4A5170" strokeWidth="3" />
              <line x1="35" y1="35" x2="35" y2="14" stroke="#4A5170" strokeWidth="3" strokeLinecap="round" />
              <line
                x1="35"
                y1="35"
                x2={35 + 18 * Math.cos((Math.PI / 180) * (m.angle - 90))}
                y2={35 + 18 * Math.sin((Math.PI / 180) * (m.angle - 90))}
                stroke="#B4472B"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
            <span className="font-mono text-[11px] text-ink-soft">{m.label}</span>
            <span className="font-display text-sm text-ink">{m.minutes}</span>
          </div>
        ))}
      </div>
      <figcaption className="mt-4 text-center font-mono text-[11px] text-ink-soft">
        一般的なアルファ化米の目安です。商品ごとの表示時間に従ってください。
      </figcaption>
    </figure>
  );
}
