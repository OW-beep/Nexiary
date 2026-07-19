// 1台のMacの中に、仮想的なWindows環境が同時に動く仕組みを示す挿絵。
// MDX内で <VirtualizationDiagram /> の形で使用する。
export default function VirtualizationDiagram() {
  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <svg viewBox="0 0 300 130" className="w-full" role="img" aria-label="Mac上でWindowsが仮想的に動く仕組みを示す図">
        <rect x="20" y="15" width="260" height="95" rx="6" fill="none" stroke="#20263B" strokeWidth="2" />
        <text x="30" y="32" className="font-mono" fontSize="9" fill="#4A5170">
          1台のMac（macOS）
        </text>

        <rect x="35" y="42" width="100" height="55" rx="4" fill="#E4EAE3" stroke="#356156" strokeWidth="1.5" />
        <text x="50" y="73" className="font-body" fontSize="10" fill="#356156">
          Macアプリ
        </text>

        <rect x="160" y="42" width="105" height="55" rx="4" fill="none" stroke="#B4472B" strokeWidth="1.5" strokeDasharray="3 2" />
        <text x="172" y="65" className="font-body" fontSize="10" fill="#B4472B">
          仮想マシン
        </text>
        <text x="172" y="80" className="font-mono" fontSize="8" fill="#B4472B">
          （Windows）
        </text>

        <text x="20" y="122" className="font-body" fontSize="9" fill="#4A5170">
          再起動なしで、両方を同時に切り替えながら使える
        </text>
      </svg>
      <figcaption className="mt-2 text-center font-mono text-[11px] text-ink-soft">
        Boot Campのようにパソコンを再起動して切り替えるのではなく、macOS上でWindowsを同時に動かす仕組み
      </figcaption>
    </figure>
  );
}
