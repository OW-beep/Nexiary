import type { ReactNode } from "react";

// 英語ページ：ルートlayoutのhtml lang="ja"は変えられないため、英語セクションをlang="en"で包む
export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <div lang="en">{children}</div>;
}
