// 「電源+映像+給電で3本必要な従来の外部モニター」と「Type-C1本で完結するモバイルモニター」を
// ケーブル本数の対比で示す挿絵。他の挿絵（回転矢印・ゲージ・配列比較・充電レイアウト）とは
// 「ケーブル本数の対比」という表現で差別化している。
// MDX内で <SingleCableSetupDiagram /> の形で使用する。
export default function SingleCableSetupDiagram() {
  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <p className="font-display text-base text-ink">接続の手軽さ（ケーブル本数のイメージ）</p>
      <div className="mt-6 flex flex-col gap-8 sm:flex-row sm:justify-around">
        <div className="flex flex-col items-center gap-2">
          <svg width="140" height="70" viewBox="0 0 140 70" aria-hidden="true">
            <rect x="4" y="20" width="34" height="30" rx="3" fill="none" stroke="#4A5170" strokeWidth="2" />
            <rect x="100" y="16" width="36" height="38" rx="3" fill="none" stroke="#4A5170" strokeWidth="2" />
            {[24, 32, 40].map((y, i) => (
              <line key={i} x1="38" y1={y} x2="100" y2={y} stroke="#B4472B" strokeWidth="2" />
            ))}
          </svg>
          <span className="font-mono text-[11px] text-ink-soft">従来型：電源＋映像＋給電で複数本</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <svg width="140" height="70" viewBox="0 0 140 70" aria-hidden="true">
            <rect x="4" y="20" width="34" height="30" rx="3" fill="none" stroke="#4A5170" strokeWidth="2" />
            <rect x="100" y="16" width="36" height="38" rx="3" fill="none" stroke="#4A5170" strokeWidth="2" />
            <line x1="38" y1="35" x2="100" y2="35" stroke="#356156" strokeWidth="3" />
          </svg>
          <span className="font-mono text-[11px] text-ink-soft">モバイルモニター：Type-C 1本</span>
        </div>
      </div>
      <figcaption className="mt-4 text-center font-mono text-[11px] text-ink-soft">
        対応機種であれば、Type-Cケーブル1本で映像と給電をまとめられます（機種により対応状況は異なります）。
      </figcaption>
    </figure>
  );
}
