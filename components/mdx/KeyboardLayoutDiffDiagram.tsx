// 英語配列（US配列）とJIS配列で特につまずきやすいキー（Enter・右Shift・記号列）の違いを
// 簡易的なキーボード列のシルエットで示す挿絵。他の挿絵（ゲージ・充電レイアウト・角度の扇形等）とは
// 「配列の差分を強調した簡易キーボード図」という表現で差別化している。
// MDX内で <KeyboardLayoutDiffDiagram /> の形で使用する。
export default function KeyboardLayoutDiffDiagram() {
  const rows = [
    { label: "JIS配列（見慣れた形）", enterWide: false, shiftNote: "右Shiftは横長" },
    { label: "英語配列（US配列）", enterWide: true, shiftNote: "Enterが横長、右Shiftは短い" },
  ];

  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <p className="font-display text-base text-ink">つまずきやすいキー配置の違い（イメージ）</p>
      <div className="mt-6 flex flex-col gap-6">
        {rows.map((row) => (
          <div key={row.label}>
            <p className="mb-2 font-mono text-[11px] text-ink-soft">{row.label}</p>
            <svg viewBox="0 0 300 40" className="w-full" aria-hidden="true">
              <rect x="0" y="4" width="220" height="30" rx="4" fill="none" stroke="#4A5170" strokeWidth="1.5" />
              <rect
                x="224"
                y="4"
                width={row.enterWide ? 76 : 40}
                height="30"
                rx="4"
                fill="#B4472B"
                opacity="0.18"
                stroke="#B4472B"
                strokeWidth="1.5"
              />
              {!row.enterWide && (
                <rect x="224" y="4" width="36" height="30" rx="4" fill="none" stroke="#4A5170" strokeWidth="1.5" opacity="0" />
              )}
            </svg>
            <p className="mt-1 font-mono text-[10px] text-stamp">{row.shiftNote}</p>
          </div>
        ))}
      </div>
      <figcaption className="mt-4 text-center font-mono text-[11px] text-ink-soft">
        Enterキーの形や記号の位置が異なるため、JIS配列に慣れていると最初は打ち間違いが増えやすい。
      </figcaption>
    </figure>
  );
}
