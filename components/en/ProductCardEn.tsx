interface ProductCardEnProps {
  name: string;
  description: string;
  query: string; // Amazon.comの検索語
  cta?: string;
}

// 海外向けの商品カード。Amazon.com Associates（米国）のトラッキングIDを環境変数
// NEXT_PUBLIC_AMAZON_US_TAG に設定すると、リンクにタグが付く（日本のアソシエイトIDとは別のアカウントが必要）。
// 未設定の間は、タグなしの通常リンクになり、成果は発生しない。
export default function ProductCardEn({
  name,
  description,
  query,
  cta = "Check price on Amazon",
}: ProductCardEnProps) {
  const tag = process.env.NEXT_PUBLIC_AMAZON_US_TAG;
  const href =
    `https://www.amazon.com/s?k=${encodeURIComponent(query)}` + (tag ? `&tag=${tag}` : "");

  return (
    <div className="catalog-card not-prose my-6 flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-display text-base text-ink">{name}</p>
        <p className="mt-1 font-body text-sm text-ink-soft">{description}</p>
        {tag && (
          <p className="mt-2 font-body text-xs text-ink-soft/70">
            As an Amazon Associate I earn from qualifying purchases.
          </p>
        )}
      </div>
      <a
        href={href}
        target="_blank"
        rel="sponsored nofollow noopener noreferrer"
        className="inline-flex shrink-0 items-center justify-center rounded-card bg-stamp px-4 py-2.5 font-body text-sm text-paper transition-opacity hover:opacity-90"
      >
        {cta} ↗
      </a>
    </div>
  );
}
