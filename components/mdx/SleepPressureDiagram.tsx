// 仰向けに寝たときの体圧のかかりやすい部位（肩・腰）を示す挿絵。
// MDX内で <SleepPressureDiagram /> の形で使用する。
export default function SleepPressureDiagram() {
  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <svg viewBox="0 0 300 120" className="w-full" role="img" aria-label="仰向けで寝たときに体圧がかかりやすい部位を示す図">
        <rect x="10" y="70" width="280" height="18" rx="4" fill="none" stroke="#8C6A4F" strokeWidth="2" />
        <circle cx="45" cy="55" r="12" fill="none" stroke="#20263B" strokeWidth="2" />
        <line x1="45" y1="67" x2="45" y2="70" stroke="#20263B" strokeWidth="2" />
        <line x1="57" y1="72" x2="243" y2="72" stroke="#20263B" strokeWidth="2" />

        <circle cx="100" cy="70" r="7" fill="#B4472B" opacity="0.25" stroke="#B4472B" strokeWidth="1.5" />
        <text x="88" y="55" className="font-mono" fontSize="8.5" fill="#B4472B">
          肩まわり
        </text>

        <circle cx="180" cy="70" r="9" fill="#B4472B" opacity="0.3" stroke="#B4472B" strokeWidth="1.5" />
        <text x="163" y="55" className="font-mono" fontSize="8.5" fill="#B4472B">
          腰まわり
        </text>

        <circle cx="230" cy="70" r="6" fill="#B4472B" opacity="0.2" stroke="#B4472B" strokeWidth="1.5" />
        <text x="215" y="55" className="font-mono" fontSize="8.5" fill="#B4472B">
          かかと
        </text>

        <text x="10" y="105" className="font-mono" fontSize="9" fill="#4A5170">
          体の中でも重い部位ほど、マットレスに沈み込む力が集中しやすい
        </text>
      </svg>
      <figcaption className="mt-2 text-center font-mono text-[11px] text-ink-soft">
        圧が一点に集中すると、寝返りの回数が増えたり眠りが浅くなったりする一因になるとされる
      </figcaption>
    </figure>
  );
}
