import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// ホーム画面に追加した際に使われるiOS用アイコン
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#20263B",
          color: "#F4F2EC",
          fontSize: 96,
          fontFamily: "serif",
          fontWeight: 600,
        }}
      >
        N
      </div>
    ),
    { ...size }
  );
}
