// 「3-2-1バックアップルール」を説明する挿絵。MDX内で <BackupRuleDiagram /> の形で使用する。
export default function BackupRuleDiagram() {
  const boxes = [
    { x: 20, label: "① 端末本体", sub: "スマホ・PC" },
    { x: 115, label: "② 別の媒体", sub: "外付けHDD等" },
    { x: 210, label: "③ 遠隔の場所", sub: "クラウド" },
  ];
  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <svg viewBox="0 0 300 130" className="w-full" role="img" aria-label="3-2-1バックアップルールを示す図">
        <text x="10" y="16" className="font-mono" fontSize="10" fill="#4A5170">
          同じデータを「3つのコピー・2つの媒体・1つは遠隔」に保つ
        </text>
        {boxes.map((b) => (
          <g key={b.label}>
            <rect x={b.x} y="35" width="75" height="55" rx="4" fill="none" stroke="#356156" strokeWidth="2" />
            <text x={b.x + 37.5} y="58" textAnchor="middle" className="font-body" fontSize="10" fill="#20263B">
              {b.label}
            </text>
            <text x={b.x + 37.5} y="74" textAnchor="middle" className="font-mono" fontSize="9" fill="#4A5170">
              {b.sub}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="mt-2 text-center font-mono text-[11px] text-ink-soft">
        いずれか1つが壊れても、他の2つが残っていれば写真データを失わずに済む
      </figcaption>
    </figure>
  );
}
