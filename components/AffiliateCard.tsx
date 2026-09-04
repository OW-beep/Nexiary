import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface AffiliateCardProps {
  name: string;
  description: string;
  href: string; // ASPの発行するアフィリエイトリンク（楽天等）
  amazonHref?: string; // Amazonアソシエイトのリンク（tag=nexiary-22を含むURL）
  image?: string; // 商品サムネイル画像（ASPが発行するトラッキング画像URLをそのまま渡す想定）
  cta?: string;
  amazonCta?: string;
  price?: string;
  badge?: string; // 例: "No.1" "編集部おすすめ"
}

// 記事MDX内で <AffiliateCard name="..." href="..." image="..." amazonHref="..." /> の形で使用する想定。
// imageを渡すとサムネイル付きの「商品が見えるバナー」型になり、渡さない場合は従来のテキストカードになる。
// hrefのCTAは視認性の高い赤系（stamp色）の塗りボタン、amazonHrefのCTAは輪郭のみのセカンダリボタンにして、
// 「主導線（楽天）＋もう一つの選択肢（Amazon）」という優先順位を視覚的に示す。
export default function AffiliateCard({
  name,
  description,
  href,
  amazonHref,
  image,
  cta = "価格を確認する",
  amazonCta = "Amazonで価格を見る",
  price,
  badge,
}: AffiliateCardProps) {
  return (
    <div className="catalog-card not-prose my-6 flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
      {image && (
        <Link
          href={href}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className="shrink-0 self-center overflow-hidden rounded-card border border-line bg-white"
        >
          {/* ASPのトラッキング画像URLをそのまま表示。next/imageの最適化を通さず生画像として扱う */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt={name} width={112} height={112} className="h-28 w-28 object-contain" />
        </Link>
      )}
      <div className="min-w-0 flex-1">
        {badge && <span className="index-tab mb-2">{badge}</span>}
        <p className="font-display text-lg leading-snug text-ink">{name}</p>
        <p className="mt-1 font-body text-sm text-ink-soft">{description}</p>
        {price && <p className="mt-2 font-mono text-xs text-stamp">{price}</p>}
      </div>
      <div className="flex shrink-0 flex-col gap-2">
        <Link
          href={href}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className="flex items-center justify-center gap-1.5 rounded-full bg-stamp px-5 py-2.5 font-body text-sm font-medium text-paper transition-opacity hover:opacity-90"
        >
          {cta}
          <ExternalLink size={14} strokeWidth={1.75} />
        </Link>
        {amazonHref && (
          <Link
            href={amazonHref}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-full border border-line px-5 py-2.5 font-body text-sm font-medium text-ink transition-colors hover:border-stamp hover:text-stamp"
          >
            {amazonCta}
            <ExternalLink size={14} strokeWidth={1.75} />
          </Link>
        )}
      </div>
    </div>
  );
}
