interface RankingItem {
  rank: number;
  title: string;
  comment: string;
}

// 記事MDX内で <RankingList items={[{rank:1,title:"...",comment:"..."}]} /> の形で使用
// JSON配列をそのままpropsに渡せるよう、シンプルなオブジェクト構造にしている
export default function RankingList({ items }: { items: RankingItem[] }) {
  return (
    <ol className="not-prose my-6 flex flex-col gap-3">
      {items.map((item) => (
        <li key={item.rank} className="catalog-card flex gap-4 p-4">
          <span className="font-display text-2xl text-stamp">{item.rank}</span>
          <div>
            <p className="font-display text-base text-ink">{item.title}</p>
            <p className="mt-1 font-body text-sm text-ink-soft">{item.comment}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
