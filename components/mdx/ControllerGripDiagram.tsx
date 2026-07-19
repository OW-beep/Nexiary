// コントローラー操作時に負担がかかりやすい部分を示す挿絵。
// アイコン＋短い注記で構成する、ラベル密度低めのテイスト。
// MDX内で <ControllerGripDiagram /> の形で使用する。
export default function ControllerGripDiagram() {
  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <svg viewBox="0 0 300 150" className="w-full" role="img" aria-label="コントローラー操作で負担がかかりやすい部分を示す図">
        <rect x="70" y="55" width="160" height="60" rx="26" fill="none" stroke="#20263B" strokeWidth="2" />
        <circle cx="105" cy="70" r="9" fill="#B4472B" opacity="0.75" />
        <text x="15" y="30" className="font-mono" fontSize="8" fill="#B4472B">
          <tspan x="15" dy="0">親指：スティック操作で</tspan>
          <tspan x="15" dy="11">疲れやすい</tspan>
        </text>
        <line x1="105" y1="61" x2="70" y2="45" stroke="#D8D3C4" strokeWidth="1" />

        <circle cx="195" cy="70" r="9" fill="#B4472B" opacity="0.75" />
        <text x="185" y="130" className="font-mono" fontSize="8" fill="#B4472B">
          <tspan x="185" dy="0">人差し指：トリガー</tspan>
          <tspan x="185" dy="11">連打で疲れやすい</tspan>
        </text>
        <line x1="195" y1="79" x2="195" y2="118" stroke="#D8D3C4" strokeWidth="1" />

        <circle cx="150" cy="85" r="7" fill="#356156" opacity="0.6" />
        <text x="10" y="130" className="font-mono" fontSize="8" fill="#356156">
          <tspan x="10" dy="0">手のひら：本体を</tspan>
          <tspan x="10" dy="11">支え続ける負荷</tspan>
        </text>
        <line x1="150" y1="92" x2="80" y2="120" stroke="#D8D3C4" strokeWidth="1" />
      </svg>
      <figcaption className="mt-2 text-center font-mono text-[11px] text-ink-soft">
        負担が集中しやすい部分は、グリップ形状やボタン配置によって軽減できる
      </figcaption>
    </figure>
  );
}
