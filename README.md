# Nexiary

AI・ゲーム・ガジェット・Webサービスを紹介するアフィリエイトメディア。
Next.js 14 (App Router) + TypeScript + Tailwind CSS + MDX。

## スタック
- **フレームワーク**: Next.js 14 (App Router)
- **スタイリング**: Tailwind CSS（デザイントークンは `tailwind.config.ts` に集約）
- **記事**: MDX（`content/posts/*.mdx`、frontmatterは `gray-matter` で解析）
- **デプロイ**: Vercel

## ディレクトリ構成
```
app/                ページ（App Router）
  layout.tsx         共通レイアウト・SEOメタデータ・フォント
  page.tsx           トップページ
  globals.css        グローバルCSS／デザイントークンの適用
components/          ヘッダー・フッターなど共通UI
content/posts/       記事本体（.mdx）
lib/
  site-config.ts     サイト名・カテゴリ・SEO用の共通設定
  posts.ts           記事の読み込み・一覧・検索ロジック
  types.ts           記事frontmatterの型
```

## ロードマップ
- [x] Phase 1: プロジェクト作成 / 共通レイアウト / ヘッダー・フッター / SEO土台 / MDX基盤 / トップページ
- [x] Phase 2: 記事一覧・記事ページ・カテゴリ・タグ・検索・パンくず・関連記事
- [x] Phase 3: AdSense対応・アフィリエイトカード・人気記事・ランキング・RSS・サイトマップ
- [x] Phase 4: About・お問い合わせ・プライバシーポリシー・利用規約・404・サンプル記事

## 公開前にやること
1. `lib/site-config.ts` の `url` を実際のドメインに変更する
2. AdSense審査に申し込み、通過後に `NEXT_PUBLIC_ADSENSE_CLIENT`（Vercelの環境変数）と `public/ads.txt` を正式な値に更新する
3. `app/contact/page.tsx` のフォーム送信先（Formspree等）を取得したエンドポイントに差し替える
4. 各ASP（Amazonアソシエイト・楽天・A8.net等）の審査に申し込み、`<AffiliateCard href="...">` に発行されたリンクを設定する
5. `content/posts/` のサンプル記事3本を、実際の記事に順次置き換える（`popular` フィールドで人気記事欄の表示順を手動調整可能）

## 主なページ・機能
| パス | 内容 |
|---|---|
| `/` | トップページ（最新記事・人気記事） |
| `/posts` | 記事一覧（ページネーション付き） |
| `/posts/[slug]` | 記事詳細（パンくず・関連記事・広告枠・構造化データ） |
| `/category`, `/category/[slug]` | カテゴリ一覧・カテゴリ別一覧 |
| `/tag/[tag]` | タグ別一覧 |
| `/search` | サイト内検索（クライアント側フィルタ） |
| `/rss.xml` | RSSフィード |
| `/sitemap.xml`, `/robots.txt` | Next.js標準機能で自動生成 |
| `/about`, `/contact`, `/privacy-policy`, `/terms` | 固定ページ |

MDX記事内で使える独自コンポーネント：`<AffiliateCard />`（アフィリエイトリンクカード）、`<RankingList items={[...]} />`（ランキング表示）。

## セキュリティに関する注意
`content/posts/` 配下のMDXは、**サイト運営者が自分で書いたものだけ**を置いてください。next-mdx-remoteはMDX内のJavaScript式を実行できる仕組みのため、もし将来「読者からの投稿を記事にする」といった機能を追加する場合は、そのMDXは信頼できない入力として扱い、`blockJS`を有効に戻す（`app/posts/[slug]/page.tsx` の `options.blockJS` を削除／`true`に戻す）などの対策が必要です。

## PCの容量を使わずに開発・公開する方法（ブラウザ完結）

ローカルにNode.jsをインストールしたり `npm install` を実行したりせずに、
以下の流れで **ブラウザだけ** で開発してVercelに公開できます。

1. **GitHubにリポジトリを作る**（github.com、ブラウザ）
   - 新規リポジトリを作成し、このフォルダ一式をアップロード
     （GitHubの「Add file → Upload files」に、このフォルダをまとめてドラッグ&ドロップでOK。
       node_modulesは含まれていないので数百KB程度で軽量です）
2. **StackBlitzで開発を続ける**（stackblitz.com、ブラウザ完結のNode実行環境）
   - StackBlitzにGitHubでログイン → 「Import from GitHub」で上記リポジトリを開く
   - ブラウザ内で `npm install` 相当が自動実行され、プレビューもブラウザ内で動く
   - 編集はそのままGitHubにコミット＆プッシュ可能（PC容量を一切使わない）
   - 同様のサービスとして CodeSandbox や GitHub Codespaces（月一定時間無料）も選択肢
3. **Vercelでデプロイ**（vercel.com、ブラウザ）
   - 「Add New → Project」→ GitHubリポジトリを選択してImport
   - Framework Presetは自動で `Next.js` と認識される（設定変更不要）
   - 以降はGitHubにpushするたびに自動で再デプロイされる

この方法なら、PC側に保存されるのは何もありません（ビルドはすべてVercel/StackBlitzのクラウド上）。
