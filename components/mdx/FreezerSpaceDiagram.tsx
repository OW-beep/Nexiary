// 冷凍庫の容量が足りない状態と、レンタルでスペースを確保した状態の違いを示す挿絵。
// MDX内で <FreezerSpaceDiagram /> の形で使用する。
export default function FreezerSpaceDiagram() {
  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <svg viewBox="0 0 300 110" className="w-full" role="img" aria-label="冷凍庫の容量不足とレンタルによる解決を示す図">
        <text x="15" y="18" className="font-mono" fontSize="9" fill="#4A5170">
          自宅の冷凍庫（満杯）
        </text>
        <rect x="15" y="26" width="70" height="60" rx="3" fill="none" stroke="#B4472B" strokeWidth="2" />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x="20" y={30 + i * 14} width="60" height="11" fill="#B4472B" opacity={0.7 - i * 0.1} />
        ))}
        <text x="10" y="98" className="font-body" fontSize="9" fill="#B4472B">
          → もう入らない
        </text>

        <line x1="105" y1="55" x2="140" y2="55" stroke="#356156" strokeWidth="2" markerEnd="url(#freezerArrow)" />
        <defs>
          <marker id="freezerArrow" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto">
            <path d="M0,0 L5,2.5 L0,5 Z" fill="#356156" />
          </marker>
        </defs>

        <text x="155" y="18" className="font-mono" fontSize="9" fill="#4A5170">
          レンタル冷凍庫を追加
        </text>
        <rect x="155" y="26" width="70" height="60" rx="3" fill="none" stroke="#356156" strokeWidth="2" strokeDasharray="4 3" />
        <text x="160" y="60" className="font-body" fontSize="9" fill="#356156">
          必要な時だけ
        </text>
        <text x="160" y="74" className="font-body" fontSize="9" fill="#356156">
          スペースを確保
        </text>
      </svg>
      <figcaption className="mt-2 text-center font-mono text-[11px] text-ink-soft">
        買い替えず「今だけ足りない分」をレンタルで補えるのが、購入との一番の違い
      </figcaption>
    </figure>
  );
}
