# AdSenseを「通過済み」から「配信中」にする手順

## 現在地（2026-11-13に本番を確認）
- 審査: 通過済み（運営者申告）
- 本番サイト: 広告スクリプト（ca-pub-...）が読み込まれていない／ads.txtは下書きのまま
- つまり「資格はあるのに広告が出ていない」状態。残りは設定だけ

## 最短コース: 自動広告だけONにする（推奨・10分）
手動ユニットを作らなくても、IDを1つ入れるだけで始められる。
1. AdSense管理画面 → 広告 → コードを取得 で表示される `ca-pub-...` を控える
2. Vercel → Settings → Environment Variables に追加:
   - NEXT_PUBLIC_ADSENSE_CLIENT = ca-pub-...（自分のID）
3. 再デプロイ
4. AdSense管理画面 → 広告 → 自動広告 をONにする
5. サイトを開いて広告が出るか確認（反映まで時間がかかる場合がある）

## しっかりコース: 手動ユニットも併用する
自動広告に加えて、固定位置のユニットを3つ作ると収益の再現性が上がる。
AdSense管理画面 → 広告 → 広告ユニットごと → ディスプレイ広告 で作成し、各ID（数字）をVercelに入れる:
- NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE_TOP … 記事タイトル直下（v5で追加）
- NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE … 記事末尾（従来から有）
- NEXT_PUBLIC_ADSENSE_SLOT_HOME … トップページ中段（v5で追加）
未設定の枠は自動で非表示になるため、1つずつ増やして問題ない。

## ads.txt（忘れがち・重要）
AdSense管理画面の指示に従い、public/ads.txt の中身を次の1行に置き換える:
google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
（pub-の数字は自分のパブリッシャーID。pub- IDは ads.txt で公開される前提の公開情報）
デプロイ後、https://nexiary-phi.vercel.app/ads.txt でその1行が見えることを確認する。

## 注意（ポリシー）
- 自分の広告は絶対にクリックしない／知人にクリックを頼まない
- 広告の近くに「クリックして」等の誘導文を置かない
- 記事が極端に薄いページへの過剰配置は避ける（今の配置は記事上・下とトップ中段のみ）
- 収益の反映や単価はPV規模に比例する。現状の流入では、まず計測と流入拡大が先
