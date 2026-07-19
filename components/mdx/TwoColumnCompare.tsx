interface CompareColumn {
  title: string;
  items: string[];
  highlight?: boolean;
}

// 2つの選択肢を並べて比較する汎用コンポーネント。
// MDX内で <TwoColumnCompare columns={[{title:"A", items:["..."]}, {title:"B", items:["..."]}]} /> の形で使用する。
export default function TwoColumnCompare({ columns }: { columns: CompareColumn[] }) {
  return (
    <div className="not-prose my-8 grid gap-4 sm:grid-cols-2">
      {columns.map((col) => (
        <div
          key={col.title}
          className={`catalog-card p-5 ${col.highlight ? "border-stamp/60" : ""}`}
        >
          <p className="font-display text-base text-ink">{col.title}</p>
          <ul className="mt-3 flex flex-col gap-2">
            {col.items.map((item, i) => (
              <li key={i} className="flex gap-2 font-body text-sm text-ink-soft">
                <span className="text-moss">・</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
