// ラジオ・ライト・モバイルバッテリー・手回し・ソーラーの5機能を、中心から放射状に配置して
// 「1台で5役」を示す挿絵。他の挿絵（ケーブル本数比較・回転矢印・ゲージ等）とは
// 「放射状のクラスター配置」という表現で差別化している。
// MDX内で <MultiFunctionClusterDiagram /> の形で使用する。
export default function MultiFunctionClusterDiagram() {
  const features = [
    { label: "ラジオ", angle: -90 },
    { label: "LEDライト", angle: -18 },
    { label: "モバイルバッテリー", angle: 54 },
    { label: "手回し充電", angle: 126 },
    { label: "ソーラー充電", angle: 198 },
  ];
  const cx = 150;
  const cy = 130;
  const r = 90;

  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <p className="font-display text-base text-ink">1台で5役</p>
      <svg viewBox="0 0 300 260" className="mx-auto mt-4 w-full max-w-sm" role="img" aria-label="ラジオ、LEDライト、モバイルバッテリー、手回し充電、ソーラー充電の5機能を示す図">
        <circle cx={cx} cy={cy} r="30" fill="#B4472B" opacity="0.15" stroke="#B4472B" strokeWidth="2" />
        <text x={cx} y={cy + 5} textAnchor="middle" className="font-display" fontSize="13" fill="#B4472B">
          防災ラジオ
        </text>
        {features.map((f) => {
          const rad = (Math.PI / 180) * f.angle;
          const x = cx + r * Math.cos(rad);
          const y = cy + r * Math.sin(rad);
          return (
            <g key={f.label}>
              <line x1={cx} y1={cy} x2={x} y2={y} stroke="#D8D3C4" strokeWidth="2" />
              <circle cx={x} cy={y} r="26" fill="#FCFBF7" stroke="#356156" strokeWidth="2" />
              <text x={x} y={y + 4} textAnchor="middle" className="font-mono" fontSize="9" fill="#356156">
                {f.label}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-2 text-center font-mono text-[11px] text-ink-soft">
        機能は多いが、発電系（手回し・ソーラー）はあくまで補助的な位置づけ。
      </figcaption>
    </figure>
  );
}
