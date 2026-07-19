// 無料ブログのサブドメインと、独自ドメインの構造の違いを示す挿絵。
// MDX内で <DomainStructureDiagram /> の形で使用する。
export default function DomainStructureDiagram() {
  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <svg viewBox="0 0 300 120" className="w-full" role="img" aria-label="サブドメインと独自ドメインの構造の違いを示す図">
        <text x="10" y="20" className="font-mono" fontSize="9" fill="#4A5170">
          無料ブログのサブドメイン
        </text>
        <text x="10" y="42" className="font-mono" fontSize="12" fill="#20263B">
          yourname
          <tspan fill="#B4472B">.hatenablog.com</tspan>
        </text>
        <text x="120" y="56" className="font-mono" fontSize="8" fill="#B4472B">
          ↑ サービス側が所有する部分
        </text>

        <line x1="10" y1="72" x2="290" y2="72" stroke="#D8D3C4" strokeWidth="1" />

        <text x="10" y="90" className="font-mono" fontSize="9" fill="#4A5170">
          独自ドメイン
        </text>
        <text x="10" y="112" className="font-mono" fontSize="12" fill="#20263B">
          <tspan fill="#356156">yoursite.com</tspan>
        </text>
      </svg>
      <figcaption className="mt-2 text-center font-mono text-[11px] text-ink-soft">
        独自ドメインは全体が自分のものになるため、サービスを乗り換えてもURLを維持できる
      </figcaption>
    </figure>
  );
}
