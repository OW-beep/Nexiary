// 豊富なカラーバリエーションをカラースウォッチ（色見本）で示す挿絵。
// 他の図解が線画中心なのに対し、ここは色そのものを主役にしたテイストにしている。
// MDX内で <ColorSwatchDiagram /> の形で使用する。
export default function ColorSwatchDiagram() {
  const colors = [
    "#B4472B", "#356156", "#20263B", "#E8A33D", "#4A5170", "#8C6A4F",
    "#6B7F5E", "#C97B63", "#3E5C76", "#A65A4B", "#7A8471", "#D9A441",
    "#5A4A6B", "#4F7369", "#B98B5E", "#3A6B7A",
  ];
  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <svg viewBox="0 0 300 90" className="w-full" role="img" aria-label="豊富なカラーバリエーションを示す色見本の図">
        {colors.map((c, i) => (
          <circle
            key={c}
            cx={20 + (i % 8) * 34}
            cy={20 + Math.floor(i / 8) * 34}
            r="12"
            fill={c}
          />
        ))}
        <text x="290" y="85" textAnchor="end" className="font-mono" fontSize="9" fill="#4A5170">
          ほか、全32色
        </text>
      </svg>
      <figcaption className="mt-2 text-center font-mono text-[11px] text-ink-soft">
        色数が多いほど「自分らしい1台」に近づけやすくなる（実際の色味は素材やなめし方によっても変わる）
      </figcaption>
    </figure>
  );
}
