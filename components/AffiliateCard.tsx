import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface AffiliateCardProps {
  name: string;
  description: string;
  href: string; // ASPの発行するアフィリエイトリンク
  cta?: string;
  price?: string;
  badge?: string; // 例: "No.1" "編集部おすすめ"
}

// 記事MDX内で <AffiliateCard name="..." href="..." /> の形で使用する想定
export default function AffiliateCard({
  name,
  description,
  href,
  cta = "公式サイトを見る",
  price,
  badge,
}: AffiliateCardProps) {
  return (
    <div className="catalog-card not-prose my-6 flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        {badge && <span className="index-tab mb-2">{badge}</span>}
        <p className="font-display text-lg text-ink">{name}</p>
        <p className="mt-1 font-body text-sm text-ink-soft">{description}</p>
        {price && <p className="mt-2 font-mono text-xs text-stamp">{price}</p>}
      </div>
      <Link
        href={href}
        target="_blank"
        rel="nofollow sponsored noopener noreferrer"
        className="flex shrink-0 items-center justify-center gap-1.5 rounded-card bg-ink px-5 py-2.5 font-body text-sm text-paper transition-opacity hover:opacity-90"
      >
        {cta}
        <ExternalLink size={14} strokeWidth={1.75} />
      </Link>
    </div>
  );
}
