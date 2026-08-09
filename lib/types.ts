import type { Category } from "./site-config";

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string; // "2026-07-16" 形式
  category: Category;
  tags: string[];
  cover?: string;
  draft?: boolean;
  popular?: number; // 手動で人気順を管理する場合の順位（1が最上位）。未設定なら新着順で代用
  floatingAd?: {
    name: string;
    description?: string;
    href: string;
    cta?: string;
  };
  faq?: { q: string; a: string }[];
  // Nexiary Score：編集部の主観評価（実測値ではない）。合計は100点満点、内訳は各20点満点。
  // ここに設定すると記事にスコアカードが表示され、Reviewの構造化データ（ratingValue）にも使われる。
  nexiaryScore?: {
    total: number; // 0-100
    price: number; // 価格 0-20
    performance: number; // 性能 0-20
    usability: number; // 使いやすさ 0-20
    value: number; // コスパ 0-20
    uniqueness: number; // 独自性 0-20
  };
  reviewProduct?: string; // Reviewスキーマのitem名。未設定ならtitleを使う
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string; // 未コンパイルのMDX本文（記事ページ側でコンパイルする）
}
