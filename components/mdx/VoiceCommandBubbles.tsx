// マイクアイコンから、実際に使う音声コマンドの例を吹き出しで放射状に見せる挿絵。
// 他の挿絵（放射クラスターの円配置、ケーブル比較、質感対比等）とは
// 「吹き出し（会話）」という表現で差別化している。
// MDX内で <VoiceCommandBubbles /> の形で使用する。
export default function VoiceCommandBubbles() {
  const commands = [
    { text: "アレクサ、音楽かけて", x: 20, y: 10 },
    { text: "タイマーセットして", x: 190, y: 10 },
    { text: "今日の天気は？", x: 105, y: 90 },
  ];

  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <p className="font-display text-base text-ink">こんな一言で動く</p>
      <svg viewBox="0 0 300 150" className="mx-auto mt-4 w-full max-w-sm" role="img" aria-label="声をかけるだけで動く音声コマンドの例">
        <circle cx="150" cy="70" r="22" fill="#B4472B" opacity="0.15" stroke="#B4472B" strokeWidth="2" />
        <rect x="144" y="60" width="12" height="16" rx="6" fill="#B4472B" />
        <line x1="150" y1="80" x2="150" y2="88" stroke="#B4472B" strokeWidth="2" />
        {commands.map((c) => (
          <g key={c.text}>
            <rect x={c.x} y={c.y} width="96" height="30" rx="10" fill="#FCFBF7" stroke="#356156" strokeWidth="1.5" />
            <text x={c.x + 48} y={c.y + 19} textAnchor="middle" className="font-mono" fontSize="8.5" fill="#356156">
              {c.text}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="mt-2 text-center font-mono text-[11px] text-ink-soft">
        手が離せないときほど、声で済ませられる便利さを実感しやすい。
      </figcaption>
    </figure>
  );
}
