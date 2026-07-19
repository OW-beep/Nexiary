// 従来型（ローカル定義ファイル）とクラウド型アンチウイルスのPCへの負荷の違いを示す挿絵。
// MDX内で <AntivirusWeightDiagram /> の形で使用する。
export default function AntivirusWeightDiagram() {
  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <svg viewBox="0 0 300 120" className="w-full" role="img" aria-label="従来型とクラウド型アンチウイルスの負荷の違いを示す図">
        <text x="15" y="18" className="font-mono" fontSize="9" fill="#4A5170">
          従来型（定義ファイルをPCに保存）
        </text>
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={20} y={26 + i * 10} width={90 - i * 4} height="8" fill="#B4472B" opacity={0.4 + i * 0.15} />
        ))}
        <text x="20" y="85" className="font-body" fontSize="10" fill="#B4472B">
          → 更新のたびにPCへ負荷
        </text>

        <line x1="150" y1="10" x2="150" y2="100" stroke="#D8D3C4" strokeWidth="1" />

        <text x="165" y="18" className="font-mono" fontSize="9" fill="#4A5170">
          クラウド型（判定はクラウド側）
        </text>
        <rect x="165" y="26" width="50" height="20" rx="3" fill="#356156" opacity="0.6" />
        <text x="167" y="40" className="font-mono" fontSize="8" fill="#F4F2EC">
          数MB程度
        </text>
        <text x="165" y="85" className="font-body" fontSize="10" fill="#356156">
          → PC側の負荷は最小限
        </text>
      </svg>
      <figcaption className="mt-2 text-center font-mono text-[11px] text-ink-soft">
        判定処理をクラウド側に任せることで、手元のPCに置く必要のあるデータを小さく抑えられる
      </figcaption>
    </figure>
  );
}
