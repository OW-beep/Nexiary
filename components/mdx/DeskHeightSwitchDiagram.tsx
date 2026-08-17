// レバー操作で「座り作業の高さ」と「立ち作業の高さ」を切り替えるイメージを、
// 2つのデスクシルエットの高さ差で示す挿絵。他の挿絵（放射クラスター・断面比較等）とは
// 「高さの切り替え」という表現で差別化している。
// MDX内で <DeskHeightSwitchDiagram /> の形で使用する。
export default function DeskHeightSwitchDiagram() {
  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <p className="font-display text-base text-ink">レバーひとつで高さを切り替え</p>
      <div className="mt-6 flex items-end justify-center gap-10">
        <div className="flex flex-col items-center gap-2">
          <svg width="90" height="90" viewBox="0 0 90 90" aria-hidden="true">
            <line x1="10" y1="55" x2="80" y2="55" stroke="#4A5170" strokeWidth="4" />
            <line x1="18" y1="55" x2="18" y2="82" stroke="#4A5170" strokeWidth="3" />
            <line x1="72" y1="55" x2="72" y2="82" stroke="#4A5170" strokeWidth="3" />
          </svg>
          <span className="font-mono text-[11px] text-ink-soft">座り作業の高さ</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <svg width="90" height="90" viewBox="0 0 90 90" aria-hidden="true">
            <line x1="10" y1="22" x2="80" y2="22" stroke="#B4472B" strokeWidth="4" />
            <line x1="18" y1="22" x2="18" y2="82" stroke="#B4472B" strokeWidth="3" />
            <line x1="72" y1="22" x2="72" y2="82" stroke="#B4472B" strokeWidth="3" />
          </svg>
          <span className="font-mono text-[11px] text-ink-soft">立ち作業の高さ</span>
        </div>
      </div>
      <figcaption className="mt-4 text-center font-mono text-[11px] text-ink-soft">
        ガス圧式はレバー操作で無段階に調整できるが、電動のようなボタン一つでの自動昇降ではない。
      </figcaption>
    </figure>
  );
}
