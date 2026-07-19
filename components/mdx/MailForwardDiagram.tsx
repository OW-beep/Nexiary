// バーチャルオフィス経由で郵便物が転送される流れを示す挿絵。
// MDX内で <MailForwardDiagram /> の形で使用する。
export default function MailForwardDiagram() {
  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <svg viewBox="0 0 300 110" className="w-full" role="img" aria-label="バーチャルオフィス経由の郵便転送の流れを示す図">
        <text x="10" y="20" className="font-mono" fontSize="9" fill="#4A5170">
          公開される住所
        </text>
        <rect x="10" y="30" width="90" height="40" rx="4" fill="none" stroke="#356156" strokeWidth="2" />
        <text x="55" y="54" textAnchor="middle" className="font-body" fontSize="10" fill="#20263B">
          バーチャル
          <tspan x="55" dy="12">
            オフィス住所
          </tspan>
        </text>

        <line x1="105" y1="50" x2="155" y2="50" stroke="#B4472B" strokeWidth="2" markerEnd="url(#mailArrow)" />
        <defs>
          <marker id="mailArrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#B4472B" />
          </marker>
        </defs>
        <text x="108" y="42" className="font-mono" fontSize="8" fill="#B4472B">
          郵便物を転送
        </text>

        <text x="170" y="20" className="font-mono" fontSize="9" fill="#4A5170">
          非公開
        </text>
        <rect x="170" y="30" width="120" height="40" rx="4" fill="none" stroke="#20263B" strokeWidth="2" strokeDasharray="4 3" />
        <text x="230" y="54" textAnchor="middle" className="font-body" fontSize="10" fill="#20263B">
          自宅・実際の住所
        </text>
      </svg>
      <figcaption className="mt-2 text-center font-mono text-[11px] text-ink-soft">
        名刺やサイトに載る住所と、実際に荷物が届く場所を分けられるのが最大の特徴
      </figcaption>
    </figure>
  );
}
