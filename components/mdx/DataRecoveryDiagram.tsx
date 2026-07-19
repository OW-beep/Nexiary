// 「故障・水没」から「データ復旧」への変化をバッジ風に示す挿絵。
// 線画中心の他の図解とは違い、円形バッジと塗りつぶしアイコンで構成するテイスト。
// MDX内で <DataRecoveryDiagram /> の形で使用する。
export default function DataRecoveryDiagram() {
  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <svg viewBox="0 0 300 140" className="w-full" role="img" aria-label="故障端末からデータを復旧する流れを示す図">
        <circle cx="60" cy="55" r="38" fill="#B4472B" opacity="0.12" />
        <circle cx="60" cy="55" r="38" fill="none" stroke="#B4472B" strokeWidth="2" />
        <rect x="45" y="35" width="30" height="40" rx="4" fill="none" stroke="#B4472B" strokeWidth="2" />
        <line x1="48" y1="45" x2="72" y2="65" stroke="#B4472B" strokeWidth="2" />
        <line x1="72" y1="45" x2="48" y2="65" stroke="#B4472B" strokeWidth="2" />
        <text x="30" y="112" className="font-mono" fontSize="9" fill="#B4472B">
          <tspan x="30" dy="0">電源が入らない</tspan>
          <tspan x="30" dy="12">・水没・破損</tspan>
        </text>

        <path d="M110 55 L150 55" stroke="#20263B" strokeWidth="2" markerEnd="url(#recoveryArrow)" />
        <defs>
          <marker id="recoveryArrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#20263B" />
          </marker>
        </defs>
        <text x="108" y="35" className="font-mono" fontSize="8" fill="#4A5170">
          基板修理
        </text>

        <circle cx="230" cy="55" r="38" fill="#356156" opacity="0.12" />
        <circle cx="230" cy="55" r="38" fill="none" stroke="#356156" strokeWidth="2" />
        <path d="M214 55 L224 65 L246 40" fill="none" stroke="#356156" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <text x="195" y="112" className="font-mono" fontSize="9" fill="#356156">
          <tspan x="195" dy="0">写真・LINE・連絡先</tspan>
          <tspan x="195" dy="12">を取り戻す</tspan>
        </text>
      </svg>
      <figcaption className="mt-2 text-center font-mono text-[11px] text-ink-soft">
        通常の部品交換修理では対応できないケースでも、基板そのものを修復できればデータを取り出せる可能性がある
      </figcaption>
    </figure>
  );
}
