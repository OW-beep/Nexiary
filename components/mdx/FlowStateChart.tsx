// パズルに没頭していく集中度の高まりと、スマホをだらだら見る場合の
// 集中パターンの違いを示す挿絵。MDX内で <FlowStateChart /> の形で使用する。
export default function FlowStateChart() {
  const puzzlePoints = "10,85 60,75 110,55 160,35 210,25 260,20 290,18";
  const phonePoints = "10,60 40,40 60,70 90,45 110,68 140,42 160,66 190,44 220,64 250,46 290,62";
  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <svg viewBox="0 0 300 110" className="w-full" role="img" aria-label="パズルとスマホ視聴の集中パターンの違いを示すグラフ">
        <line x1="10" y1="95" x2="290" y2="95" stroke="#D8D3C4" strokeWidth="1" />
        <text x="10" y="15" className="font-mono" fontSize="8" fill="#356156">
          パズルなど没頭できる作業
        </text>
        <polyline points={puzzlePoints} fill="none" stroke="#356156" strokeWidth="2.5" />

        <text x="180" y="15" className="font-mono" fontSize="8" fill="#B4472B">
          スマホをだらだら見る時間
        </text>
        <polyline points={phonePoints} fill="none" stroke="#B4472B" strokeWidth="2" strokeDasharray="3 2" />

        <text x="10" y="107" className="font-mono" fontSize="8" fill="#4A5170">
          時間経過 →
        </text>
      </svg>
      <figcaption className="mt-2 text-center font-mono text-[11px] text-ink-soft">
        没頭できる作業は集中度がなだらかに高まっていくのに対し、細切れの情報摂取は浮き沈みを繰り返しやすい
      </figcaption>
    </figure>
  );
}
