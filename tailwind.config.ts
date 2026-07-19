import type { Config } from "tailwindcss";

// デザインコンセプト：「Next + Diary + Library」= 毎日更新される発見の目録（カタログ）
// 図書館の貸出カード / 目録カードをモチーフにした、少しレトロで知的な"ログ帳"の雰囲気。
// ありがちな「クリーム背景×テラコッタ」「漆黒×蛍光」ではなく、
// 紙の目録カード(paper) × インク紺(ink) × 図書館スタンプの朱(stamp) で構成する。
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#F4F2EC", // 目録カードの紙色（黄味を抑えた生成り）
          card: "#FCFBF7",
        },
        ink: {
          DEFAULT: "#20263B", // 万年筆インクの紺
          soft: "#4A5170",
        },
        stamp: {
          DEFAULT: "#B4472B", // 図書館の受付印（朱色）— アクセントは控えめに使用
        },
        moss: {
          DEFAULT: "#356156", // 索引タブの緑（カテゴリ用の第2アクセント）
          light: "#E4EAE3",
        },
        line: "#D8D3C4", // カード罫線
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "card-lines": "repeating-linear-gradient(to bottom, transparent, transparent 27px, #D8D3C4 28px)",
      },
      borderRadius: {
        card: "2px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
