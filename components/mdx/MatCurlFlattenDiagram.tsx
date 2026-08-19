// ロール状で届いた直後の「巻きぐせ」が、重しを置いて数日置くことで平らになっていく様子を
// カーブ線の変化で示す挿絵。他の挿絵（横スケール・ストラップの輪等）とは
// 「巻きぐせが伸びていく時間経過」という表現で差別化している。
// MDX内で <MatCurlFlattenDiagram /> の形で使用する。
export default function MatCurlFlattenDiagram() {
  const states = [
    { label: "開封直後", curl: 30 },
    { label: "重しを置いて数日", curl: 6 },
  ];

  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <p className="font-display text-base text-ink">巻きぐせが取れるまで</p>
      <div className="mt-6 flex justify-center gap-12">
        {states.map((s) => (
          <div key={s.label} className="flex flex-col items-center gap-2">
            <svg width="130" height="60" viewBox="0 0 130 60" aria-hidden="true">
              <path
                d={`M10,${40 - s.curl} Q65,${40 + s.curl} 120,${40 - s.curl}`}
                fill="none"
                stroke="#356156"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <line x1="10" y1="50" x2="120" y2="50" stroke="#D8D3C4" strokeWidth="2" />
            </svg>
            <span className="font-mono text-[11px] text-ink-soft">{s.label}</span>
          </div>
        ))}
      </div>
      <figcaption className="mt-4 text-center font-mono text-[11px] text-ink-soft">
        本や重しを置いて数日置くと、普段使う分には気にならない程度に平らになる。
      </figcaption>
    </figure>
  );
}
