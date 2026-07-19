// 通知などによる「中断」が集中力に与える影響を示す折れ線グラフ風の挿絵。
// MDX内で <FocusDipChart /> の形で使用する。
export default function FocusDipChart() {
  // 集中度が上がっていき、中断（点線）で急落し、じわじわ回復する曲線
  const points = "10,90 60,40 110,25 130,25 140,95 170,85 210,55 260,35 290,28";
  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <svg viewBox="0 0 300 120" className="w-full" role="img" aria-label="通知による中断が集中力に与える影響を示すグラフ">
        <line x1="10" y1="105" x2="290" y2="105" stroke="#D8D3C4" strokeWidth="1" />
        <line x1="10" y1="10" x2="10" y2="105" stroke="#D8D3C4" strokeWidth="1" />
        <polyline points={points} fill="none" stroke="#356156" strokeWidth="2.5" />
        <line x1="135" y1="10" x2="135" y2="105" stroke="#B4472B" strokeWidth="1.5" strokeDasharray="4 3" />
        <text x="140" y="20" className="font-mono" fontSize="9" fill="#B4472B">
          通知で中断
        </text>
        <text x="15" y="25" className="font-mono" fontSize="9" fill="#4A5170">
          集中度
        </text>
        <text x="230" y="100" className="font-mono" fontSize="9" fill="#4A5170">
          時間経過
        </text>
      </svg>
      <figcaption className="mt-2 text-center font-mono text-[11px] text-ink-soft">
        一度中断されると、元の集中度に戻るまでにはある程度の時間がかかるとされる
      </figcaption>
    </figure>
  );
}
