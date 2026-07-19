// モニターの応答速度による見え方の違い（残像＝ゴースト）を説明する挿絵。
// MDX内で <ResponseTimeDiagram /> の形で使用する。
export default function ResponseTimeDiagram() {
  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <svg viewBox="0 0 300 140" className="w-full" role="img" aria-label="応答速度による残像の違いを示す図">
        <text x="15" y="20" className="font-mono" fontSize="11" fill="#4A5170">
          応答速度が遅い（残像＝ゴーストが出る）
        </text>
        {[0, 14, 28, 42].map((dx, i) => (
          <rect
            key={i}
            x={30 + dx}
            y="35"
            width="26"
            height="26"
            rx="3"
            fill="#B4472B"
            opacity={0.18 + i * 0.22}
          />
        ))}
        <text x="180" y="52" className="font-body" fontSize="11" fill="#20263B">
          → 動きがブレて見える
        </text>

        <line x1="10" y1="80" x2="290" y2="80" stroke="#D8D3C4" strokeWidth="1" />

        <text x="15" y="102" className="font-mono" fontSize="11" fill="#4A5170">
          応答速度が速い（1msクラス）
        </text>
        <rect x="30" y="112" width="26" height="26" rx="3" fill="#356156" />
        <text x="90" y="130" className="font-body" fontSize="11" fill="#20263B">
          → くっきり止まって見える
        </text>
      </svg>
      <figcaption className="mt-2 text-center font-mono text-[11px] text-ink-soft">
        応答速度が遅いと、動いている物体の輪郭が尾を引くように見える「ゴースト」が発生しやすい
      </figcaption>
    </figure>
  );
}
