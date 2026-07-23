// 「テープ→ダビング→データ化」の流れを示す挿絵。MDX内で <TapeToDigitalDiagram /> の形で使用する。
export default function TapeToDigitalDiagram() {
  return (
    <figure className="not-prose catalog-card my-8 p-5">
      <svg viewBox="0 0 300 100" className="w-full" role="img" aria-label="ビデオテープがデータ化されるまでの流れを示す図">
        <rect x="10" y="30" width="80" height="40" rx="4" fill="none" stroke="#8C6A4F" strokeWidth="2" />
        <text x="50" y="46" textAnchor="middle" className="font-body" fontSize="9.5" fill="#20263B">
          VHS等の
        </text>
        <text x="50" y="60" textAnchor="middle" className="font-body" fontSize="9.5" fill="#20263B">
          ビデオテープ
        </text>

        <line x1="95" y1="50" x2="120" y2="50" stroke="#B4472B" strokeWidth="2" markerEnd="url(#tapeArrow)" />

        <rect x="125" y="30" width="80" height="40" rx="4" fill="none" stroke="#356156" strokeWidth="2" />
        <text x="165" y="54" textAnchor="middle" className="font-body" fontSize="9.5" fill="#20263B">
          ダビング作業
        </text>

        <line x1="210" y1="50" x2="235" y2="50" stroke="#B4472B" strokeWidth="2" markerEnd="url(#tapeArrow)" />

        <rect x="240" y="30" width="55" height="40" rx="4" fill="none" stroke="#356156" strokeWidth="2" />
        <text x="267.5" y="46" textAnchor="middle" className="font-body" fontSize="9" fill="#20263B">
          DVD/
        </text>
        <text x="267.5" y="60" textAnchor="middle" className="font-body" fontSize="9" fill="#20263B">
          データ
        </text>

        <defs>
          <marker id="tapeArrow" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto">
            <path d="M0,0 L5,2.5 L0,5 Z" fill="#B4472B" />
          </marker>
        </defs>
        <text x="10" y="90" className="font-mono" fontSize="9" fill="#4A5170">
          テープは劣化していくが、データ化すれば劣化しない
        </text>
      </svg>
      <figcaption className="mt-2 text-center font-mono text-[11px] text-ink-soft">
        再生機器がなくなっても、データ化しておけばスマホやPCで見返せる
      </figcaption>
    </figure>
  );
}
