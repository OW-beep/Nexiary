// 板タブ（手元で描いた線がモニターに反映される仕組み）を説明する挿絵。
// MDX内で <PenTabletDiagram /> の形で使用する。
export default function PenTabletDiagram() {
  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <svg viewBox="0 0 300 170" className="w-full" role="img" aria-label="ペンタブレットとモニターの連動を示す図">
        {/* タブレット */}
        <rect x="15" y="55" width="110" height="60" rx="4" fill="none" stroke="#20263B" strokeWidth="2" />
        <path d="M35 95 C 50 75, 65 100, 85 80" fill="none" stroke="#B4472B" strokeWidth="2" />
        <circle cx="85" cy="80" r="3" fill="#B4472B" />
        <text x="15" y="135" className="font-mono" fontSize="9" fill="#4A5170">
          <tspan x="15" dy="0">① 手元のタブレットに</tspan>
          <tspan x="15" dy="13">　ペンを走らせる</tspan>
        </text>

        {/* 矢印 */}
        <line x1="135" y1="85" x2="170" y2="85" stroke="#356156" strokeWidth="2" markerEnd="url(#pentabArrow)" />
        <defs>
          <marker id="pentabArrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#356156" />
          </marker>
        </defs>

        {/* モニター */}
        <rect x="180" y="20" width="105" height="70" rx="4" fill="none" stroke="#20263B" strokeWidth="2" />
        <rect x="222" y="90" width="20" height="10" fill="#20263B" />
        <path d="M200 60 C 215 40, 230 65, 250 45" fill="none" stroke="#B4472B" strokeWidth="2" />
        <circle cx="250" cy="45" r="3" fill="#B4472B" />
        <text x="170" y="135" className="font-mono" fontSize="9" fill="#4A5170">
          <tspan x="170" dy="0">② 同じ線がモニターに</tspan>
          <tspan x="170" dy="13">　描かれる</tspan>
        </text>
      </svg>
      <figcaption className="mt-2 text-center font-mono text-[11px] text-ink-soft">
        板タブは手元と画面が分かれているぶん低価格。慣れると自然に視線を画面に保ったまま描けるようになる
      </figcaption>
    </figure>
  );
}
