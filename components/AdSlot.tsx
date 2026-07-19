// AdSense審査通過後、NEXT_PUBLIC_ADSENSE_CLIENT / スロットIDを.envに設定すると表示される。
// 審査前・未設定時は何も描画しない（空枠でレイアウト崩れを起こさないようにするため）
export default function AdSlot({ slot, format = "auto" }: { slot: string; format?: string }) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  if (!client) return null;

  return (
    <div className="not-prose my-8 flex justify-center">
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: "100%" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: "(adsbygoogle = window.adsbygoogle || []).push({});",
        }}
      />
    </div>
  );
}
