// 匿名の口コミと実名の口コミの、信頼されやすさの違いを示す挿絵。
// MDX内で <ReviewTrustDiagram /> の形で使用する。
export default function ReviewTrustDiagram() {
  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <svg viewBox="0 0 300 120" className="w-full" role="img" aria-label="匿名口コミと実名口コミの信頼性の違いを示す図">
        <text x="15" y="18" className="font-mono" fontSize="9" fill="#4A5170">
          匿名の口コミ
        </text>
        <circle cx="30" cy="45" r="12" fill="none" stroke="#B4472B" strokeWidth="1.5" strokeDasharray="2 2" />
        <text x="50" y="42" className="font-body" fontSize="9" fill="#B4472B">
          「最高でした！」
        </text>
        <text x="50" y="56" className="font-mono" fontSize="8" fill="#B4472B">
          （投稿者は誰か分からない）
        </text>

        <line x1="10" y1="75" x2="290" y2="75" stroke="#D8D3C4" strokeWidth="1" />

        <text x="15" y="93" className="font-mono" fontSize="9" fill="#4A5170">
          実名の口コミ
        </text>
        <circle cx="30" cy="100" r="12" fill="#356156" opacity="0.15" stroke="#356156" strokeWidth="1.5" />
        <text x="50" y="97" className="font-body" fontSize="9" fill="#356156">
          「サービスも良かった」
        </text>
        <text x="50" y="111" className="font-mono" fontSize="8" fill="#356156">
          （プロフィールが公開されている）
        </text>
      </svg>
      <figcaption className="mt-2 text-center font-mono text-[11px] text-ink-soft">
        投稿者が特定できる状態だと、極端な誇張や虚偽の投稿がしにくくなるとされる
      </figcaption>
    </figure>
  );
}
