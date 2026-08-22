interface RadarSeries {
  name: string;
  color: string; // 16進カラーコード(例: "#356156")
  values: number[]; // axesと同じ順序・同じ長さ、各0〜100の相対スコア
}

// 複数製品を多軸で相対比較するレーダーチャート。
// MDX内で <RadarCompare axes={[...]} series={[...]} note="..." /> の形で使用する。
// values は実測値そのものではなく「軸内での相対スコア(0〜100)」。算出根拠は必ずnoteに書くこと。
export default function RadarCompare({
  title,
  axes,
  series,
  note,
}: {
  title: string;
  axes: string[];
  series: RadarSeries[];
  note?: string;
}) {
  const size = 440;
  const center = size / 2;
  const maxR = size / 2 - 76; // ラベル分の余白を確保
  const n = axes.length;

  const angleAt = (i: number) => -Math.PI / 2 + (i * 2 * Math.PI) / n;
  const pointAt = (i: number, r: number) => {
    const a = angleAt(i);
    return [center + r * Math.cos(a), center + r * Math.sin(a)] as const;
  };

  const rings = [0.2, 0.4, 0.6, 0.8, 1];

  return (
    <div className="not-prose catalog-card my-8 p-5">
      <p className="font-display text-base text-ink">{title}</p>

      <div className="mt-2 flex justify-center">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-md">
          {/* 目盛りの多角形グリッド */}
          {rings.map((frac) => {
            const pts = Array.from({ length: n }, (_, i) => pointAt(i, maxR * frac).join(",")).join(" ");
            return (
              <polygon key={frac} points={pts} fill="none" stroke="#D8D3C4" strokeWidth={1} />
            );
          })}

          {/* 中心から各軸への線 */}
          {axes.map((_, i) => {
            const [x, y] = pointAt(i, maxR);
            return <line key={i} x1={center} y1={center} x2={x} y2={y} stroke="#D8D3C4" strokeWidth={1} />;
          })}

          {/* 各シリーズのポリゴン */}
          {series.map((s) => {
            const pts = s.values.map((v, i) => pointAt(i, maxR * (Math.max(0, Math.min(100, v)) / 100)).join(",")).join(" ");
            return (
              <g key={s.name}>
                <polygon points={pts} fill={s.color} fillOpacity={0.08} stroke={s.color} strokeWidth={2} />
                {s.values.map((v, i) => {
                  const [x, y] = pointAt(i, maxR * (Math.max(0, Math.min(100, v)) / 100));
                  return <circle key={i} cx={x} cy={y} r={3} fill={s.color} />;
                })}
              </g>
            );
          })}

          {/* 軸ラベル */}
          {axes.map((label, i) => {
            const [x, y] = pointAt(i, maxR + 34);
            return (
              <text
                key={label}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-ink font-body text-[13px]"
              >
                {label}
              </text>
            );
          })}
        </svg>
      </div>

      <div className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-2">
        {series.map((s) => (
          <div key={s.name} className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: s.color }} />
            <span className="font-body text-xs text-ink-soft">{s.name}</span>
          </div>
        ))}
      </div>

      {note && <p className="mt-4 font-mono text-[11px] text-ink-soft/70">{note}</p>}
    </div>
  );
}
