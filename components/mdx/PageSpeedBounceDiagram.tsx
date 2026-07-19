// ページの表示速度が「離脱」と「滞在」のどちらにつながりやすいかを示す挿絵。
// MDX内で <PageSpeedBounceDiagram /> の形で使用する。
export default function PageSpeedBounceDiagram() {
  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <svg viewBox="0 0 300 130" className="w-full" role="img" aria-label="表示速度と離脱・滞在の関係を示す図">
        <circle cx="30" cy="30" r="12" fill="none" stroke="#20263B" strokeWidth="2" />
        <text x="10" y="55" className="font-mono" fontSize="9" fill="#4A5170">
          訪問者
        </text>

        <line x1="50" y1="30" x2="110" y2="30" stroke="#D8D3C4" strokeWidth="2" />
        <text x="55" y="24" className="font-mono" fontSize="8" fill="#4A5170">
          表示に数秒
        </text>
        <text x="120" y="34" className="font-body" fontSize="11" fill="#B4472B">
          × 離脱してしまう
        </text>

        <line x1="10" y1="70" x2="290" y2="70" stroke="#D8D3C4" strokeWidth="1" />

        <circle cx="30" cy="100" r="12" fill="none" stroke="#20263B" strokeWidth="2" />
        <text x="10" y="125" className="font-mono" fontSize="9" fill="#4A5170">
          訪問者
        </text>
        <line x1="50" y1="100" x2="80" y2="100" stroke="#D8D3C4" strokeWidth="2" />
        <text x="52" y="94" className="font-mono" fontSize="8" fill="#356156">
          瞬時に表示
        </text>
        <text x="90" y="104" className="font-body" fontSize="11" fill="#356156">
          ○ そのまま読み進める
        </text>
      </svg>
      <figcaption className="mt-2 text-center font-mono text-[11px] text-ink-soft">
        表示までの数秒の差が、そのまま読んでもらえるかどうかを左右する
      </figcaption>
    </figure>
  );
}
