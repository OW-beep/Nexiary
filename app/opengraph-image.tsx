import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// 個別記事側でopengraph-imageを持たないページに使われる、サイト共通のシェア用画像。
// SNSでリンクをシェアした際にサムネイルが表示され、クリック率の向上につながる
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#F4F2EC",
        }}
      >
        <div
          style={{
            fontSize: 20,
            letterSpacing: 4,
            color: "#B4472B",
            fontFamily: "monospace",
          }}
        >
          DAILY DISCOVERY LOG
        </div>
        <div
          style={{
            fontSize: 96,
            color: "#20263B",
            fontFamily: "serif",
            fontWeight: 600,
            marginTop: 20,
          }}
        >
          {siteConfig.name}
        </div>
        <div style={{ fontSize: 32, color: "#4A5170", marginTop: 20 }}>
          {siteConfig.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
