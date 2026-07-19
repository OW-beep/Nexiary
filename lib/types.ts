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
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string; // 未コンパイルのMDX本文（記事ページ側でコンパイルする）
}
