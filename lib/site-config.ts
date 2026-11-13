export const siteConfig = {
  name: "Nexiary",
  tagline: "迷う・困るを、3分で解決する。",
  description:
    "買う前に迷う、使い方が分からない、地味に困る——AI・ゲーム・ガジェット・Webサービスのその悩みを、比較と手順で3分で解決するメディア「Nexiary」。実際に検索で読まれている悩みから逆算して記事を作っています。",
  // 独自ドメインに移行したら、Vercelの環境変数 NEXT_PUBLIC_SITE_URL にそのURLを入れるだけで
  // canonical/OGP/サイトマップ/構造化データのすべてに反映される（末尾スラッシュなし）。
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://nexiary-phi.vercel.app").replace(/\/$/, ""),
  locale: "ja_JP",
  twitterHandle: "@nexiary_media",
  categories: [
    { slug: "ai", label: "AI" },
    { slug: "game", label: "ゲーム" },
    { slug: "gadget", label: "ガジェット" },
    { slug: "webservice", label: "Webサービス" },
    { slug: "lifehack", label: "生活便利グッズ" },
    { slug: "ranking", label: "比較・ランキング" },
    { slug: "review", label: "レビュー" },
    { slug: "howto", label: "使い方" },
  ] as const,
  // サイト全体で浮かせる楽天アフィリエイトの導線。
  // hrefが空のうちは自動的に非表示（AdSense等と同じ「未設定なら出さない」方針）。
  rakuten: {
    enabled: true,
    label: "楽天で探す",
    description: "気になる発見を、楽天でチェック",
    href: process.env.NEXT_PUBLIC_RAKUTEN_URL ?? "",
  },
};

export type Category = (typeof siteConfig.categories)[number]["slug"];
