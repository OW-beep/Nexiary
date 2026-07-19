// ANC（逆位相の音をぶつけてノイズを打ち消す仕組み）を視覚的に説明する図解。
// 記事本文の説明と対応させるための挿絵として、MDX内で <AncWaveDiagram /> の形で使用する。
export default function AncWaveDiagram() {
  const wave = (offset: number, amp: number, phase: number) => {
    const points: string[] = [];
    for (let x = 0; x <= 280; x += 4) {
      const y = amp * Math.sin((x / 280) * Math.PI * 4 + phase);
      points.push(`${x},${offset + y}`);
    }
    return points.join(" ");
  };

  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <svg viewBox="0 0 300 220" className="w-full" role="img" aria-label="ノイズキャンセリングの仕組みを示す波形図">
        {/* 周囲の騒音の波形 */}
        <text x="10" y="20" className="font-mono" fontSize="11" fill="#4A5170">
          ① 周囲の騒音
        </text>
        <polyline points={wave(45, 20, 0)} fill="none" stroke="#B4472B" strokeWidth="2" />

        {/* 逆位相の波形 */}
        <text x="10" y="95" className="font-mono" fontSize="11" fill="#4A5170">
          ② 逆位相の音（イヤホンが生成）
        </text>
        <polyline points={wave(120, 20, Math.PI)} fill="none" stroke="#356156" strokeWidth="2" />

        {/* 打ち消された結果 */}
        <text x="10" y="170" className="font-mono" fontSize="11" fill="#4A5170">
          ③ 打ち消し合って静かに
        </text>
        <line x1="10" y1="195" x2="290" y2="195" stroke="#20263B" strokeWidth="2" />
      </svg>
      <figcaption className="mt-2 text-center font-mono text-[11px] text-ink-soft">
        ①の波形と、山と谷が逆転した②の波形を重ねると、③のようにほぼ平らになる（打ち消し合う）
      </figcaption>
    </figure>
  );
}
