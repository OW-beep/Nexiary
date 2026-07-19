// 紛失防止タグ（BLEビーコン）が離れたことを知らせる仕組みを示す挿絵。
// 3ステップを横一列に並べたシンプルな構成にして、ラベル同士の干渉を避けている。
// MDX内で <BeaconNetworkDiagram /> の形で使用する。
export default function BeaconNetworkDiagram() {
  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <svg viewBox="0 0 300 190" className="w-full" role="img" aria-label="紛失防止タグの通知の仕組みを示す図">
        {/* ステップ1：財布が手元から離れる */}
        <rect x="25" y="20" width="40" height="28" rx="5" fill="none" stroke="#B4472B" strokeWidth="2" />
        <circle cx="45" cy="12" r="7" fill="none" stroke="#B4472B" strokeWidth="1.5" strokeDasharray="2 2" />
        <text x="45" y="80" textAnchor="middle" className="font-mono" fontSize="9" fill="#4A5170">
          <tspan x="45" dy="0">① 財布が手元から</tspan>
          <tspan x="45" dy="13">離れる</tspan>
        </text>

        <line x1="90" y1="34" x2="120" y2="34" stroke="#D8D3C4" strokeWidth="2" markerEnd="url(#beaconArrow)" />
        <defs>
          <marker id="beaconArrow" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto">
            <path d="M0,0 L5,2.5 L0,5 Z" fill="#D8D3C4" />
          </marker>
        </defs>

        {/* ステップ2：自分のスマホに通知 */}
        <circle cx="150" cy="34" r="18" fill="none" stroke="#20263B" strokeWidth="2" />
        <text x="150" y="80" textAnchor="middle" className="font-mono" fontSize="9" fill="#4A5170">
          <tspan x="150" dy="0">② 自分のスマホに</tspan>
          <tspan x="150" dy="13">通知が届く</tspan>
        </text>

        <line x1="180" y1="34" x2="210" y2="34" stroke="#D8D3C4" strokeWidth="2" markerEnd="url(#beaconArrow)" />

        {/* ステップ3：他ユーザーのスマホが検知 */}
        <circle cx="240" cy="34" r="18" fill="none" stroke="#356156" strokeWidth="2" />
        <text x="240" y="80" textAnchor="middle" className="font-mono" fontSize="9" fill="#4A5170">
          <tspan x="240" dy="0">③ 他ユーザーの</tspan>
          <tspan x="240" dy="13">スマホが検知</tspan>
        </text>

        <line x1="15" y1="110" x2="285" y2="110" stroke="#D8D3C4" strokeWidth="1" />

        <text x="150" y="135" textAnchor="middle" className="font-body" fontSize="10" fill="#356156">
          <tspan x="150" dy="0">屋外で見失った場合も、近くを通った</tspan>
          <tspan x="150" dy="16">他ユーザーのスマホが位置検知を助けてくれる</tspan>
        </text>
      </svg>
      <figcaption className="mt-2 text-center font-mono text-[11px] text-ink-soft">
        自分のスマホの電波が届かない場所でも、クラウドソーシング型の探索網が手がかりになる
      </figcaption>
    </figure>
  );
}
