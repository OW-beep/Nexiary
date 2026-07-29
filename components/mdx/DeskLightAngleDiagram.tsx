// フレキシブルアームのデスクライトを、画面の逆側・斜め上から当てる「グレア（反射・映り込み）を避ける置き方」を
// 角度の扇形で示す挿絵。他の挿絵（アイコン繰り返し・Before/After・フロー図・帯グラフ）とは
// 「角度・扇形」という表現で差別化している。
// MDX内で <DeskLightAngleDiagram /> の形で使用する。
export default function DeskLightAngleDiagram() {
  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <p className="font-display text-base text-ink">置き方の目安（画面への映り込みを避ける）</p>
      <svg viewBox="0 0 320 160" className="mx-auto mt-4 w-full max-w-sm" role="img" aria-label="デスクライトを画面と逆側の斜め上から当てる配置の図">
        {/* デスクとモニター */}
        <rect x="120" y="70" width="80" height="50" rx="4" fill="none" stroke="#4A5170" strokeWidth="2" />
        <line x1="60" y1="140" x2="280" y2="140" stroke="#4A5170" strokeWidth="2" />

        {/* 光源とNG/OKの扇形 */}
        <circle cx="70" cy="60" r="8" fill="#B4472B" />
        <path d="M70,60 L140,70 A90,90 0 0 1 70,140 Z" fill="#356156" opacity="0.12" />
        <line x1="70" y1="60" x2="150" y2="105" stroke="#356156" strokeWidth="2" strokeDasharray="4 3" />
        <text x="90" y="122" className="font-mono" fontSize="10" fill="#356156">OK：斜め上から</text>

        <path d="M70,60 L120,80 A60,60 0 0 0 70,60 Z" fill="#B4472B" opacity="0.12" />
        <text x="130" y="52" className="font-mono" fontSize="10" fill="#B4472B">NG：画面に正対</text>
      </svg>
      <figcaption className="mt-3 text-center font-mono text-[11px] text-ink-soft">
        光源を画面の反対側・斜め上に置くと、映り込み（グレア）を抑えつつ手元を照らせます。
      </figcaption>
    </figure>
  );
}
