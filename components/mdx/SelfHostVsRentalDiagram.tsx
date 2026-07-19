// 自宅PCでゲームサーバーを立てる場合と、レンタルサーバーを使う場合の違いを示す挿絵。
// 稼働時間を表す帯で比較するテイスト。MDX内で <SelfHostVsRentalDiagram /> の形で使用する。
export default function SelfHostVsRentalDiagram() {
  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <svg viewBox="0 0 300 110" className="w-full" role="img" aria-label="自宅PCとレンタルサーバーの稼働時間の違いを示す図">
        <text x="15" y="18" className="font-mono" fontSize="9" fill="#4A5170">
          自宅PCでホスト
        </text>
        <rect x="15" y="26" width="270" height="14" fill="#E4EAE3" />
        {[0, 60, 130, 210].map((x, i) => (
          <rect key={i} x={15 + x} y="26" width={i % 2 === 0 ? 45 : 30} height="14" fill="#B4472B" opacity="0.6" />
        ))}
        <text x="15" y="52" className="font-body" fontSize="8" fill="#B4472B">
          PCを閉じる・再起動するたびにサーバーも止まる
        </text>

        <text x="15" y="72" className="font-mono" fontSize="9" fill="#4A5170">
          レンタルサーバー
        </text>
        <rect x="15" y="80" width="270" height="14" fill="#356156" opacity="0.65" />
        <text x="15" y="106" className="font-body" fontSize="8" fill="#356156">
          電源を切っていても、仲間はいつでも接続できる
        </text>
      </svg>
      <figcaption className="mt-2 text-center font-mono text-[11px] text-ink-soft">
        自宅PCでのホストは「自分がプレイする時しか遊べない」問題が起きやすい
      </figcaption>
    </figure>
  );
}
