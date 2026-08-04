// 「古いテレビの何もない画面」と「Fire TV Stick接続後の配信アプリが並ぶ画面」を
// テレビ型のフレームで対比する挿絵。実在のサービスロゴは使わず、汎用的なアイコン枠で表現している。
// 他の挿絵（吹き出し・質感対比・ゲージ等）とは「テレビ画面のBefore/After」という表現で差別化している。
// MDX内で <TVUpgradeDiagram /> の形で使用する。
export default function TVUpgradeDiagram() {
  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <p className="font-display text-base text-ink">接続前後の変化（イメージ）</p>
      <div className="mt-6 flex flex-col gap-8 sm:flex-row sm:justify-center sm:gap-10">
        <div className="flex flex-col items-center gap-2">
          <svg width="150" height="100" viewBox="0 0 150 100" aria-hidden="true">
            <rect x="4" y="4" width="142" height="82" rx="6" fill="none" stroke="#4A5170" strokeWidth="2" />
            <line x1="60" y1="94" x2="90" y2="94" stroke="#4A5170" strokeWidth="3" />
          </svg>
          <span className="font-mono text-[11px] text-ink-soft">従来のテレビ（地デジのみ）</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <svg width="150" height="100" viewBox="0 0 150 100" aria-hidden="true">
            <rect x="4" y="4" width="142" height="82" rx="6" fill="none" stroke="#356156" strokeWidth="2" />
            {Array.from({ length: 6 }).map((_, i) => {
              const col = i % 3;
              const row = Math.floor(i / 3);
              return (
                <rect
                  key={i}
                  x={20 + col * 40}
                  y={16 + row * 34}
                  width="28"
                  height="24"
                  rx="4"
                  fill="#B4472B"
                  opacity="0.18"
                  stroke="#B4472B"
                  strokeWidth="1.2"
                />
              );
            })}
            <line x1="60" y1="94" x2="90" y2="94" stroke="#356156" strokeWidth="3" />
          </svg>
          <span className="font-mono text-[11px] text-ink-soft">Fire TV Stick接続後（配信アプリ一覧）</span>
        </div>
      </div>
      <figcaption className="mt-4 text-center font-mono text-[11px] text-ink-soft">
        古いテレビでも、HDMIに挿すだけで配信サービスをまとめて見られる画面になる。
      </figcaption>
    </figure>
  );
}
