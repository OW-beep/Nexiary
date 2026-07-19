// 光触媒による「分解・除去」と、一般的なフィルターの「捕集」の違いを示す挿絵。
// MDX内で <PhotocatalystDiagram /> の形で使用する。
export default function PhotocatalystDiagram() {
  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <svg viewBox="0 0 300 130" className="w-full" role="img" aria-label="光触媒とフィルター式の違いを示す図">
        <text x="15" y="18" className="font-mono" fontSize="9" fill="#4A5170">
          一般的なフィルター式
        </text>
        <rect x="15" y="26" width="110" height="40" rx="3" fill="none" stroke="#B4472B" strokeWidth="2" />
        {[30, 45, 60, 75, 90, 105].map((x, i) => (
          <circle key={i} cx={x} cy={40 + (i % 2) * 15} r="3" fill="#B4472B" />
        ))}
        <text x="15" y="82" className="font-body" fontSize="9" fill="#B4472B">
          → 汚れが蓄積し、定期交換が必要
        </text>

        <text x="160" y="18" className="font-mono" fontSize="9" fill="#4A5170">
          光触媒（光除菌）式
        </text>
        <rect x="160" y="26" width="125" height="40" rx="3" fill="none" stroke="#356156" strokeWidth="2" />
        <line x1="170" y1="30" x2="270" y2="60" stroke="#E8A33D" strokeWidth="2" strokeDasharray="3 2" />
        <text x="172" y="28" className="font-mono" fontSize="7" fill="#E8A33D">
          光
        </text>
        <circle cx="270" cy="60" r="4" fill="none" stroke="#356156" strokeWidth="1.5" strokeDasharray="1 1" />
        <text x="160" y="82" className="font-body" fontSize="9" fill="#356156">
          → その場で分解・除去される
        </text>

        <text x="15" y="108" className="font-mono" fontSize="8" fill="#4A5170">
          <tspan x="15" dy="0">光が触媒（酸化チタン等）に当たると、化学反応で</tspan>
          <tspan x="15" dy="12">ウイルスや菌、ニオイのもとを分解する</tspan>
        </text>
      </svg>
      <figcaption className="mt-2 text-center font-mono text-[11px] text-ink-soft">
        フィルターに「溜める」方式と、光の力でその場で「分解する」方式の違い
      </figcaption>
    </figure>
  );
}
