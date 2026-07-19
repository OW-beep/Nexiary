// レーザー彫刻が素材の表面を除去して模様を刻む仕組みを示す挿絵。
// MDX内で <LaserEngraveDiagram /> の形で使用する。
export default function LaserEngraveDiagram() {
  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <svg viewBox="0 0 300 130" className="w-full" role="img" aria-label="レーザー彫刻の仕組みを示す図">
        <rect x="40" y="15" width="26" height="18" rx="3" fill="#20263B" />
        <text x="20" y="12" className="font-mono" fontSize="8" fill="#4A5170">
          レーザーヘッド
        </text>
        <line x1="53" y1="33" x2="53" y2="70" stroke="#B4472B" strokeWidth="2" strokeDasharray="3 2" />

        <rect x="20" y="70" width="120" height="30" rx="2" fill="#E4EAE3" stroke="#356156" strokeWidth="1.5" />
        <path d="M45 70 L61 85 L45 100" fill="none" stroke="#B4472B" strokeWidth="2" />
        <text x="20" y="115" className="font-mono" fontSize="8" fill="#4A5170">
          木材・革・アクリルなど
        </text>

        <line x1="160" y1="60" x2="195" y2="60" stroke="#D8D3C4" strokeWidth="2" markerEnd="url(#laserArrow)" />
        <defs>
          <marker id="laserArrow" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto">
            <path d="M0,0 L5,2.5 L0,5 Z" fill="#D8D3C4" />
          </marker>
        </defs>

        <rect x="205" y="45" width="80" height="55" rx="3" fill="#F4F2EC" stroke="#20263B" strokeWidth="1.5" />
        <path d="M225 60 L245 78 L225 96" fill="none" stroke="#356156" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="200" y="115" className="font-mono" fontSize="8" fill="#356156">
          焦げ跡や凹凸で模様が残る
        </text>
      </svg>
      <figcaption className="mt-2 text-center font-mono text-[11px] text-ink-soft">
        レーザーの熱で表面のごく薄い層を焼き飛ばし・除去することで、跡が模様として残る
      </figcaption>
    </figure>
  );
}
