// 在宅ワークの姿勢（モニター高さ・目線・ひじの角度）を説明する挿絵。
// MDX内で <PostureDiagram /> の形で使用する。
export default function PostureDiagram() {
  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <svg viewBox="0 0 300 150" className="w-full" role="img" aria-label="正しい作業姿勢の目安を示す図">
        {/* 目線の高さライン */}
        <line x1="10" y1="40" x2="290" y2="40" stroke="#B4472B" strokeWidth="1.5" strokeDasharray="4 3" />
        <text x="10" y="34" className="font-mono" fontSize="9" fill="#B4472B">
          目線はモニター上端と同じかやや下
        </text>

        {/* モニター */}
        <rect x="120" y="40" width="70" height="48" rx="3" fill="none" stroke="#20263B" strokeWidth="2" />
        <rect x="145" y="88" width="20" height="8" fill="#20263B" />

        {/* 頭部（円）と背骨（線） */}
        <circle cx="60" cy="48" r="10" fill="none" stroke="#20263B" strokeWidth="2" />
        <line x1="60" y1="58" x2="60" y2="110" stroke="#20263B" strokeWidth="2" />

        {/* ひじの角度 */}
        <line x1="60" y1="80" x2="90" y2="80" stroke="#356156" strokeWidth="2" />
        <text x="65" y="72" className="font-mono" fontSize="9" fill="#356156">
          ひじ90°
        </text>

        {/* 足元ライン */}
        <line x1="10" y1="120" x2="290" y2="120" stroke="#D8D3C4" strokeWidth="1" />
        <text x="10" y="134" className="font-mono" fontSize="9" fill="#4A5170">
          足の裏は床（または足置き）にしっかりつく高さに
        </text>
      </svg>
      <figcaption className="mt-2 text-center font-mono text-[11px] text-ink-soft">
        目線・ひじ・足の3点を整えるだけでも、首や肩への負担はかなり変わる
      </figcaption>
    </figure>
  );
}
