// 単純な拡大（補間）とAI超解像の仕上がりの違いを示す挿絵。
// MDX内で <UpscaleDiagram /> の形で使用する。
export default function UpscaleDiagram() {
  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <svg viewBox="0 0 300 120" className="w-full" role="img" aria-label="従来の拡大とAI超解像の仕上がりの違いを示す図">
        <text x="15" y="18" className="font-mono" fontSize="9" fill="#4A5170">
          従来の拡大（補間）
        </text>
        {Array.from({ length: 6 }).map((_, i) => (
          <rect
            key={i}
            x={20 + (i % 3) * 22}
            y={26 + Math.floor(i / 3) * 22}
            width="18"
            height="18"
            fill="#B4472B"
            opacity={0.3 + (i % 3) * 0.2}
          />
        ))}
        <text x="20" y="90" className="font-body" fontSize="10" fill="#B4472B">
          → 輪郭がぼやける
        </text>

        <line x1="150" y1="10" x2="150" y2="100" stroke="#D8D3C4" strokeWidth="1" />

        <text x="170" y="18" className="font-mono" fontSize="9" fill="#4A5170">
          AI超解像
        </text>
        <path
          d="M170 30 Q185 26 200 32 T230 30"
          fill="none"
          stroke="#356156"
          strokeWidth="2.5"
        />
        <path
          d="M170 50 Q185 46 200 52 T230 50"
          fill="none"
          stroke="#356156"
          strokeWidth="2.5"
        />
        <path
          d="M170 70 Q185 66 200 72 T230 70"
          fill="none"
          stroke="#356156"
          strokeWidth="2.5"
        />
        <text x="170" y="95" className="font-body" fontSize="10" fill="#356156">
          → 輪郭を推測して補完
        </text>
      </svg>
      <figcaption className="mt-2 text-center font-mono text-[11px] text-ink-soft">
        AIが周辺のピクセルから元の模様を推測しながら描き足すことで、拡大しても輪郭が破綻しにくい
      </figcaption>
    </figure>
  );
}
