// 回線の混雑耐性（アンテナ本数のイメージ）の違いを示す挿絵。
// MDX内で <SignalCongestionDiagram /> の形で使用する。
export default function SignalCongestionDiagram() {
  const bars = (heights: number[], color: string, startX: number) =>
    heights.map((h, i) => (
      <rect
        key={i}
        x={startX + i * 14}
        y={60 - h}
        width="9"
        height={h}
        fill={color}
      />
    ));

  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <svg viewBox="0 0 300 130" className="w-full" role="img" aria-label="回線混雑時の速度の違いを示す図">
        <text x="10" y="20" className="font-mono" fontSize="9" fill="#4A5170">
          混雑する時間帯（お昼・夜など）
        </text>
        <text x="10" y="75" className="font-mono" fontSize="9" fill="#4A5170">
          帯域の細い回線
        </text>
        {bars([15, 30, 45, 20, 10], "#B4472B", 130)}
        <text x="130" y="75" className="font-mono" fontSize="8" fill="#B4472B">
          速度が落ちやすい
        </text>

        <line x1="10" y1="90" x2="290" y2="90" stroke="#D8D3C4" strokeWidth="1" />

        <text x="10" y="115" className="font-mono" fontSize="9" fill="#4A5170">
          キャリア回線そのもの
        </text>
        {bars([45, 45, 45, 45, 45].map((h) => h), "#356156", 130)}
      </svg>
      <figcaption className="mt-2 text-center font-mono text-[11px] text-ink-soft">
        混雑する時間帯でも速度が落ちにくいかどうかは、使っている回線の種類によって変わる
      </figcaption>
    </figure>
  );
}
