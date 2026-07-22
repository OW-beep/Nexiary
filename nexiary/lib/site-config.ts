export const siteConfig = {
  name: "Nexiary",
  tagline: "毎日、新しい発見に出会う。",
  description:
    "AI・ゲーム・ガジェット・Webサービスの最新情報を、目録のように整理してお届けするメディア「Nexiary」。",
  // 本番ドメインが決まり次第ここを更新（メタデータのcanonical/OGPに反映される）
  url: "https://nexiary-phi.vercel.app",
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
};

export type Category = (typeof siteConfig.categories)[number]["slug"];
